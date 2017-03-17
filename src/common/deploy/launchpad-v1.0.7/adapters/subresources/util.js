var lib				= require('../../lib')
var async           = require('async')
var lodash          = require('lodash')
var request         = require('request')
var mustache        = require('mustache')
var path            = require('path')
var fs              = require('fs-extra')

mustache.escape = function (value) {
    return value;
};

var adapter = function () {
    this.clean 			= clean
    this.build 			= build
    this.deploy 		= deploy
}

function build(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','building util resources')
    cb()
}

function deploy(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','deploying util resources')

    var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

    var deploy_info     = context.getDeploymentInfo()

    for (var i=0; i< items.length; i++) {
        lodash.merge(items[i], deploy_info)
        items[i].context = context
        items[i].resourceName = resourceName
    }

    async.each(items, deploy_util, function(err){
        if(err){
            lib.print('ERROR', err)
            cb()
        } else {
            cb()
        }

    })
}

function deploy_util(item, callback) {
    var context			= item.context
    var resourceName = item.resourceName
    delete item.context
    delete item.resourceName

    if(item.action == 'base64.encode') {
        var str = mustache.render(item.value, context.getAllVariables())
        var output = new Buffer(str).toString('base64');
        context.setVariable(item.assignTo, output)
    } else if(item.action == 'copy') {
        var from = path.join(context.getBasePath(resourceName), item.from)
        var to = path.join(context.getBasePath(resourceName), item.to)

        fs.copySync(from, to)
    }

    callback()

}

function clean(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','cleaning util resources')
    cb()
}

exports.adapter 			= adapter
