var apigeetool 		= require('apigeetool')
var lib				= require('../../lib')
var async           = require('async')
var lodash          = require('lodash')
var request         = require('request')
var path            = require('path')
var fs              = require('fs-extra')

var sdk 			= apigeetool.getPromiseSDK()

var LIMIT = 200

var adapter = function () {
    this.clean 			= clean
    this.build 			= build
    this.deploy 		= deploy
}

function build(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','building data resources')
    cb()
}

function deploy(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','deploying data resources')

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

        var baas_org            = context.getVariable('usergrid_org')
        var baas_app            = context.getVariable('usergrid_app')

        var options = {
            uri: context.getVariable('baas_host') + '/management/orgs/' + baas_org + '/apps?access_token='+ token ,
            method: 'POST',
            json: {name: baas_app}
        }

        request(options ,function (error, response, body) {
            async.each(items, create_collection, function(err){
                if(err){
                    lib.print('ERROR', err)
                    cb()
                } else {
                    cb()
                }
            })
        })
    })

}

function create_collection(item, callback) {
    var token			= item.token
    var context         = item.context
    var resourceName    = item.resourceName

    var baas_org        = context.getVariable('usergrid_org')
    var baas_app        = context.getVariable('usergrid_app')

    var uri             = context.getVariable('baas_host') + '/' + baas_org  + '/' + baas_app + '/' + item.name + '?access_token=' + token
    var data            = {}

    var options = {
        uri: uri,
        method: 'POST',
    }

    if(item.file) {
        var dataFile    = path.join(context.getBasePath(resourceName), item.file)
        data            = JSON.parse(fs.readFileSync(dataFile, 'utf8'))
        options.json    = data
        options.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    request(options ,function (error, response, body) {
        if (!error && response.statusCode == 200) {
            lib.print('info', 'data loaded for collection ' + item.name)

            if(item.permissions){
                var uri             = context.getVariable('baas_host') + '/' + baas_org  + '/' + baas_app + '/roles/guest/permissions?access_token=' + token
                var options_list = []
                for(var i=0; i<item.permissions.length; i++) {
                    var options = {
                        uri: uri,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        json: {permission: item.permissions[i]}
                    }

                    options_list.push(options)
                }

                async.each(options_list, function (op, cb) {
                    request(op,function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            cb()
                        } else {
                            lib.print('ERROR', 'error creating guest permission for ' + item.name)
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
        } else {
            lib.print('ERROR', 'error loading data to collection')
            console.log(body)
            callback()
        }
    })


}

function clean(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','cleaning data resources')

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


        async.each(items, delete_collection, function(err){
            if(err){
                lib.print('ERROR', err)
                cb()
            } else {
                cb()
            }
        })

    })
}

function delete_collection(item, callback) {
    var token			= item.token
    var context         = item.context

    var baas_org        = context.getVariable('usergrid_org')
    var baas_app        = context.getVariable('usergrid_app')

    var uri             = context.getVariable('baas_host') + '/' + baas_org  + '/' + baas_app + '/' + item.name +'?ql=select *&limit='+ LIMIT +'&access_token=' + token
    var options = {
        uri: uri,
        method: 'DELETE'
    }

    request(options,function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback()
        } else {
            lib.print('ERROR', 'error deleting collection for ' + item.name)
            console.log(body)
            callback()
        }
    })
}

exports.adapter 			= adapter
