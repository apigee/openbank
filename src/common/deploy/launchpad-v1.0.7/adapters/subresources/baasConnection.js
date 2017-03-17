var apigeetool 		= require('apigeetool')
var lib				= require('../../lib')
var async           = require('async')
var lodash          = require('lodash')
var request         = require('request')
var path            = require('path')
var fs              = require('fs-extra')

var sdk 			= apigeetool.getPromiseSDK()

var adapter = function () {
    this.clean 			= clean
    this.build 			= build
    this.deploy 		= deploy
}

function build(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','building connection resources')
    cb()
}

function deploy(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','deploying connection resources')

    var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

    var client_id       = context.getVariable('usergrid_client_id')
    var client_secret   = context.getVariable('usergrid_secret')

    var options = {
        uri: context.getVariable('baas_host') + '/management/token',
        method: 'POST',
        json: {grant_type: 'client_credentials', client_id: client_id, client_secret: client_secret}
    }

    request(options ,function (error, response, body) {

        var token               = body.access_token

        for (var i=0; i< items.length; i++) {
            items[i].token          = token
            items[i].context        = context
            items[i].resourceName   = resourceName
        }

        async.each(items, create_connection, function(err){
            if(err){
                lib.print('ERROR', err)
                cb()
            } else {
                cb()
            }
        })
    })

}

function create_connection(item, callback) {
    var token			= item.token
    var context         = item.context
    var resourceName    = item.resourceName

    var baas_org        = context.getVariable('usergrid_org')
    var baas_app        = context.getVariable('usergrid_app')

    if(item.file){
        var dataFile    = path.join(context.getBasePath(resourceName), item.file)
        var data        = JSON.parse(fs.readFileSync(dataFile, 'utf8'))

        var options_list    = []
        for(var i=0; i<data.length; i++) {
            var uri             = context.getVariable('baas_host') + '/' + baas_org  + '/' + baas_app + '/' + data[i] +'?access_token=' + token
            var options = {
                uri: uri,
                method: 'POST'
            }

            options_list.push(options)
        }

        async.each(options_list, function (op, cb) {
            request(op,function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    cb()
                } else {
                    lib.print('ERROR', 'error creating connection for ' + item.name)
                    console.log(body)
                    cb()
                }
            })
        }, function(err){
            if(err){
                lib.print('ERROR', err)
                callback()
            } else {
                callback()
            }
        })
    } else {
        callback()
    }

}

function clean(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','cleaning connection resources')

    var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

    async.each(items, delete_data, function(err){
        if(err){
            lib.print('ERROR', err)
            cb()
        } else {
            cb()
        }

    })
}

function delete_data(item, callback) {
    var opts 			= item
    callback()
}

exports.adapter 			= adapter
