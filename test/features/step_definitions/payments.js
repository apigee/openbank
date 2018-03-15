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
/**
 * Created by rmahalank on 9/20/17.
 */

/*jslint node: true */
'use strict';
var apickli = require('apickli');
var jwt = require('jsonwebtoken');
var fs = require('fs-extra');
var tppPrivateCert = fs.readFileSync(process.cwd() + '/test/testtpp_jwt.pem');
var bankPublicCert = fs.readFileSync(process.cwd() + '/test/testbank_jwt_pub.pem');
var seleniumWebdriver = require('selenium-webdriver');

//create a token with the tppPrivateCert imported
function createJWT(body, header) {
    header = header || {};
    if (typeof body !== "object") {
        body = JSON.parse(body);
    }
    var token_payment = jwt.sign(body, tppPrivateCert, {algorithm: "RS256", expiresIn: "1h", header: header});
    return token_payment;
}

//create a token with the tppPrivateCert imported without setting the expiry
function createJWTwithoutExpiry(body, header) {
    header = header || {};
    if (typeof body !== "object") {
        body = JSON.parse(body);
    }
    var token_payment = jwt.sign(body, tppPrivateCert, {algorithm: "RS256", header: header, noTimestamp: true});
    return token_payment;
}

module.exports = function () {

    this.Given(/^Tpp obtains client credential accesstoken for payments claim and store in scenario scope$/, function (callback) {

        this.apickli.setRequestBody('grant_type=client_credentials&scope=payments&client_assertion=' + createJWT({"iss": this.apickli.getGlobalVariable("TPPAppClientIdPayment")}));
        this.apickli.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var othis = this;
        this.apickli.post('/apis/v1.0.1/oauth/token', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).access_token;
                othis.apickli.storeValueInScenarioScope('accesstoken_cc', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
        this.apickli.removeRequestHeader('Content-Type');

    });


    this.Given(/^TPP creates x-jws-signature with default headers for the body (.*)$/, function (body, callback) {

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
        this.apickli.storeValueInScenarioScope('x-jws-signature', detachedJWT[0] + ".." + detachedJWT[2]);
        callback();
    });


    this.Then(/^TPP stores the value of body path (.*) as (.*) in scenario scope$/, function (path, variable, callback) {
        this.apickli.storeValueOfResponseBodyPathInScenarioScope(path, variable);
        callback();
    });

    this.Then(/^OTP verification Succeeds and User is redirected with auth code stored in scenario scope$/, function () {
        var condition = seleniumWebdriver.until.urlContains('code');
        this.driver.wait(condition, 35000);
        var othis = this;
        this.driver.getCurrentUrl().then(function (currentUrl) {
            currentUrl = currentUrl.split('#')[1].split('&');
            for (var i in currentUrl) {
                if (currentUrl[i].indexOf('code') != -1) {
                    othis.apickli.storeValueInScenarioScope('code', currentUrl[i].split('=')[1]);

                }
            }
        });
        return this.driver.quit();

    });
    this.Given(/^Tpp obtains accesstoken for payments claim from authcode and stores in scenario scope$/, function (callback) {

        this.apickli.setRequestBody('grant_type=authorization_code&redirect_uri=http://localhost/&code=' + this.apickli.replaceVariables("`code`") + '&client_assertion=' + createJWT({"iss": this.apickli.getGlobalVariable("TPPAppClientIdPayment")}));
        this.apickli.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var othis = this;
        this.apickli.post('/apis/v1.0.1/oauth/token', function (error, response) {
            if (!error && response.statusCode == 200) {
                var accesstoken = JSON.parse(response.body).access_token;
                othis.apickli.storeValueInScenarioScope('accesstoken', accesstoken);
                callback();
            }
            else {
                callback(new Error(error));
            }
        });
        this.apickli.removeRequestHeader('Content-Type');

    });
    this.Then(/^TPP verifies the body with the x-jws-signature in the header$/, function (callback) {
        var resBody = this.apickli.getResponseObject().body;
        var jwsSignature = this.apickli.getResponseObject().headers['x-jws-signature'];
        var jwsSignatureArray = jwsSignature.split('..');
        var resBodyB64 = new Buffer(resBody).toString("base64");

        try {
            jwt.verify(jwsSignatureArray[0] + "." + resBodyB64 + "." + jwsSignatureArray[1], bankPublicCert);
            callback();
        } catch (err) {
            callback(err);
        }

    });
    this.Then(/^TPP asserts the value of body path (.*) with scenario variable (.*)$/, function (path, variable, callback) {
        if (this.apickli.assertScenarioVariableValue(variable, this.apickli.evaluatePathInResponseBody(path))) {
            callback();
        } else {
            callback(new Error('value of variable ' + variable + ' isn\'t equal to value in body path ' + path));
        }
    })

};