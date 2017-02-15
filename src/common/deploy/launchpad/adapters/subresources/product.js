var apigeetool 		= require('apigeetool')
var lib				= require('../../lib')
var async           = require('async')
var lodash         = require('lodash')

var sdk 			= apigeetool.getPromiseSDK()

var adapter = function () {
	this.clean 			= clean
	this.build 			= build
	this.deploy 		= deploy
}

function build(context, resourceName, subResourceName, params, cb) {
	lib.print('meta','building product resources')
	cb()
}

function deploy(context, resourceName, subResourceName, params, cb) {
	//opts = lib.build_opts(context, resourceName, subResourceName)
	lib.print('meta','deploying product resources')

	var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

	var deploy_info     = context.getDeploymentInfo()

	for (var i=0; i< items.length; i++) {
		lodash.merge(items[i], deploy_info)
        items[i].context = context
	}

	async.each(items, create_product, function(err){
		if(err){
			lib.print('ERROR', err)
			cb()
		} else {
			cb()
		}

	})
}

function create_product(item, callback) {
	var opts 			= item
	var context         = item.context

    opts.productName  	= item.name

	// TODO conflict for environments attribute
	lodash.merge(opts, lib.normalize_data(JSON.parse(item.payload)))

	sdk.createProduct(opts)
		.then(function(result){
			//cache create success
			lib.print('info', 'created product ' + item.name)

			if(item.assignResponse && item.assignResponse.length > 0){
                lib.extract_response(context, item.assignResponse, result)
            }

            callback()
		},function(err){
			//cache create failed
			lib.print('error', 'error creating product ' + item.name)
			lib.print('ERROR', err)
			callback()
		}) ;
}

function clean(context, resourceName, subResourceName, params, cb) {
	//opts = lib.build_opts(context, resourceName, subResourceName)
	lib.print('meta','cleaning product resources')

	var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

	var deploy_info     = context.getDeploymentInfo()

	for (var i=0; i< items.length; i++) {
		lodash.merge(items[i], deploy_info)
	}

	async.each(items, delete_product, function(err){
		if(err){
			lib.print('ERROR', err)
			cb()
		} else {
			cb()
		}

	})
}

function delete_product(item, callback) {
	var opts 			= item

	opts.productName  	= item.name

	// TODO conflict for environments attribute
	lodash.merge(opts, lib.normalize_data(JSON.parse(item.payload)))

	sdk.deleteProduct(opts)
		.then(function(result){
			//cache create success
			lib.print('info', 'deleted product ' + item.name)
			callback()
		},function(err){
			//cache create failed
			lib.print('error', 'error deleting product ' + item.name)
			lib.print('ERROR', err)
			callback()
		}) ;
}

exports.adapter 			= adapter
