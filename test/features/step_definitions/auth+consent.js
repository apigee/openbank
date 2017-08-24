/*jslint node: true */
'use strict';
var apickli = require('apickli');

require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');

var jwt = require('jsonwebtoken');
var fs = require('fs-extra');
var cert = fs.readFileSync(process.cwd() + '/testtpp_jwt.pem');

// Configuration
var config = require("../../config.json");

function createClientAssertion(clientId) {
    var jwtToken = jwt.sign({
        "iss": "https://private.api.openbank.com/",
        "clientId": clientId,
        "exp": 1503976900,
        "iat": 1502966900
    }, cert, {algorithm: "RS256"});

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
        "responseType": responseType,
        "clientId": clientId,
        "redirectUri": redirectUri,
        "scope": scope,
        "state": state,
        "nonce": nonce,
        "claims": {
            "id_token": idTokenClaims
        }
    };

    var jwtToken = jwt.sign(requestJWT, cert, {algorithm: "RS256"});

    return jwtToken;
}

module.exports = function () {


    this.Given(/^TPP create a client Assertion JWT and stores in the global variable$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions

        var clientAssertion = createClientAssertion(config.TPPAppClientId);//"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3ByaXZhdGUuYXBpLm9wZW5iYW5rLmNvbS8iLCJjbGllbnRJZCI6IlFhSkJoT0xUdkZqUVdUTzk3MDRhVnkxY3BWSzB0SzVMIiwiZXhwIjoxNTAzOTc2OTAwLCJpYXQiOjE1MDI5NjY5MDB9.be_yzudsgJ4YukFpSEq3BujUVjW5iL5NolPgu_UcbXjm5S6tH1Bx5Th61TnSjeK91TBPS6IUXjDE-bqsgJymAdHaGRum8Ixewh4oIwOuWMja2ozmhI4RB-tE0Clj6WJAsLT5sowv2gB61Yd3iGzwoNq9RgAU9uWkg7J61VXaiQ29QpQxfBX1XnXrrAh3s8vsyAa-ZiztMysW9GAcNOWBD836UE6uY4GaGdxH63MhN4iq3N8T-O93VC3aNjnI7EeuKpFUIfcCSZIVWlRWYCgsQ5NwtZD3uoXprALrP8eyZq_sUQXmL7YjI4O2_cGjZfHHkLazkoVJSxID8iCUjHm1Tw"
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
        var request = createRequestObjectJWT(this.apickli.replaceVariables(queryParams.clientId), queryParams.redirectUri, queryParams.state, queryParams.nonce, queryParams.scope, queryParams.responseType, queryParams.urns);
        queryParamsHashes.push({"parameter": "request", "value": request});
        this.apickli.setQueryParameters(queryParamsHashes);
        callback();
    });
    this.Given(/^TPP create a auth code and stores in the global variable$/, function (callback) {
        this.apickli.setRequestBody('{         "ClientId": "' + config.TPPAppClientId + '", "ResponseType": "code id_token",         "ResponseTypeToken": "false",         "ResponseTypeCode": "true",         "ResponseTypeIdToken": "false",         "Scope": "openid accounts",         "Type": "accounts",         "RedirectUri": "http://localhost/",         "RequestId": "1001",         "RequestState": "af0ifjsldkj",         "ApplicationName": "AISP_App_v2",                  "CustomerId": "10203040",         "Nonce": "n-0S6_WzA2Mj",         "TppId": "12345"     }');
        this.apickli.setRequestHeader('x-apikey', config.internalAppKey);
        this.apickli.setRequestHeader('Content-Type', 'application/json');
        var othis = this;
        this.apickli.post('/apis/v2/oauth/authorized', function (error, response) {
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
        var request = createRequestObjectJWT(this.apickli.replaceVariables(queryParams.clientId), queryParams.redirectUri, queryParams.state, queryParams.nonce, queryParams.scope, queryParams.responseType, queryParams.urns);
        queryParamsHashes.push({"parameter": "request", "value": request});
        var qs = "?";
        for (var queryParam in queryParamsHashes) {
            qs += queryParamsHashes[queryParam].parameter + "=" + this.apickli.replaceVariables(queryParamsHashes[queryParam].value) + "&"
        }
        qs = qs.substring(0, qs.length - 1);
        this.driver = new seleniumWebdriver.Builder()
            .forBrowser('chrome')
            .build();
        return this.driver.get('https://' + config.edgeBasePath + '/apis/v2/oauth/authorize' + qs);
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

    this.Given(/^Consent Succeeds$/, function () {
        var condition = seleniumWebdriver.until.elementLocated({name: 'otp'});
        return this.driver.wait(condition, 10000);
    });

    this.When(/^User enter the otp (\d+) on sms verification page and submits the form$/, function (otp, callback) {

        this.driver.findElement({name: 'otp'}).sendKeys(otp);
        this.driver.findElement({name: 'otp'}).submit();
        callback();
    });

    this.Then(/^OTP verification Succeeds and User is redirected with auth code with (.*)$/, function (status, callback) {
        this.driver.quit();
        callback();
    });


};