var mustache 		= require('mustache');
var path 			= require('path');
var fs				= require('fs-extra');
var jwt             = require('jsonwebtoken');
var prompt_lib		= require('prompt');

/*
 What does this script do ?
    Reads all files in the 'files_list' variable and does 'find and replace' of variables passed in the object 'inject_object'

 files_list     : include files that need variable replacement
 inject_object  : add variables that need to be replaced

 How to run ?
    node install_tmp.js
*/

var files_list = ['openapi/account_apis.json.template','openapi/auth_api.json.template','openapi/userinfo_api.json.template','openapi/opendata_locations.json.template','openapi/payment_api.json.template']

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
switch_opdk.push({name: 'onprem', description: 'Is this on-premise(opdk) Apigee setup ? Enter - T/F', type: 'boolean', required: true});

prompt_lib.get(switch_opdk, function(err, results) {
    if(!results['onprem']){
        var required_values = [];

        required_values.push({name: 'org', description: 'Enter the Apigee organization name', type: 'string'});
        required_values.push({name: 'env', description: 'Enter the environment', type: 'string'});
        required_values.push({name: 'client_id', description: 'Enter the client_id of app ***', type: 'string'});
        required_values.push({name: 'secret', description: 'Enter the secret of ***', type: 'string'});
        required_values.push({name: 'redirect_uri', description: 'Enter the redirect_uri of app ***', type: 'string'});

        prompt_lib.start();

        prompt_lib.get(required_values, function(err, results) {
            post_prompt(err, results)
        });
    } else {
        onprem_flag = true

        var required_values = [];

        required_values.push({name: 'org', description: 'Enter the Apigee organization name', type: 'string'});
        required_values.push({name: 'host', description: 'Enter the host name for portal', type: 'string'});
        required_values.push({name: 'client_id', description: 'Enter the client_id of app ***', type: 'string'});
        required_values.push({name: 'secret', description: 'Enter the secret of ***', type: 'string'});
        required_values.push({name: 'redirect_uri', description: 'Enter the redirect_uri of app ***', type: 'string'});

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

    if(!onprem_flag){
        inject_object.host = 'https://' + results['org'] + '-' + results['env'] + '.net'
    }

    var token_payment = jwt.sign({
        "iss": "https://www.bankofireland.com",
        "aud": "https://hulk-prod.apigee.net",
        "response_type": "token",
        "client_id": results["client_id"],
        "redirect_uri": results["redirect_uri"],
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
        // secret
    }, results["secret"]);

    inject_object.token_payment = token_payment

    replace_variables(paths, inject_object)

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
