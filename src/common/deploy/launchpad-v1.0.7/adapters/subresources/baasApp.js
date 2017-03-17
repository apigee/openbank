var lib				= require('../../lib')
var async           = require('async')
var lodash          = require('lodash')
var request         = require('request')
var mustache        = require('mustache')

mustache.escape = function (value) {
    return value;
};

var adapter = function () {
    this.clean 			= clean
    this.build 			= build
    this.deploy 		= deploy
}

function build(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','building baasApp resources')
    cb()
}

function deploy(context, resourceName, subResourceName, params, cb) {
    lib.print('meta','deploying baasApp resources')

    var config          = context.getConfig(resourceName, subResourceName)

    var items           = lib.filter_items(config.items, params)

    var deploy_info     = context.getDeploymentInfo()

    for (var i=0; i< items.length; i++) {
        lodash.merge(items[i], deploy_info)
        items[i].context = context
    }

    async.each(items, create_createBaasApp, function(err){
        if(err){
            lib.print('ERROR', err)
            cb()
        } else {
            cb()
        }

    })
}

function create_createBaasApp(item, callback) {
    var context			= item.context
    delete item.context

    var client_id       = context.getVariable('usergrid_client_id')
    var client_secret   = context.getVariable('usergrid_secret')

    var options = {
        uri: context.getVariable('baas_host') + '/management/token',
        method: 'POST',
        json: {grant_type: 'client_credentials', client_id: client_id, client_secret: client_secret}
    }

    request(options ,function (error, response, body) {
        var token               = body.access_token

        var baas_org            = context.getVariable('usergrid_org')
        var baas_app            = mustache.render(item.appName, context.getAllVariables())

        var options = {
            uri: context.getVariable('baas_host') + '/management/orgs/' + baas_org + '/apps?access_token='+ token,
            method: 'POST',
            json: {name: baas_app}
        }

        request(options ,function (error, response, body) {
            if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
                //cache create success
                lib.print('info', 'created Baas App ' + baas_app)

                if(item.assignResponse && item.assignResponse.length > 0){
                    lib.extract_response(context, item.assignResponse, body)
                }

                callback()
            } else {
                lib.print('error', JSON.stringify(body))
                callback()
            }
        })
    })
}

function clean(context, resourceName, subResourceName, params, cb) {
    //opts = lib.build_opts(context, resourceName, subResourceName)
    lib.print('meta','cleaning baasApp resources, BaaS app cant be deleted')
    cb()
}


exports.adapter 			= adapter
