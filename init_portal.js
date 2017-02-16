var mustache 		= require('mustache');
var path 			= require('path');
var fs				= require('fs-extra');
var jwt             = require('jsonwebtoken');
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

var files_list = ['src/devportal/all/modules/custom/openbank_swagger/swaggers/account_apis.json.template','src/devportal/all/modules/custom/openbank_swagger/swaggers/auth_api.json.template','src/devportal/all/modules/custom/openbank_swagger/swaggers/userinfo_api.json.template','src/devportal/all/modules/custom/openbank_swagger/swaggers/opendata_locations.json.template','src/devportal/all/modules/custom/openbank_swagger/swaggers/payment_api.json.template','src/devportal/all/modules/custom/openbank_swagger/swaggers/opendata_products.json.template']

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




    get_app_details('AISP_App', edge_host, org, username, password, function (aisp_details) {
        secret_aisp = aisp_details.credentials[0].consumerSecret;
        client_id_aisp = aisp_details.credentials[0].consumerKey;
        redirect_uri_aisp = aisp_details.callbackUrl;

        get_app_details('PISP_App', edge_host, org, username, password, function (pisp_details) {
            secret_pisp = pisp_details.credentials[0].consumerSecret;
            client_id_pisp = pisp_details.credentials[0].consumerKey;
            redirect_uri_pisp = pisp_details.callbackUrl;

            inject_object.secret_aisp = secret_aisp;
            inject_object.secret_pisp = secret_pisp;
            inject_object.client_id_aisp = client_id_aisp;
            inject_object.client_id_pisp = client_id_pisp;
            inject_object.redirect_uri_pisp = redirect_uri_pisp

            var token_payment = jwt.sign({
                "iss": "https://www.openbank.apigee.com",
                "aud": "https://apis-bank-dev.apigee.net",
                "response_type": "token",
                "client_id": client_id_pisp,
                "redirect_uri": redirect_uri_pisp,
                "scope": "openid accounts payment",
                "state": "af0ifjsldkj",
                "acr_values": "2",
                "claims": {
                    "paymentinfo": {
                        "type": "sepa_credit_transfer",
                        "to": {
                            "account_number": "7770000002",
                            "remote_bic": "RBOSGB2109H",
                            "remote_IBAN": "GB32ESSE40486562136016",
                            "remote_name": "BigZ online store"
                        },
                        "value": {
                            "currency": "EUR",
                            "amount": "399"
                        },
                        "additional": {
                            "subject": "Online Purchase",
                            "booking_code": "2SFBJ28553",
                            "booking_date": "1462517645809",
                            "value_date": "1462517645809"
                        },
                        "challenge_type": "SANDBOX_TAN"
                    }
                },
                "iat": 1474028597
            }, secret_pisp);
            console.log(secret_pisp)

            inject_object.token_payment = token_payment

            replace_variables(paths, inject_object)
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
