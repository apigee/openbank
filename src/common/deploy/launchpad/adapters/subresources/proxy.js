var apigeetool 		= require('apigeetool')
var lodash 			= require('lodash')
var path 			= require('path')
var fs				= require('fs-extra')
var mustache 		= require('mustache')
var child_process	= require('child_process')
var lib 			= require('../../lib')
var async 			= require('async')
var lodash 			= require('lodash')
var request 		= require('request')

var sdk 			= apigeetool.getPromiseSDK()

var adapter = function () {
	this.clean 				= clean
	this.build 				= build
	this.deploy 			= deploy
}

function build(context, resourceName, subResourceName, params, cb) {
	lib.print('meta','building proxy')

	var config          	= context.getConfig(resourceName, subResourceName)

    var items               = lib.filter_items(config.items, params)

	context.resourceName 	= resourceName

	for (var i=0; i< items.length; i++) {
		items[i].context 	= context
	}

	async.eachSeries(items, build_proxy, function(err){
		if(err){
			lib.print('error', err)
			cb()
		} else {
			cb()
		}

	})
}

function build_proxy(item, callback) {
	lib.print('info', 'building proxy ' + item.name)

	var proxy_dir 				= path.join(item.context.getBasePath(item.context.resourceName), '/src/gateway/', item.name, 'apiproxy')
	var proxy_target_dir		= path.join(item.context.getBasePath(item.context.resourceName), '/src/gateway/', item.name, 'target/apiproxy')

	if (!fs.existsSync(proxy_target_dir)){
		fs.mkdirpSync(proxy_target_dir)
	}

	// copy contents from apiproxy to target
	fs.copy(proxy_dir, proxy_target_dir, function (err) {
		if (err) {
			lib.print('error', 'error building proxy, while copying to target folder ' + item.name)
			callback(err)
		} else {
			// do a npm install
			var npm_dir = path.join(proxy_target_dir, 'resources/node')
			 if (fs.existsSync(npm_dir)){
				 lib.npm_install_local_only(npm_dir,function(code){
					 if (code != 0) {
					 lib.print('error', 'error building proxy ' + item.name)
					 callback()
				 } else {
					 lib.print('info', 'built proxy ' + item.name)
					 callback()
				 }
			 })
			 } else {
				 callback()
			 }
		}
		/*
		 var inject_object = item.context.getAllVariables()
		 lib.replace_variables(proxy_target_dir, inject_object, function () {

		 })
		 */
	});
}

function deploy(context, resourceName, subResourceName, params, cb) {
	lib.print('meta','deploying proxy')

	var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

	var deploy_info     = lib.normalize_data(context.getDeploymentInfo())

	for (var i=0; i< items.length; i++) {
		lodash.merge(items[i], deploy_info)
		items[i].api		= items[i].name
		items[i].directory 	= path.join(context.getBasePath(resourceName), 'src/gateway', items[i].name, 'target')
		items[i].context 	= context

		if(fs.existsSync(path.join(context.getBasePath(resourceName), 'src/gateway', items[i].name, 'target/apiproxy/target/node'))){
			//items[i]['resolve-modules'] = true
		}

	}

	async.each(items, deploy_proxy, function(err){
		if(err){
			lib.print('error', err)
			cb()
		} else {
			cb()
		}

	})

}

function deploy_proxy(item, callback) {
    lib.print('info', 'deploying proxy ' + item.name)

    var opts                = item
    var context 			= opts.context

	delete opts.context
    delete opts.assignResponse

//	curl -X POST -H ":" \
//  https://api.enterprise.apigee.com/v1/o/{org_name}/environments/{env-name}/apis/{api_name}/revisions/{revision_number}/deployments \
//	-u email:password
//  curl -X POST -u email:password -F "file=@apiproxy.zip" "https://api.enterprise.apigee.com/v1/organizations/{org-name}/apis?action=import&name=example"

    lib.zip(opts.directory, function (zip_buffer) {

        var options = {
            uri: context.getVariable('edge_host') + '/v1/organizations/' + opts.organization + '/apis?action=import&name=' + opts.api,
            method: 'POST',
            headers: {
                'Content-type': 'application/octet-stream'
            },
            auth: {
            },
            body: zip_buffer

        }

        if(opts.token){
        	options.auth.bearer = opts.token
		} else {
        	options.auth.username = opts.username
			options.auth.password = opts.password
		}

        request(options, function (error, response, body) {
            if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
                var data = JSON.parse(body)
                var revision = data.revision

                var options = {
                    uri: 'https://api.enterprise.apigee.com/v1/o/' + opts.organization + '/environments/' + opts.environments + '/apis/' + opts.api + '/revisions/' + revision + '/deployments?override=true',
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    auth: {
                    }

                }

                if(opts.token){
                    options.auth.bearer = opts.token
                } else {
                    options.auth.username = opts.username
                    options.auth.password = opts.password
                }

                request(options, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        lib.print('info', 'deployed proxy ' + opts.name)

                        if(item.assignResponse && item.assignResponse.length > 0){
                            lib.extract_response(context, item.assignResponse, body)
                        }

                        callback()
                    } else {
                        lib.print('error', 'error deploying proxy ' + opts.name)
                        lib.print('error', JSON.stringify(response))
                        callback()
                    }
                })

            } else {
                lib.print('error', JSON.stringify(response))
                callback()
            }
        })
    })
/*
	sdk.deployProxy(opts).then(
		function(result){
			//deploy success
			lib.print('info', 'deployed proxy ' + opts.name)
			callback()
		},
		function(err){
			//deploy failed
			lib.print('error', 'error deploying proxy ' + opts.name)
			lib.print('ERROR', err)
			callback()
		})
*/

}

function clean(context, resourceName, subResourceName, params, cb) {
	lib.print('meta','cleaning proxy resource')

	var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

	context.resourceName 	= resourceName

	for (var i=0; i< items.length; i++) {
		items[i].context 	= context
	}

	async.each(items, clean_proxy, function(err){
		if(err){
			lib.print('error', err)
			cb()
		} else {
			cb()
		}

	})
}

function clean_proxy(item, callback) {
	var proxy_target_dir		= path.join(item.context.getBasePath(item.context.resourceName), '/src/gateway/', item.name, 'target')

	delete item.context

	fs.emptyDir(proxy_target_dir, function(err){
		if (err) {
			lib.print('error', 'error cleaning proxy ' + item.name)
			lib.print('error', err)
			callback()
		} else {
			lib.print('info', 'cleaned proxy ' + item.name)
			callback()
		}
	})
}

exports.adapter 			= adapter

