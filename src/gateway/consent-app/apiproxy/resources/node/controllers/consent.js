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
 * consent.js
 * Consent Controller.
 * This file contains the code for all the consent operations.
 */

var request = require('request');
//var async = require('async');
var consent = {};
var jwt = require('jsonwebtoken');
var responseHandler = require('./../lib/response_handler');


function getCustomerDetails(req, res, opt, userDetails) {
    var config = req.app.get('config');
    var options = {
        'url': config.customerTransaction.transactionEndpoint + "?ql=where UserId='" + userDetails.user.name + "'",
        'method': config.customerTransaction.method,
        'headers': config.customerTransaction.headers,
        'json': true
    };
    //get customer account details
    request(options, function (error, response, result) {
        if (!error && response.statusCode == 200 && result && result.CustomerId) {
            var customerDetails = result;
            req.session.customerDetails = customerDetails;
            getCustomerAccountDetails(req, res, opt, customerDetails);
        }
        else {
            responseHandler.redirect(req, res, opt.RedirectUri + "?error=" + config.errors.customerNotFound + "&state=" + opt.State);
        }


    });
}

function getCustomerAccountDetails(req, res, opt, customerDetails) {
    var config = req.app.get('config');
    var options = {
        'url': config.getAccounts.transactionEndpoint + "?customerId=" + customerDetails.CustomerId,
        'method': config.getAccounts.method,
        'headers': config.getAccounts.headers,
        'json': true
    };
    request(options, function (error, response, result) {
        if (!error && response.statusCode == 200 && result && result.Data && result.Data.Account && result.Data.Account.length > 0) {
            var customerAccountDetails = result;
            if (opt.Type == "accounts") {
                getAccountRequestDetails(req, res, opt, customerAccountDetails);
            }
            else if (opt.Type == "payments") {
                getPaymentRequestDetails(req, res, opt, customerAccountDetails);
            }
            else {//TODO:openid other consents like profile email phone address
                /* else
                 if (type = "openid") {
                     var openidRequestData = {};
                     openidRequestData.tpp = consentData.application;
                     openidRequestData.permissions = consentTransaction.scope.split(" ");
                     openidRequestData.permissions.shift();
                     openidRequestData.cookies = req.cookies;
                     res.render('openid_consent', openidRequestData);
                 }
                 * */
                responseHandler.redirectError(req, res, opt.RedirectUri + "?error=" + config.errors.invalidType + "&state=" + opt.State);
            }
        }
        else {
            responseHandler.redirectError(req, res, opt.RedirectUri + "?error=" + config.errors.accountNotFound + "&state=" + opt.State);
        }
    });
}


function getAccountRequestDetails(req, res, opt, customerAccountDetails) {
//get customer account details
    var config = req.app.get('config');
    var options = {
        'url': config.getAccountRequest.transactionEndpoint + opt.RequestId + "?tppId=" + opt.TppId,
        'method': config.getAccountRequest.method,
        'headers': config.getAccountRequest.headers,
        'json': true
    };
    request(options, function (error, response, result) {
        if (!error && response.statusCode == 200 && result && result.Data && result.Data.Permissions && result.Data.Permissions.length > 0) {
            var accountRequestDetails = result;
            var msisdn = req.session.customerDetails.Phone;
            msisdn = msisdn.toString().slice(-4);
            var accountRequestData = {};
            accountRequestData.tpp = opt.ApplicationName;
            accountRequestData.permissions = accountRequestDetails.Data.Permissions;
            accountRequestData.expiresAt = accountRequestDetails.Data.ExpirationDateTime;
            accountRequestData.TransactionFromDateTime = accountRequestDetails.Data.TransactionFromDateTime;
            accountRequestData.TransactionToDateTime = accountRequestDetails.Data.TransactionToDateTime;
            accountRequestData.accounts = customerAccountDetails.Data.Account;
            accountRequestData.cookies = req.cookies;
            accountRequestData.msisdn = msisdn;
            responseHandler.render(req, res, 'account_consent', accountRequestData);
        }
        else {
            responseHandler.redirect(req, res, opt.RedirectUri + "?error=" + config.errors.accountRequestNotFound + "&state=" + opt.State);
        }
    });
}

