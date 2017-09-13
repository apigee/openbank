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
 * @file
 * otp.js
 * OTP Controller.
 * The controller for the OTP operations.
 */

var request = require('request');
var otp = {};
var responseHandler = require('./../lib/response_handler');

otp.generateOtp = function (req, res, next) {
    var config = req.app.get('config');
    var msisdn = req.session.customerDetails.Phone;
    // call the sms authentication endpoint to validate the user credentials
    var options = {
        'url': config.generateOtp.transactionEndpoint + msisdn,
        'method': config.generateOtp.method,
        'headers': config.generateOtp.headers,
        "json": true
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            req.session.msisdn = msisdn;
            //otp.showOtpForm(req, res, next);
            var opt = req.session.opt;
            req.session = {};
            req.session.opt = opt;
            responseHandler.sendText(req, res, "OK")
        }
        else {
            responseHandler.redirectErrorJSON(req, res, req.session.opt.redirectUri + "?error=" + config.errors.invalidOtp + "&state=" + req.session.opt.state);
        }
    });
};

otp.validateOtp = function (req, res, next) {
    var otp = req.body.otp;
    var msisdn = req.session.msisdn;

    var config = req.app.get('config');
    var options = {
        'url': config.validateOtp.transactionEndpoint + msisdn + '/' + otp,
        'method': config.validateOtp.method,
        'headers': config.validateOtp.headers,
        "json": true
    };
    request(options, function (error, response, body) {
        if (response.statusCode == 200) {
            if(!consent)
                var consent = require('./consent');
            consent.createConsent(req, res, next, req.session.opt);
        } else {
            responseHandler.redirectErrorJSON(req, res, req.session.opt.redirectUri + "?error=" + config.errors.invalidOtp + "&state=" + req.session.opt.state);
        }
    });
}

module.exports = otp;