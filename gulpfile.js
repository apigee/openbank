var gulp = require('gulp');
var apigeetool = require('apigeetool')
var gutil = require('gulp-util')
var build = require('gulp-build')
var through = require('through2')
var q = require('q')
var seedsdk = require('seed-sdk')
var async = require('async')
var edge = require('./lib/edge.js')
var replace = require('gulp-batch-replace');
var rename = require("gulp-rename");

var PROXY_NAME = "apigee-openbank"
var SAMPLE_NAME = "apigee-openbank"

gulp.task('default', function() {
  // place code for your default task here
});
var cacheResources = [ { name: 'consent-session-cache'},
                   { name: 'application-session-cache'},
                   { name: 'nonce-cache'},
                   { name: 'sms-token-cache'}]

var developers = [ {"email":"openbank@apigee.net", "firstName":"OpenBank","lastName":"Developer","userName":"openbank"}]

var apiProducts = [ {"approvalType":"auto", "displayName":"Open Data APIs","name":"open_data_apis","environments":["test","prod"],"scopes":["openid", "atms", "branches"], "proxies":["oauth", "locations"]},
                    {"approvalType":"auto", "displayName":"Payment Transfer APIs","name":"payment_transfer_apis","environments":["test","prod"],"scopes":["openid", "accounts", "transfer", "payment"], "proxies":["oauth", "transfers", "accounts"]},
                    {"approvalType":"auto", "displayName":"Account Access APIs","name":"account_access_apis","environments":["test","prod"],"scopes":["openid", "accounts", "accounts-info", "accounts-balance", "accounts-transactions"], "proxies":["oauth", "accounts"]},
                    {"approvalType":"auto", "attributes":[{"name":"access","value":"private"}], "displayName":"Internal Consent APIs","name":"internal_consent_apis","environments":["test","prod"],"scopes":[], "proxies":["session", "sms-token", "authentication-connector", "oauth"]}
                    ]


var apps = [ {name:"AISP_App",callback:'http://apigee.com/about',email:'openbank@apigee.net',apiProducts:'account_access_apis'},
             {name:"PISP_App",callback:'http://apigee.com/about',email:'openbank@apigee.net',apiProducts:'payment_transfer_apis'},
             {name:"Opendata_App",callback:'http://apigee.com/about',email:'openbank@apigee.net',apiProducts:'open_data_apis'}             
             ]                    
var consent_app = {name:"internal_consent_app",callback:'http://apigee.com/about',email:'openbank@apigee.net',apiProducts:'internal_consent_apis'}
var apilist = [
    { dir: 'build/gateway/accounts', proxy: 'accounts'},
    { dir: 'build/gateway/accounts-connector', proxy: 'accounts-connector'},    
    { dir: 'build/gateway/authentication-connector', proxy: 'authentication-connector'},    
    { dir: 'build/gateway/locations', proxy: 'locations'},
    { dir: 'build/gateway/locations-connector', proxy: 'locations-connector'},
    { dir: 'build/gateway/oauth', proxy: 'oauth'},
    { dir: 'build/gateway/session', proxy: 'session'},
    { dir: 'build/gateway/sms-token', proxy: 'sms-token'},
    { dir: 'build/gateway/transfers', proxy: 'transfers'},
    { dir: 'build/gateway/transfers-connector', proxy: 'transfers-connector'},
    { dir: 'build/gateway/userinfo', proxy: 'userinfo'}
]

var consentapis = [
    { dir: 'build/gateway/consent-app', proxy: 'consent-app'},
    { dir: 'build/gateway/consent-app-transfers', proxy: 'consent-app-transfers'}
]
var gopts = baseopts()
var ugbase = 'https://api.usergrid.com/' + gopts.usergrid_org +'/' +  gopts.usergrid_app
var proxybase = 'https://' + gopts.organization + '-' + gopts.environment + '.apigee.net'
var proxyhost = gopts.organization + '-' + gopts.environment + '.apigee.net'