function getPaymentRequestDetails(req, res, opt, customerAccountDetails) {
//get customer account details
    var config = req.app.get('config');
    var options = {
        'url': config.getPaymentRequest.transactionEndpoint + "/" + opt.RequestId + "?tppId=" + opt.TppId,
        'method': config.getPaymentRequest.method,
        'headers': config.getPaymentRequest.headers,
        'json': true
    };
    request(options, function (error, response, result) {
        if (!error && response.statusCode == 200) {
            var paymentRequestDetails = result;

            var payementRequestData = {};
            payementRequestData.tpp = opt.ApplicationName;
            var msisdn = req.session.customerDetails.Phone;
            msisdn = msisdn.toString().slice(-4);
            //var paymentRequest = [];
            if (paymentRequestDetails) {
                if (paymentRequestDetails.Data && paymentRequestDetails.Data.Initiation && paymentRequestDetails.Data.Initiation.InstructedAmount) {
                    payementRequestData.amount = paymentRequestDetails.Data.Initiation.InstructedAmount.Amount;
                    payementRequestData.currency = paymentRequestDetails.Data.Initiation.InstructedAmount.Currency;

                }
                if (paymentRequestDetails.Data && paymentRequestDetails.Data.Initiation && paymentRequestDetails.Data.Initiation.CreditorAccount) {
                    payementRequestData.creditorAccountId = paymentRequestDetails.Data.Initiation.CreditorAccount.Identification;
                    payementRequestData.creditorName = paymentRequestDetails.Data.Initiation.CreditorAccount.Name;
                }
            }
            payementRequestData.debtorAccounts = customerAccountDetails.Data.Account;
            payementRequestData.cookies = req.cookies;
            payementRequestData.msisdn = msisdn;
            responseHandler.render(req, res, 'payment_consent', payementRequestData);

        }
        else {
            responseHandler.redirectError(req, res, opt.RedirectUri + "?error=" + config.errors.paymentRequestNotFound + "&state=" + opt.State);
        }
    });
}


consent.showConsent = function (req, res, next) {
    var consentTransaction = req.session.consentTransaction;
    var sessionStateLogin = req.session.state;
    var reqStateLogin = req.query.state;
    var userDetailsJWT = req.query.userDetails;

    var opt = consentTransaction;
    var config = req.app.get('config');
    if (!opt.RedirectUri) {
        opt.RedirectUri = "/";
    }
    var userDetails = jwt.verify(userDetailsJWT, config.loginJWTKey || 'ssshhhh');
    req.session.UserId = userDetails.user.uuid;


    if (sessionStateLogin == reqStateLogin) {
        //get customer Details
        //get customer account details
        // get account/payment request and render the page
        getCustomerDetails(req, res, opt, userDetails);
    } else {
        responseHandler.redirectError(req, res, opt.RedirectUri + "?error=" + config.errors.invalidSession + "&state=" + opt.State);
    }

};


consent.createConsent = function (req, res, next, opt) {
    var authType = "idpassword";
    if (opt.flagSCA) {
        authType = "otp";
    }
    var config = req.app.get('config');
    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 90);
    var options = {
        'url': config.createConsent.transactionEndpoint,
        'method': config.createConsent.method,
        'headers': config.createConsent.headers,
        'body': {
            "CustomerId": opt.CustomerId,
            "ApplicationId": opt.ApplicationId,
            "ConsentType": opt.Type,
            "RequestId": opt.RequestId,
            "UserId": opt.UserId,
            "SelectedAccounts": opt.SelectedAccounts,
            "NoOfAccessWithoutUsersPresence": 0,
            "AuthType": authType,
            "IsDeleted": false,
            "BrowserInfo": req.headers['user-agent'],
            "ExpiryDate": expiryDate,
            "Status": "Authorized"
        },
        'json': true
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 201) {
            consent.getAccessToken(req, res, next, opt);
        }
        else {
            responseHandler.redirectErrorJSON(req, res, opt.RedirectUri + "?error=" + config.errors.consentNotCreated + "&state=" + opt.State);
        }

    });


}

function isRequiredSCA(req, opt) {
    //TODO: define conditions to set the flag
    if (req.headers['x-ob-google-sca-required'] == 'true' || req.headers['x-ob-google-sca-required'] == "True") {
        return true;
    }
    return false;
}

