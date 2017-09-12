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
var cert = fs.readFileSync(process.cwd() + '/testtpp_jwt.pem');
function getClientAssertion(clientId) {
    var token_payment = jwt.sign({
        "iss": clientId
    }, cert, {algorithm: "RS256", "expiresIn": "1h"});

    return token_payment;
}

module.exports = function () {

    this.Given(/^Tpp obtains accesstoken for accounts claim and store in global scope$/, function (callback) {

        this.apickli.setRequestBody('{         "ClientId": "' + this.apickli.getGlobalVariable("TPPAppClientId") + '", "ResponseType": "code id_token",         "ResponseTypeToken": "true",         "ResponseTypeCode": "false",         "ResponseTypeIdToken": "false",         "Scope": "openid accounts",         "Type": "accounts",         "RedirectUri": "http://localhost/",         "RequestId": "1001",         "RequestState": "af0ifjsldkj",         "ApplicationName": "AISP_App_v2",                  "CustomerId": "10203040",         "Nonce": "n-0S6_WzA2Mj",         "TppId": "12345"     }');
        this.apickli.setRequestHeader('x-apikey', this.apickli.getGlobalVariable("internalAppKey"));
        this.apickli.setRequestHeader('Content-Type', 'application/json');
        var othis = this;
        this.apickli.post('/apis/v1.0/oauth/authorized', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).application_tx_response.split('&')[1];
                accesstoken = accesstoken.split('=')[1];
                othis.apickli.setGlobalVariable('accesstoken', accesstoken)
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });
    this.Given(/^TPP sets the request headers$/, function (headers, callback) {
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
        this.apickli.post('/apis/v1.0/oauth/token', function (error, response) {
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
        this.apickli.post('/apis/v1.0/oauth/token', function (error, response) {
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

    this.Given(/^TPP obtains the oauth accesstoken for account with no associated data and store in global scope$/, function (callback) {
        //TODO:set ClientId , RequestId ApplicationId , ApplicationName , CustomerId , TppId
        this.apickli.setRequestBody('{         "ClientId": "' + this.apickli.getGlobalVariable("TPPAppClientId") + '", "ResponseType": "code id_token",         "ResponseTypeToken": "true",         "ResponseTypeCode": "false",         "ResponseTypeIdToken": "false",         "Scope": "openid accounts",         "Type": "accounts",         "RedirectUri": "http://localhost/",         "RequestId": "1002",         "RequestState": "af0ifjsldkj",         "ApplicationName": "AISP_App_v2",                  "CustomerId": "10203040",         "Nonce": "n-0S6_WzA2Mj",         "TppId": "12345"     }');
        //TODO:set internal consent key
        this.apickli.setRequestHeader('x-apikey', this.apickli.getGlobalVariable("internalAppKey"));
        this.apickli.setRequestHeader('Content-Type', 'application/json');
        var othis = this;
        this.apickli.post('/apis/v1.0/oauth/authorized', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).application_tx_response.split('&')[1];
                accesstoken = accesstoken.split('=')[1];
                othis.apickli.setGlobalVariable('accesstoken_emptyaccount', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });
    this.Then(/^the response body should be empty$/, function (callback) {
        if (this.apickli.getResponseObject().body == '{}') {
            callback();
        }
        else {
            callback(new Error('response body not empty'));
        }
    });
    this.Given(/^TPP obtains the oauth accesstoken for accountRequest with with permissions ReadAccountsDetail and store in global scope$/, function (callback) {
        //TODO:set ClientId , RequestId ApplicationId , ApplicationName , CustomerId , TppId
        this.apickli.setRequestBody('{         "ClientId": "' + this.apickli.getGlobalVariable("TPPAppClientId") + '", "ResponseType": "code id_token",         "ResponseTypeToken": "true",         "ResponseTypeCode": "false",         "ResponseTypeIdToken": "false",         "Scope": "openid accounts",         "Type": "accounts",         "RedirectUri": "http://localhost/",         "RequestId": "1003",         "RequestState": "af0ifjsldkj",         "ApplicationName": "AISP_App_v2",                  "CustomerId": "10203040",         "Nonce": "n-0S6_WzA2Mj",         "TppId": "12345"     }');
        //TODO:set internal consent key
        this.apickli.setRequestHeader('x-apikey', this.apickli.getGlobalVariable("internalAppKey"));
        this.apickli.setRequestHeader('Content-Type', 'application/json');
        var othis = this;
        this.apickli.post('/apis/v1.0/oauth/authorized', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).application_tx_response.split('&')[1];
                accesstoken = accesstoken.split('=')[1];
                othis.apickli.setGlobalVariable('accesstoken_ReadAccountsDetailPermission', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });
    this.Given(/^TPP obtains the oauth accesstoken for accountRequest with with permissions ReadBalances and store in global scope$/, function (callback) {
        //TODO:set ClientId , RequestId ApplicationId , ApplicationName , CustomerId , TppId
        this.apickli.setRequestBody('{         "ClientId": "' + this.apickli.getGlobalVariable("TPPAppClientId") + '", "ResponseType": "code id_token",         "ResponseTypeToken": "true",         "ResponseTypeCode": "false",         "ResponseTypeIdToken": "false",         "Scope": "openid accounts",         "Type": "accounts",         "RedirectUri": "http://localhost/",         "RequestId": "1004",         "RequestState": "af0ifjsldkj",         "ApplicationName": "AISP_App_v2",                  "CustomerId": "10203040",         "Nonce": "n-0S6_WzA2Mj",         "TppId": "12345"     }');
        //TODO:set internal consent key
        this.apickli.setRequestHeader('x-apikey', this.apickli.getGlobalVariable("internalAppKey"));
        this.apickli.setRequestHeader('Content-Type', 'application/json');
        var othis = this;
        this.apickli.post('/apis/v1.0/oauth/authorized', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).application_tx_response.split('&')[1];
                accesstoken = accesstoken.split('=')[1];
                othis.apickli.setGlobalVariable('accesstoken_ReadBalancesPermission', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });
    this.Given(/^TPP set body to (.*)$/, function (bodyValue, callback) {
        this.apickli.setRequestBody(bodyValue);
        callback();
    });

    this.Given(/^TPP obtains the account request JWS token and store in global scope$/, function (callback) {
        var othis = this;
        othis.apickli.setGlobalVariable('account_request_jws', "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkwMjEwQUJBRCIsImI2NCI6ZmFsc2UsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaWF0IjoiMjAxNy0wNi0xMlQyMDowNTo1MCswMDowMCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaXNzIjoiQz1VSywgU1Q9RW5nbGFuZCwgTD1Mb25kb24sIE89QWNtZSBMdGQuIiwiY3JpdCI6WyJiNjQiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lhdCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaXNzIl19..mE6uDZP8fcYGI94CZtFMgj3v540ezYl_3ruGgjI0amOeYj4mYyHvUjIpof24yEzf_baDy9x_gjcoMLnCAO0tPGqKeFiFm33_jBDvFlHQlt7qAsCc2w62NMpYophzqwfmpraT_srTbEsAEfO4dU-I-pr_b3Vxd8ZbH1LyNV8e8wQAzR6KL137i8JfJBAeRzU9M1t1izwEK7jvd6I35LzupUprxnJJdiU8KXpi-KIQDUOhR28sPKNJZiTlg3E6iTTpRc7h5B1Ulh7swSWwu7uD6JuABD9Ucg_rzQ-MwH5lmjywlWwRPSAokQ-ksiWQVQORD2DWOXEACV1la4p_i2wosw");
        callback();
    });
};