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

require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');

var jwt = require('jsonwebtoken');
var fs = require('fs-extra');
var cert = fs.readFileSync(process.cwd() + '/test/testtpp_jwt.pem');

// Configuration
var config = require("../../config.json");

function createClientAssertion(clientId) {
    var jwtToken = jwt.sign({
        "iss": clientId
    }, cert, {algorithm: "RS256", "expiresIn": "3h"});
    return jwtToken;
}
function createRequestObjectJWT(clientId, redirectUri, state, nonce, scope, responseType, urns) {
    if (urns.indexOf(',') > -1) {
        var idTokenClaims = [];
        var urns = urns.split(',');
        for (var urn in urns) {

            idTokenClaims.push({
                "openbanking_intent_id": {
                    "value": urns[urn],
                    "essential": true
                },
                "acr": {
                    "essential": true
                }
            })
        }

    } else {
        var idTokenClaims = {
            "openbanking_intent_id": {
                "value": urns,
                "essential": true
            },
            "acr": {
                "essential": true
            }
        };
    }

    var requestJWT = {
        "iss": "https://api.openbank.com",
        "response_type": responseType,
        "client_id": clientId,
        "redirect_uri": redirectUri,
        "scope": scope,
        "state": state,
        "nonce": nonce,
        "claims": {
            "id_token": idTokenClaims
        }
    };

    var jwtToken = jwt.sign(requestJWT, cert, {algorithm: "RS256", "expiresIn": "1h"});

    return jwtToken;
}

module.exports = function () {


    this.Given(/^TPP create a client Assertion JWT and stores in the global variable$/, function (callback) {
        var clientAssertion = createClientAssertion(config.TPPAppClientId);
        this.apickli.setGlobalVariable('clientAssertion', clientAssertion);
        callback();
    });

    this.Given(/^TPP sets the request formBody$/, function (formBody, callback) {
        this.apickli.setFormParameters(formBody.hashes());
        callback();
    });

    this.Given(/^Tpp sets (.*) header to (.*)$/, function (headerName, headerValue, callback) {
        this.apickli.addRequestHeader(headerName, headerValue);
        callback();
    });

    this.Given(/^User sets query parameters to$/, function (queryParameters, callback) {
        this.apickli.setQueryParameters(queryParameters.hashes());
        callback();
    });
    this.Given(/^TPP sets the request queryParams$/, function (queryParameters, callback) {
        this.apickli.setQueryParameters(queryParameters.hashes());
        callback();
    });
    this.Given(/^TPP sets the request queryParams and creates the request Object$/, function (queryParameters, callback) {
        var queryParams = queryParameters.rowsHash();
        var queryParamsHashes = queryParameters.hashes();
        var request = createRequestObjectJWT(this.apickli.replaceVariables(queryParams.client_id), queryParams.redirect_uri, queryParams.state, queryParams.nonce, queryParams.scope, queryParams.response_type, queryParams.urns);
        queryParamsHashes.push({"parameter": "request", "value": request});
        this.apickli.setQueryParameters(queryParamsHashes);
        callback();
    });
    this.Given(/^TPP create a auth code and stores in the global variable$/, function (callback) {
        this.apickli.setRequestBody('{         "ClientId": "' + config.TPPAppClientId + '", "ResponseType": "code id_token",         "ResponseTypeToken": "false",         "ResponseTypeCode": "true",         "ResponseTypeIdToken": "false",         "Scope": "openid accounts",         "Type": "accounts",         "RedirectUri": "http://localhost/",         "RequestId": "1008",         "RequestState": "af0ifjsldkj",         "ApplicationName": "AISP_App_v2",                  "CustomerId": "10203040",         "Nonce": "n-0S6_WzA2Mj",         "TppId": "12345"     }');
        this.apickli.setRequestHeader('x-apikey', config.internalAppKey);
        this.apickli.setRequestHeader('Content-Type', 'application/json');
        var othis = this;
        this.apickli.post('/apis/v1.0.1/oauth/authorized', function (error, response) {
            if (!error && response.statusCode == 200) {
                var code = JSON.parse(response.body).application_tx_response.split('&')[1];
                code = code.split('=')[1];
                othis.apickli.setGlobalVariable('authCode', code);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
    });

    this.Given(/^TPP sets the request queryParams and creates the request Object And User makes authorize call and redirected to login$/, function (queryParameters) {
        var queryParams = queryParameters.rowsHash();
        var queryParamsHashes = queryParameters.hashes();
        var request = createRequestObjectJWT(this.apickli.replaceVariables(queryParams.client_id), queryParams.redirect_uri, queryParams.state, queryParams.nonce, queryParams.scope, queryParams.response_type, this.apickli.replaceVariables(queryParams.urns));
        queryParamsHashes.push({"parameter": "request", "value": request});
        var qs = "?";
        for (var queryParam in queryParamsHashes) {
            qs += queryParamsHashes[queryParam].parameter + "=" + this.apickli.replaceVariables(queryParamsHashes[queryParam].value) + "&"
        }
        qs = qs.substring(0, qs.length - 1);
        this.driver = new seleniumWebdriver.Builder()
            .forBrowser('chrome')
            .build();
        return this.driver.get('https://' + config.edgeBasePath + '/apis/v1.0.1/oauth/authorize' + qs);
    });


    this.When(/^User enters (.*) and (.*) and submits the form$/, function (username, pass, callback) {
        this.driver.findElement({name: 'username'}).sendKeys(username);
        this.driver.findElement({name: 'password'}).sendKeys(pass);
        this.driver.findElement({name: 'password'}).submit();
        callback();
    });

    this.Given(/^Login Succeeds$/, function () {
        var condition = seleniumWebdriver.until.elementLocated({name: 'allow'});
        return this.driver.wait(condition, 10000);
    });

    this.When(/^User selects the (.*) on consent page and submits the form$/, function (accounts, callback) {
        if (accounts.indexOf(',') > -1) {
            var accounts = accounts.split(',');
            for (var account in accounts) {
                this.driver.findElement({id: accounts[account]}).click();
            }
        }
        else {
            this.driver.findElement({id: accounts}).click();
        }
        this.driver.findElement({name: 'allow'}).click();
        callback();
    });

    this.When(/^User selects the (.*) from the dropdown on consent page and submits$/, function (accounts, callback) {
        this.driver.findElement({id: 'debtorAccount'}).click();
        this.driver.findElement({id: accounts}).click();
        this.driver.findElement({name: 'allow'}).click();
        callback();
    });

    this.Given(/^Consent Succeeds$/, function () {
        var condition = seleniumWebdriver.until.elementIsVisible(this.driver.findElement({id: 'verify-otp-div'}));
        return this.driver.wait(condition, 10000);
    });

    this.When(/^User enter the otp (\d+) on sms verification page and submits the form$/, function (otp, callback) {

        this.driver.findElement({name: 'otp'}).sendKeys(otp);
        this.driver.findElement({id: 'submitOtp'}).click();
        callback();
    });

    this.Then(/^OTP verification Succeeds and User is redirected with auth code with (.*)$/, function (status) {
        var condition = seleniumWebdriver.until.urlContains('code');
        this.driver.wait(condition, 15000);
        return this.driver.quit();

    });


};