consent.doConsent = function (req, res, next) {

    var consentTransaction = req.session.consentTransaction;

    var opt = consentTransaction;
    if (!opt.RedirectUri) {
        opt.RedirectUri = "/";
    }
    opt.CustomerId = req.session.customerDetails.CustomerId;
    var config = req.app.get('config');

    // If the user allowed his consent the call the access token endpoint.
    if (req.body.submitType == 'allow') {
        if (opt.Type == "accounts") {

            opt.SelectedAccounts = [];
            for (var i in req.body) {
                if (i.indexOf("accounts") != -1) {
                    if (!(req.body.accounts instanceof Array)) {
                        var account = JSON.parse(req.body.accounts);
                        opt.SelectedAccounts.push(account);
                    }
                    else {
                        for (var j in req.body.accounts) {
                            var account = JSON.parse(req.body.accounts[j]);
                            opt.SelectedAccounts.push(account);
                        }

                    }
                }
            }
            opt.flagSCA = isRequiredSCA(req, opt);
            req.session.flagSCA = opt.flagSCA;
            if (req.session.flagSCA) {
                req.session.opt = opt;
                if (!otp)
                    var otp = require('./otp');
                otp.generateOtp(req, res, next);
            }
            else {
                //create Consent, generate authcode and redirect
                consent.createConsent(req, res, next, opt);

            }

        }
        else if (opt.Type == "payments") {
            opt.SelectedAccounts = [];
            var account = JSON.parse(req.body.debtorAccount);
            opt.SelectedAccounts.push(account);

            opt.flagSCA = isRequiredSCA(req, opt);
            req.session.flagSCA = opt.flagSCA;
            if (req.session.flagSCA) {
                req.session.opt = opt;
                if (!otp)
                    var otp = require('./otp');
                otp.generateOtp(req, res, next);
            }
            else {
                //create Consent, generate authcode and redirect
                consent.createConsent(req, res, next, opt);
            }

        }
        else if (opt.Type = "openid") {
            consent.getAccessToken(req, res, next, {"customerId": customerId, "type": type});
        }
        else {
            //req.session = null;
            responseHandler.redirectErrorJSON(req, res, opt.RedirectUri + "?error=" + config.errors.invalidType + "&state=" + opt.State);
        }
    } else {
        //req.session = null;
        //TODO:reject account/payment request
        responseHandler.redirectErrorJSON(req, res, opt.RedirectUri + "?error=" + config.errors.userCancelConsent + "&state=" + opt.State);
    }

};

/*
function udpateAccountRequest() {
    //update account request
    var options = {
        'url': config.updateAccountRequest.transactionEndpoint + "/" + requestId,
        'method': config.updateAccountRequest.method,
        'headers': config.updateAccountRequest.headers,
        'body': {
            "status": "Authorized"
        },
        'json': true
    };
    request(options, function (err, response, body) {
        if (!err && response.statusCode == 200) {

        }
        else {
            res.redirect(opt.redirectUri + "?error=" + opt.config.error + "&state=" + opt.state);
        }


    });
}

function updatePaymentRequest() {
    //update payement request
    var options = {
        'url': config.updatePaymentRequest.transactionEndpoint + "/" + requestId,
        'method': config.updatePaymentRequest.method,
        'headers': config.updatePaymentRequest.headers,
        'body': {
            "status": "AcceptedTechnicalValidation"
        },
        'json': true
    };
    request(options, function (err, response, body) {
        if (!err && response.statusCode == 200) {

        }
        else {
            res.redirect(opt.redirectUri + "?error=" + opt.config.error + "&state=" + opt.state);
        }
    });
}
 */

consent.getAccessToken = function (req, res, next, opt) {
    var config = req.app.get('config');

    var formData = {
        "ClientId": opt.ClientId,
        "ResponseType": opt.ResponseType,
        "ResponseTypeToken": opt.ResponseTypeToken,
        "ResponseTypeCode": opt.ResponseTypeCode,
        "ResponseTypeIdToken": opt.ResponseTypeIdToken,
        "Scope": opt.Scope,
        "Type": opt.Type,
        "RedirectUri": opt.RedirectUri,
        "RequestId": opt.RequestId,
        "RequestState": opt.State,
        "ApplicationName": opt.ApplicationName,
        "ApplicationId": opt.ApplicationId,
        "CustomerId": opt.CustomerId,
        "Nonce": opt.Nonce
    };

    // call the authentication endpoint to validate the user credentials
    var options = {
        'url': config.accessTokenTransaction.transactionEndpoint,
        'method': config.accessTokenTransaction.method,
        'headers': config.accessTokenTransaction.headers,
        'body': formData,
        "json": true
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var redirectUri = body.application_tx_response;
            //req.session.destroy();
            responseHandler.redirectFinal(req, res, redirectUri);
        } else {
            responseHandler.redirectErrorJSON(req, res, opt.RedirectUri + "?error=" + config.errors.internalError + "&state=" + opt.State);
        }
    });
};

module.exports = consent;