gulp.task('build',function(){    
    var opts = baseopts()
    
    var replace_opts = {
        authentication_connector_target_url: ugbase +'/customers/{customerNumber}',
        accounts_connector_appBasePath: ugbase,
        location_connector_appBasePath: ugbase,
        oauth_consent_app_redirect: proxybase  +'/internal/consent?sessionid={messageid}',
        transfers_consent_app_redirect: proxybase + '/internal/transfer-consent?sessionid={messageid}',
        transfers_connector_targeturl: ugbase + '/transactions',
        userinfo_getuser_url: ugbase + '/customers/{accesstoken.customer_number}'
    }
    new Promise(function(resolve,reject){
        gulp.src('src/gateway/**/*')
        .pipe(gulp.dest('build/gateway'))
        .on('end',resolve)
    }).then(function(){
        gulp.src('src/gateway/**/*.xml')        
        .pipe(build(replace_opts))
        .pipe(gulp.dest('build/gateway'))
    })        
})

gulp.task('deploy', ['build'], function(){	    
    return edge.run(cacheResources, edge.createCaches)
    .then( function(){ return edge.run(apilist, edge.deployApis)}, 
           function(){ console.log('cache creation failed, continue'); 
                        return edge.run(apilist, edge.deployApis) 
                    })
    .then(function(){ return edge.run(developers, edge.createDevelopers)},
        function(){ console.log('api deploy failed'); return edge.run(developers, edge.createDevelopers) })
    .then(function(){ return edge.run(apiProducts,edge.createProducts)}
        ,function(){ console.log('developer might already exist'); return edge.run(apiProducts,edge.createProducts)})
    .then(function(){ return edge.run(apps,edge.createApps)})     
    .then(function(){ return edge.createApp (consent_app)})
    .then(function(app){replaceStuffForConsent(app)})
    .then(function(){ return edge.run(consentapis,edge.deployApis)})
    .then(function(){console.log('all done')},function(err){console.log(err)})

})

gulp.task('clean',function(){    
    return edge.run(apps,edge.deleteApps)     
    .then(function(){ return edge.run(developers, edge.deleteDevelopers)},
        function(){ console.log('app delete failed');return edge.run(developers, edge.deleteDevelopers) })
    .then(function(){ return edge.run(apiProducts, edge.deleteProducts)},
        function(){console.log('developer delete failed');return edge.run(apiProducts, edge.deleteProducts)})
    .then(function(){ return edge.run(apilist, edge.deleteApis)},
        function(){ console.log('product delete failed');return edge.run(apilist, edge.deleteApis)})
    .then(function(){ return edge.run(consentapis, edge.deleteApis)},
        function(){ console.log('api delete failed'); return edge.run(consentapis, edge.deleteApis)})
    .then(function(){ return edge.run(cacheResources,edge.deleteCaches)},
        function(){console.log('consent api delete failed');return edge.run(cacheResources,edge.deleteCaches)}) 
    .then(function(){console.log('cache deleted success')},
        function(){console.log('cache delete failed')})          
})

function replaceStuffForConsent(consent_appresponse){ 
        var replacestuff = [
         ['__APIINTKEY__',consent_appresponse.credentials[0].consumerKey],
         ['__HOST__',proxyhost]
         ]
        return new Promise(function(resolve,reject){
            gulp.src('src/gateway/consent-app/apiproxy/resources/node/config.orig')
            .pipe(replace(replacestuff))
            .pipe(rename('config.json'))
            .pipe(gulp.dest('build/gateway/consent-app/apiproxy/resources/node/'))
            .on('end',resolve)
        })        
}

function baseopts () {
    var opts = {
        organization: gutil.env.org,
        token: gutil.env.token,
        environments: gutil.env.env,    
        environment: gutil.env.env,
        debug: gutil.env.debug ,
        usergrid_org: gutil.env.ug_org,   
        usergrid_app: gutil.env.ug_app,
        usergrid_client_id: gutil.env.ug_client_id,
        usergrid_secret: gutil.env.ug_secret
    }
    return opts
}