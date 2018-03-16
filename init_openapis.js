/*
 Copyright 2017 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

var mustache 		= require('mustache');
var path 			= require('path');
var fs				= require('fs-extra');
//var jwt             = require('jsonwebtoken');
var prompt_lib		= require('prompt');
var request         = require('request');

/*
 What does this script do ?
    Reads all files in the 'files_list' variable and does 'find and replace' of variables passed in the object 'inject_object'

 files_list     : include files that need variable replacement
 inject_object  : add variables that need to be replaced

 How to run ?
    node install_tmp.js
*/

var files_list = ['src/devportal/all/modules/custom/jwtgeneration/jwtgeneration.module.template','src/devportal/all/modules/custom/openbank_swagger/swaggers/opendata-productsv2-0-1.json.template','src/devportal/all/modules/custom/openbank_swagger/swaggers/opendata-locationsv2-0-1.json.template','src/devportal/all/modules/custom/openbank_swagger/swaggers/oauthv1-0-1.json.template','src/devportal/all/modules/custom/openbank_swagger/swaggers/accountv1-0-1.json.template','src/devportal/all/modules/custom/openbank_swagger/swaggers/paymentv1-0-1.json.template','src/devportal/all/themes/dbank/js/smartdocsDynamic.js.template'];

var inject_object = {}

mustache.escape = function (value) {
    return value;
};

var paths = []

for (var j=0; j<files_list.length; j++) {
    paths.push(path.join(__dirname, files_list[j]))
}

/*
prompt
*/

var onprem_flag = false;

var switch_opdk = [];
switch_opdk.push({name: 'onprem', description: 'Is this on-premise(opdk) Apigee setup ? Enter - True/False', type: 'boolean', required: true});

prompt_lib.get(switch_opdk, function(err, results) {
    if(!results['onprem']){
        var required_values = [];

        required_values.push({name: 'org', description: 'Enter the Apigee organization name', type: 'string'});
        required_values.push({name: 'env', description: 'Enter the environment', type: 'string'});
        required_values.push({name: 'username', description: 'Enter the username for the org', type: 'string'});
        required_values.push({name: 'password', description: 'Enter the password', type: 'string', hidden: true});

        prompt_lib.start();

        prompt_lib.get(required_values, function(err, results) {
            post_prompt(err, results)
        });
    } else {
        onprem_flag = true

        var required_values = [];

        required_values.push({name: 'org', description: 'Enter the Apigee organization name', type: 'string'});
        required_values.push({name: 'host', description: 'Enter the opdk management base uri. eg: api.company.com', type: 'string'});
        required_values.push({name: 'username', description: 'Enter the username for the org', type: 'string'});
        required_values.push({name: 'password', description: 'Enter the password', type: 'string', hidden: true});

        prompt_lib.start();

        prompt_lib.get(required_values, function(err, results) {
            post_prompt(err, results)
        });
    }
});




function post_prompt(err, results) {
    var keys = Object.keys(results)

    for(var i=0; i<keys.length; i++){
        inject_object[keys[i]] = results[keys[i]]
    }

    inject_object.org = results['org'];
    if(results['env'])
    {
    inject_object.env = results['env'];
    }
    var keyData = fs.readFileSync(path.join(__dirname, "test/testtpp_jwt.pem"), 'utf8');
    if(keyData && keyData != "")
    {
      inject_object.PrivateKey = keyData ;  
    }
      
    
    var org = results['org']
    var username = results['username'];
    var password = results['password'];

    var edge_host;

    if(!onprem_flag){
        inject_object.host = results['org'] + '-' + results['env'] + '.apigee.net'
        edge_host = 'https://api.enterprise.apigee.com';
        inject_object.host_withprotocol = 'https://' + results['org'] + '-' + results['env'] + '.apigee.net'
    } else if(check_http(results['host'])){
        edge_host = 'https://' + results['host'];
        inject_object.host = clean_http(results['host']);
        inject_object.host_withprotocol = results['host'];
    } else {
        edge_host = 'https://' + results['host'];
        inject_object.host = results['host'];
        inject_object.host_withprotocol = 'https://' + results['host'];
    }

    inject_object.edge_host = edge_host;

    var secret_pisp;
    var client_id_pisp;
    var redirect_uri_pisp;

    var secret_aisp;
    var client_id_aisp;
    var redirect_uri_aisp;




    get_app_details('AISP_Appv101', edge_host, org, username, password, function (aisp_details) {
        secret_aisp = aisp_details.credentials[0].consumerSecret;
        client_id_aisp = aisp_details.credentials[0].consumerKey;
        redirect_uri_aisp = aisp_details.callbackUrl;

        get_app_details('PISP_Appv101', edge_host, org, username, password, function (pisp_details) {
            secret_pisp = pisp_details.credentials[0].consumerSecret;
            client_id_pisp = pisp_details.credentials[0].consumerKey;
            redirect_uri_pisp = pisp_details.callbackUrl;

            inject_object.secret_aisp = secret_aisp;
            inject_object.secret_pisp = secret_pisp;
            inject_object.client_id_aisp = client_id_aisp;
            inject_object.client_id_pisp = client_id_pisp;
            inject_object.redirect_uri_pisp = redirect_uri_pisp;
            replace_variables(paths, inject_object);
            /*get_app_details('Opendata_App_v2', edge_host, org, username, password, function (opendata_details) {
            secret_openid = opendata_details.credentials[0].consumerSecret;
            client_id_openid = opendata_details.credentials[0].consumerKey;
            redirect_uri_openid = opendata_details.callbackUrl;

            inject_object.client_id_openid = client_id_openid;
            inject_object.secret_openid = secret_openid;



            replace_variables(paths, inject_object)
                });*/
            
        });

    });
}


function replace_variables(paths, inject_object) {
    mustache.escape = function (value) {
        return value;
    };

    for(var i=0; i<paths.length; i++){
        var path_to_template = paths[i]

        var data

        try {
            data = fs.readFileSync(path_to_template, 'utf8')
        } catch(e){
            console.log(e)
        }

        var mu_template = String(data)

        try {
            var output = mustache.render(mu_template, inject_object)
        } catch(e) {
            console.log(e)
        }

        try {
            fs.outputFileSync(path_to_template.split('.').slice(0,2).join('.'), output)
        } catch (e){
            console.log(e)
        }

        output = '< yet to copy from original template >'
    }
}

function get_app_details(app, host, org, username, password, callback) {
    var options = {
        uri: host + '/v1/organizations/'+ org+'/developers/openbank@apigee.net/apps/' + app,
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        auth: {
            username: username,
            password: password
        }

    }

    request(options, function (error, response, body) {
        if (!error && (response.statusCode == 200 )) {
            callback(JSON.parse(body))
        } else {
            console.log('ERROR retrieving client_id and secret, re-run the script')
        }
    })
}

function check_http(str) {
    if(str.indexOf('http') > -1){
        return true
    } else {
        return false
    }
}

function clean_http(str) {
    var l = str.split('://');
    if(l.length == 2)
        return l[1]
    else
        console.log('ERROR in uri, re-run the script')
}
