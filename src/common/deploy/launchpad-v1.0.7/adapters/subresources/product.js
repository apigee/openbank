var apigeetool 		= require('apigeetool')
var lib				= require('../../lib')
var async           = require('async')
var lodash          = require('lodash')
var mustache        = require('mustache')
var request 		= require('request')

mustache.escape = function (value) {
    return value;
};

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
    delete item.context

	// TODO conflict for environments attribute
    var payload = mustache.render(item.payload, context.getAllVariables())
    lodash.merge(opts, JSON.parse(payload))

    var options = {
        uri: context.getVariable('edge_host') + '/v1/organizations/' + opts.organization + '/apiproducts',
        method: 'POST',
		headers: {
            'Content-type': 'application/json'
        },
		auth: {},
		body: payload
    }

    if(opts.token){
        options.auth.bearer = opts.token
    } else {
        options.auth.username = opts.username
        options.auth.password = opts.password
    }

    request(options, function (error, response, body) {
        if (!error) {
            lib.print('info', 'created product ' + item.name)
            callback()
        } else {
            lib.print('error', 'error creating product ' + item.name)
            lib.print('error', error)
            callback()
        }
    });
}

function clean(context, resourceName, subResourceName, params, cb) {
	//opts = lib.build_opts(context, resourceName, subResourceName)
	lib.print('meta','cleaning product resources')

	var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

	var deploy_info     = context.getDeploymentInfo()

	for (var i=0; i< items.length; i++) {
		lodash.merge(items[i], deploy_info)
		items[i].context = context
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
    var context			= item.context
    delete item.context

	opts.productName  	= item.name

	// TODO conflict for environments attribute
    var payload = mustache.render(item.payload, context.getAllVariables())
    lodash.merge(opts, lib.normalize_data(JSON.parse(payload)))

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
