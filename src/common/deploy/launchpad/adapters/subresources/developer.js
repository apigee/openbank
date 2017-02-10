var apigeetool 		= require('apigeetool')
var lib				= require('../../lib')
var async           = require('async')
var lodash          = require('lodash')

var sdk 			= apigeetool.getPromiseSDK()

var adapter = function () {
	this.clean 			= clean
	this.build 			= build
	this.deploy 		= deploy
}

function build(context, resourceName, subResourceName, params, cb) {
	lib.print('meta','building developer resources')
	cb()
}

function deploy(context, resourceName, subResourceName, params, cb) {
	//opts = lib.build_opts(context, resourceName, subResourceName)
	lib.print('meta','deploying developer resources')

	var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

	var deploy_info     = context.getDeploymentInfo()

	for (var i=0; i< items.length; i++) {
		lodash.merge(items[i], deploy_info)
		items[i].context = context
	}

	async.each(items, create_developer, function(err){
		if(err){
			lib.print('ERROR', err)
			cb()
		} else {
			cb()
		}

	})
}

function create_developer(item, callback) {
	var opts 			= item
	var context 		= item.context

	opts.email  		= item.email
	// TODO conflict for environments attribute
	lodash.merge(opts, lib.normalize_data(JSON.parse(item.payload)))

	sdk.createDeveloper(opts)
		.then(function(result){
			//cache create success
			lib.print('info', 'created developer ' + item.email)

			if(item.assignResponse && item.assignResponse.length > 0){
                lib.extract_response(context, item.assignResponse, result)
            }

			callback()
		},function(err){
			//cache create failed
			lib.print('error', 'error creating developer ' + item.email)
			lib.print('ERROR', err)
			callback()
		}) ;
}

function clean(context, resourceName, subResourceName, params, cb) {
	//opts = lib.build_opts(context, resourceName, subResourceName)
	lib.print('meta','cleaning developer resources')

	var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

	var deploy_info     = context.getDeploymentInfo()

	for (var i=0; i< items.length; i++) {
		lodash.merge(items[i], deploy_info)
	}

	async.each(items, delete_developer, function(err){
		if(err){
			lib.print('ERRROR', err)
			cb()
		} else {
			cb()
		}

	})
}

function delete_developer(item, callback) {
	var opts 			= item

	opts.email  		= item.email
	// TODO conflict for environments attribute
	lodash.merge(opts, lib.normalize_data(JSON.parse(item.payload)))

	sdk.deleteDeveloper(opts)
		.then(function(result){
			//cache create success
			lib.print('info', 'deleted developer ' + item.email)
			callback()
		},function(err){
			//cache create failed
			lib.print('error', 'error deleting developer ' + item.email)
			lib.print('ERROR', err)
			callback()
		}) ;
}

exports.adapter 			= adapter
