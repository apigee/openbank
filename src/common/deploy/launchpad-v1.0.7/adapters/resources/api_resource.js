var apigeetool 		= require('apigeetool')
var lodash 			= require('lodash')
var path 			= require('path')
var async			= require('async')
var lib 			= require('../../lib')
var child_process   = require('child_process')
var extract 		= require('extract-zip')
var fs				= require('fs-extra')

var sdk 			= apigeetool.getPromiseSDK()

var adapter = function () {
	this.clean 			= clean
	this.build 			= build
	this.deploy 		= deploy
}

function build(context,resourceName,subResourceName, params, cb) {

	var self	= this
	var config 	= context.getConfig(resourceName)

	//handle_data_sources(context, config)
	build_dependencies(context, resourceName, config, function(err){
		if(err){
			lib.print('error','error resolving dependencies')
			lib.print('error', err)
		} else {
			lib.print('info','Dependencies resolved successful')
			self.gotoSubResources('build', context, resourceName, subResourceName, params, function (err, result) {
				cb(err, result);
			})
		}
	})
}

function deploy(context, resourceName, subResourceName, params, cb) {
	var self 	= this
	var config 	= context.getConfig(resourceName)

	deploy_dependencies(context, resourceName, config, function(err){
		self.gotoSubResources('deploy', context, resourceName, subResourceName, params, function (err, result) {
			cb(err, result)
		})
	})

	//dataSources.deploy()
}


function clean(context,resourceName,subResourceName, params, cb) {

	this.gotoSubResources('clean', context, resourceName, subResourceName, params, function (err, result) {
		cb(err, result)
	})
}

function handle_data_sources(context, config) {

}

function build_dependencies(context, resourceName, config, cb) {
	lib.print('INFO','Downloading dependencies')

	var dependencies = config.properties.dependencies

	if(dependencies && dependencies.length>0){
		async.each(dependencies,
			function(dependency, callback) {
				if (dependency.type == 'node') {
					pull_node(context, resourceName, dependency, callback)

				} else if(dependency.type == 'proxy') {
					pull_proxy(context, resourceName, dependency, callback)
				}
			},
			function(code) {
				if(code != 0) {
					cb(code)
				} else {
					lib.print('info','Dependencies resolved successful')
					cb()
				}
			}
		);
	} else {
        lib.print('info','No dependencies')
		cb()
	}

	// run npm install inside proxy folder
}

function deploy_dependencies(context, resourceName, config, cb) {
	lib.print('INFO','Deploying dependencies')
	cb()
}

function pull_node(context, resourceName, dependency, callback){

}

function pull_proxy(context, resourceName, dependency, callback){
	var name 		= dependency.name
	var url 		= dependency.url
	var branch		= dependency.version
	var work_dir 	= context.getBasePath(resourceName)

	var npm_process = child_process.spawn('git', ['archive', '--remote', url, '--format', 'zip', '-o','tmp-' + name + '.zip', branch],{'cwd': work_dir})

	npm_process.stdout.setEncoding('utf8');
	npm_process.stderr.setEncoding('utf8');

	npm_process.stdout.on('data', function (data) {
		console.log(data)
	});

	npm_process.stderr.on('data', function (data) {
		console.log(data)
	});

	npm_process.on('exit', function(code){
		if(code!=0){
			lib.print('error','error while pulling dependency | ' + code)
			callback(code)
		} else {
			// extract proxy zip
			var extract_to_path 		= path.join(work_dir, 'src/gateway/' + name)
			var extract_from_path 		= path.join(work_dir, 'tmp-' + name + '.zip')

			if (!fs.existsSync(extract_to_path)){
				fs.mkdirpSync(extract_to_path)
			}

			extract(extract_from_path, {dir: extract_to_path }, function (err) {
				if(err){
					lib.print('error', 'error while extracting | ' + err)
					callback(err)
				} else {
					fs.remove(extract_from_path, function (err) {
						if (err) {
							lib.print('error', err)
						} else {
							callback(0)
						}
					})
				}
			})
		}

	});
}

exports.adapter 		= adapter

