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

/*jslint node: true */
'use strict';
var apickli = require('apickli');
var jwt = require('jsonwebtoken');
var fs = require('fs-extra');
var seleniumWebdriver = require('selenium-webdriver');
var tppPrivateCert = fs.readFileSync(process.cwd() + '/test/testtpp_jwt.pem');
function getClientAssertion(clientId) {
    var token_accounts = jwt.sign({
        "iss": clientId
    }, tppPrivateCert, {algorithm: "RS256", "expiresIn": "1h"});

    return token_accounts;
}

function createJWT(body, header) {
    header = header || {};
    if (typeof body !== "object") {
        body = JSON.parse(body);
    }
    var token_payment = jwt.sign(body, tppPrivateCert, {algorithm: "RS256", expiresIn: "1h", header: header});
    return token_payment;
}

function createJWTwithoutExpiry(body, header) {
    header = header || {};
    if (typeof body !== "object") {
        body = JSON.parse(body);
    }
    var token_payment = jwt.sign(body, tppPrivateCert, {algorithm: "RS256", header: header, noTimestamp: true});
    return token_payment;
}
module.exports = function () {

    


    this.Given(/^Tpp obtains accesstoken for accounts claim from authcode and stores in global scope$/, function (callback) {

        this.apickli.setRequestBody('grant_type=authorization_code&redirect_uri=http://localhost/&code=' + this.apickli.replaceVariables("`code`") + '&client_assertion=' + getClientAssertion(this.apickli.getGlobalVariable("TPPAppClientId")));
        this.apickli.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var othis = this;
        this.apickli.post('/apis/v1.0.1/oauth/token', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).access_token;
                //othis.apickli.storeValueInScenarioScope('accesstoken', accesstoken);
                othis.apickli.setGlobalVariable('accesstoken', accesstoken)
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
        this.apickli.removeRequestHeader('Content-Type');

    });


    this.Given(/^TPP sets the request headers$/, function (headers, callback) {
        //clear all headers
        const self = this;
        var headersTable = headers.hashes();
        headersTable.forEach(function(h) {
            self.apickli.removeRequestHeader(h.name);
        });

        this.apickli.setHeaders(headers.hashes());
        callback();
    });
    this.When(/^the TPP makes the GET (.*)$/, function (resource, callback) {
        this.apickli.get(resource, function (error, response) {
            if (error) {
                callback(new Error(error));
            }
            callback();
        });
    });

    this.Given(/^TPP obtains the oauth accesstoken\-client credentials with accounts scope and store in global scope$/, function (callback) {
        this.apickli.setRequestBody('grant_type=client_credentials&scope=accounts&client_assertion=' + getClientAssertion(this.apickli.getGlobalVariable("TPPAppClientId")));
        this.apickli.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var othis = this;
        this.apickli.post('/apis/v1.0.1/oauth/token', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).access_token;
                othis.apickli.setGlobalVariable('accesstoken_cc', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });

    this.Given(/^TPP obtains the oauth accesstoken\-client credentials with invalid scope and store in global scope$/, function (callback) {
        this.apickli.setRequestBody('grant_type=client_credentials&scope=openid&client_assertion=' + getClientAssertion(this.apickli.getGlobalVariable("TPPAppClientId")));
        this.apickli.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var othis = this;
        this.apickli.post('/apis/v1.0.1/oauth/token', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).access_token;
                othis.apickli.setGlobalVariable('accesstoken_cc_invalid', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });

    this.When(/^the TPP makes the DELETE (.*)$/, function (resource, callback) {
        this.apickli.delete(resource, function (error, response) {
            if (error) {
                callback(new Error(error));
            }

            callback();
        });
    });

    this.When(/^the TPP makes the POST (.*)$/, function (resource, callback) {
        this.apickli.post(resource, function (error, response) {
            if (error) {
                callback(new Error(error));
            }

            callback();
        });
    });


    this.Given(/^Tpp obtains accesstoken for accounts claim with no associated data and stores in global scope$/, function (callback) {

        this.apickli.setRequestBody('grant_type=authorization_code&redirect_uri=http://localhost/&code=' + this.apickli.replaceVariables("`code`") + '&client_assertion=' + getClientAssertion(this.apickli.getGlobalVariable("TPPAppClientId")));
        this.apickli.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var othis = this;
        this.apickli.post('/apis/v1.0.1/oauth/token', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).access_token;
                //othis.apickli.storeValueInScenarioScope('accesstoken', accesstoken);
                othis.apickli.setGlobalVariable('accesstoken_emptyaccount', accesstoken)
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
        this.apickli.removeRequestHeader('Content-Type');

    });
    this.Then(/^the response body should be empty$/, function (callback) {
        if (this.apickli.getResponseObject().body == '{}') {
            callback();
        }
        else {
            callback(new Error('response body not empty'));
        }
    });


    this.Given(/^Tpp obtains accesstoken for accounts claim with permissions ReadAccountsDetail and stores in global scope$/, function (callback) {

        this.apickli.setRequestBody('grant_type=authorization_code&redirect_uri=http://localhost/&code=' + this.apickli.replaceVariables("`code`") + '&client_assertion=' + getClientAssertion(this.apickli.getGlobalVariable("TPPAppClientId")));
        this.apickli.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var othis = this;
        this.apickli.post('/apis/v1.0.1/oauth/token', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).access_token;
                //othis.apickli.storeValueInScenarioScope('accesstoken', accesstoken);
                othis.apickli.setGlobalVariable('accesstoken_ReadAccountsDetailPermission', accesstoken)
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
        this.apickli.removeRequestHeader('Content-Type');

    });


    this.Given(/^Tpp obtains accesstoken for accounts claim with permissions ReadBalances and store in global scope$/, function (callback) {

        this.apickli.setRequestBody('grant_type=authorization_code&redirect_uri=http://localhost/&code=' + this.apickli.replaceVariables("`code`") + '&client_assertion=' + getClientAssertion(this.apickli.getGlobalVariable("TPPAppClientId")));
        this.apickli.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var othis = this;
        this.apickli.post('/apis/v1.0.1/oauth/token', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).access_token;
                //othis.apickli.storeValueInScenarioScope('accesstoken', accesstoken);
                othis.apickli.setGlobalVariable('accesstoken_ReadBalancesPermission', accesstoken)
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
        this.apickli.removeRequestHeader('Content-Type');

    });

    this.Given(/^TPP set body to (.*)$/, function (bodyValue, callback) {
        this.apickli.setRequestBody(bodyValue);
        callback();
    });


   


    this.Given(/^TPP obtains the account request JWS token and store in global scope$/, function (callback) {
        var othis = this;
        var header = {
              "alg": "RS256",
              "kid": "90210ABAD",
              "b64": false,
              "http://openbanking.org.uk/iat": "2017-06-12T20:05:50+00:00",
              "http://openbanking.org.uk/iss": "C=UK, ST=England, L=London, O=Acme Ltd.",
              "crit": [
                "b64",
                "http://openbanking.org.uk/iat",
                "http://openbanking.org.uk/iss"
              ]
            };
        var payload = {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}};
        var token = createJWT(payload,header);
        var detachedJWT = token.split(".");
        othis.apickli.setGlobalVariable('account_request_jws', detachedJWT[0] + ".." + detachedJWT[2]);
        callback();
    });

    this.Given(/^TPP creates x-jws-signature for accounts with default headers for the body (.*)$/, function (body, callback) {

        var d = new Date();
        d.setMinutes(d.getMinutes() - 10);
        var token = createJWTwithoutExpiry(this.apickli.replaceVariables(body), {
            "alg": "RS256",
            "kid": "90210ABAD",
            "b64": false,
            "http://openbanking.org.uk/iat": d.toISOString(),
            "http://openbanking.org.uk/iss": "C=UK,ST=England,L=London,O=AcmeLtd.",
            "crit": ["b64", "http://openbanking.org.uk/iat", "http://openbanking.org.uk/iss"]
        });
        var detachedJWT = token.split(".");
        this.apickli.storeValueInScenarioScope('accounts-x-jws-signature', detachedJWT[0] + ".." + detachedJWT[2]);
        callback();
    });

    this.Given(/^Tpp obtains client credential accesstoken for accounts claim and store in scenario scope$/, function (callback) {
        var jw = getClientAssertion(this.apickli.getGlobalVariable("TPPAppClientId"));
        this.apickli.setRequestBody('grant_type=client_credentials&scope=accounts&client_assertion=' + jw );
        this.apickli.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var othis = this;
        this.apickli.post('/apis/v1.0.1/oauth/token', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).access_token;
                othis.apickli.storeValueInScenarioScope('accounts_accesstoken_cc', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
        this.apickli.removeRequestHeader('Content-Type');

    });

    this.Then(/^TPP stores the value of body path (.*) as (.*) in global scope$/, function (path, variable, callback) {

        this.apickli.storeValueOfResponseBodyPathInGlobalScope(path, variable);
        console.log(this.apickli.getGlobalVariable(variable));
        callback();
    });
};

