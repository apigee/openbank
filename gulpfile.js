var gulp = require('gulp');
var apigeetool = require('apigeetool')
var gutil = require('gulp-util')
var build = require('gulp-build')
var through = require('through2')

var seedsdk = require('seed-sdk')
var async = require('async')

var PROXY_NAME = "apigee-openbank"
var SAMPLE_NAME = "apigee-openbank"
gulp.task('default', function() {
  // place code for your default task here
});

var list = [
    { dir: 'src/gateway/accounts', proxy: 'accounts'},
    { dir: 'src/gateway/accounts-connector', proxy: 'accounts-connector'},
    { dir: 'src/gateway/consent-app', proxy: 'consent-app'},
    { dir: 'src/gateway/consent-app-transfers', proxy: 'consent-app-transfers'},
    { dir: 'src/gateway/locations', proxy: 'locations'},
    { dir: 'src/gateway/locations-connector', proxy: 'locations-connector'},
    { dir: 'src/gateway/oauth', proxy: 'oauth'},
    { dir: 'src/gateway/session', proxy: 'session'},
    { dir: 'src/gateway/sms-token', proxy: 'sms-token'},
    { dir: 'src/gateway/transfers', proxy: 'transfers'},
    { dir: 'src/gateway/transfers-connector', proxy: 'transfers-connector'},
    { dir: 'src/gateway/userinfo', proxy: 'userinfo'}
]

var replace_opts = {
    authentication_connector_target_url: 'https://api.usergrid.com/__APPORG__/__APPAPP__/customers/{customerNumber}',
    accounts_connector_appBasePath: 'https://api.usergrid.com/__APPORG__/__APPAPP__',   
    location_connector_appBasePath: 'https://api.usergrid.com/__APPORG__/__APPAPP__',
    oauth_consent_app_redirect: 'https://__HOST__/internal/consent?sessionid={messageid}',
    transfers_consent_app_redirect: 'https://__HOST__/internal/transfer-consent?sessionid={messageid}',
    transfers_connector_targeturl: 'https://api.usergrid.com/__APPORG__/__APPAPP__/transactions',
    userinfo_getuser_url: 'https://api.usergrid.com/__APPORG__/__APPAPP__/customers/{accesstoken.customer_number}'
}

gulp.task('build',function(){
    // gulp.src('src/gateway/**/*')
    //     .pipe(through.obj(function(file,enc,cb){
    //         console.log(file.path)
    //         cb(null,file)
    //     }))
    //     .pipe( build(replace_opts))
    //     .pipe(gulp.dest('build/gateway'))

    gulp.src('src/gateway/***')
        .pipe(gulp.dest('build/gateway'))
        .pipe(through.obj(function(file,enc,cb){
            console.log(file.path)
            cb(null,file)
        }))
})

gulp.task('deploy',function(){
	
    var sdk = apigeetool.getPromiseSDK()
    //deploy all proxies
    async.mapSeries(list, 5, function(it,cb){
        var opts = baseopts()
        opts.directory = it.dir
        opts.api = it.proxy
        cb(null, sdk.deployProxy(opts))
    },function(err,results){
        if(err){throw new Error('deploy failed '  +err)}
        q.all(results)
            .then(function(){
                console.log('Deploy API Proxies success')
            })
    })

    
	return sdk.deployProxy(opts)
		.then(function(){
			  	console.log('success')
			  })
})

gulp.task('clean',function(){
	opts.api = PROXY_NAME
    opts.proxies = PROXY_NAME
    opts.environments = 'test'
    
    var sdk = apigeetool.getPromiseSDK()
    return sdk.undeploy(opts)
              .then(function(){ return sdk.delete(opts)})
                console.log(app)

})

function baseopts () {
    var opts = {
        organization: gutil.env.org,
        token: gutil.env.token,
        environments: gutil.env.env,    
        environment: gutil.env.env,
        debug: gutil.env.debug    
    }
    return opts
}