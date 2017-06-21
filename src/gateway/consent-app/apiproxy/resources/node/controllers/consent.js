/**
 * @file
 * Consent Controller.
 * This file contains the code for all the consent operations.
 */

var stepsProcess = require('./stepsProcess');
var request = require('request');
var async = require('async');
var consent = {};

consent.showConsent = function (req, res, next) {
    console.log('loading consent page');

    var config = req.app.get('config');
    var consentTransaction = req.session.consentTransaction;
    var consentData = {};
    consentData.application = consentTransaction.applicationname;
    var requestId = consentTransaction.request_id;
    var appId = consentTransaction.applicationid;
    var type = consentTransaction.scope;
    type = type.split(" ");
    type = type[0];
    consentData.tnc = consentTransaction.tandcs;

    var authenticationTransaction = req.session.authenticationTransaction;

    if (type == "account_request") {
        async.parallel({
            userAccounts: function (callback) {
                // Get the user Accounts
                var options = {
                    'url': config.getAccounts.transactionEndpoint + "?customerId=" + authenticationTransaction.user,
                    'method': config.getAccounts.method,
                    'headers': config.getAccounts.headers,
                    'json': true
                };
                request(options, callback);
            },
            accountRequest: function (callback) {
                // Fetch the Account Request
                var options = {
                    'url': config.getAccountRequest.transactionEndpoint + "/" + requestId,
                    'method': config.getAccountRequest.method,
                    'headers': config.getAccountRequest.headers,
                    'json': true
                };
                request(options, callback);

            }
        }, function (err, results) {
            // optional callback

            if (!err) {
                var accountRequestData = {}
                accountRequestData.tpp = consentData.application;
                var accountRequest = [];
                if (results.accountRequest[1] && results.accountRequest[1].AccountIds) {
                    accountRequest = results.accountRequest[1].AccountIds;
                    accountRequestData.permissions = results.accountRequest[1].Permissions;
                    accountRequestData.expiresAt = results.accountRequest[1].ExpiresAt;
                    accountRequestData.TransactionFromDateTime = results.accountRequest[1].TransactionFromDateTime;
                    accountRequestData.TransactionToDateTime = results.accountRequest[1].TransactionToDateTime;
                }
                var userAccounts = [];
                if (results.userAccounts[1]) {
                    userAccounts = results.userAccounts[1].Accounts;
                }
                var accounts = [];
                for (var i in userAccounts) {
                    var account = userAccounts[i];
                    account.requested = "";
                    for (var requestedAccount in accountRequest) {
                        if (accountRequest[requestedAccount] == account.AccountId) {
                            account.requested = "checked";
                        }
                    }
                    accounts.push(account)
                }

                accountRequestData.accounts = accounts;
                accountRequestData.cookies = req.cookies;
                res.render('account_consent', accountRequestData);
            }
            else {
                var error = {
                    "error": "NOT_FOUND",
                    "description": "Unable to fetch user account details"
                };
                stepsProcess.sendError(error, req, res, next);
            }


        });
    }
    else if (type == "payment_request") {
        async.parallel({
            userAccounts: function (callback) {
                // Get the user Accounts
                var options = {
                    'url': config.getAccounts.transactionEndpoint + "?customerId=" + authenticationTransaction.user,
                    'method': config.getAccounts.method,
                    'headers': config.getAccounts.headers,
                    'json': true
                };
                request(options, callback);
            },
            paymentRequest: function (callback) {
                // Fetch the Account Request
                var options = {
                    'url': config.getPaymentRequest.transactionEndpoint + "/" + requestId,
                    'method': config.getPaymentRequest.method,
                    'headers': config.getPaymentRequest.headers,
                    'json': true
                };
                request(options, callback);

            }
        }, function (err, results) {
            // optional callback

            if (!err) {
                var payementRequestData = {};
                payementRequestData.tpp = consentData.application;
                var paymentRequest = [];
                if (results.paymentRequest[1]) {
                    if (results.paymentRequest[1].InstructedAmount) {
                        payementRequestData.amount = results.paymentRequest[1].InstructedAmount.Amount;
                        payementRequestData.currency = results.paymentRequest[1].InstructedAmount.Currency;

                    }
                    if (results.paymentRequest[1].CreditorAgent && results.paymentRequest[1].CreditorAccount) {
                        payementRequestData.creditorAgentId = results.paymentRequest[1].CreditorAgent.Identification;
                        payementRequestData.creditorAccountId = results.paymentRequest[1].CreditorAccount.Identification;
                        payementRequestData.creditorName = results.paymentRequest[1].CreditorAccount.Name;

                    }
                }
                var userAccounts = [];
                if (results.userAccounts[1]) {
                    userAccounts = results.userAccounts[1].Accounts;
                }
                payementRequestData.debitorAccounts = userAccounts;
                payementRequestData.cookies = req.cookies;
                res.render('payment_consent', payementRequestData);
            }
            else {
                var error = {
                    "error": "NOT_FOUND",
                    "description": "Unable to fetch user account details"
                };
                stepsProcess.sendError(error, req, res, next);
            }
        });
    }
    else if (type = "openid") {
        var openidRequestData = {};
        openidRequestData.tpp = consentData.application;
        openidRequestData.permissions = consentTransaction.scope.split(" ");
        openidRequestData.permissions.shift();
        openidRequestData.cookies = req.cookies;
        res.render('openid_consent', openidRequestData);
    }


};

consent.doConsent = function (req, res, next) {
    // call the access token endpoint with the details of the user based on the
    // loa.
    // If the loa is just otp we need to send just the msisdn to the
    // backend, if the loa is username_password then the user information
    // needs to be sent

    var formData;
    var config = req.app.get('config');
    var consentTransaction = req.session.consentTransaction;
    var requestId = consentTransaction.request_id;
    var appId = consentTransaction.applicationid;
    var type = consentTransaction.scope;
    var customerId = req.session.authenticationTransaction.customer_id;
    var type = consentTransaction.scope;
    type = type.split(" ");
    type = type[0];
    // If the user allowed his consent the call the access token endpoint.
    if (req.body.allow == 'allow') {
        if (type == "account_request") {

            var consentedAccounts = [];//req.body.accounts;
            for (var i in req.body) {
                if (i.indexOf("accounts") != -1) {
                    if (!(req.body.accounts instanceof Array)) {
                        var account = JSON.parse(req.body.accounts);
                        consentedAccounts.push({"Account": account.Account, "Servicer": account.Servicer});
                    }
                    else {
                        for (var j in req.body.accounts) {
                            var account = JSON.parse(req.body.accounts[j]);
                            consentedAccounts.push({"Account": account.Account, "Servicer": account.Servicer});
                        }

                    }
                }
            }
            var options = {
                'url': config.updateAccountRequest.transactionEndpoint + "/" + requestId,
                'method': config.updateAccountRequest.method,
                'headers': config.updateAccountRequest.headers,
                'body': {
                    "SelectedAccounts": consentedAccounts,
                    "status": "Authorized"
                },
                'json': true
            };
            request(options, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    var options = {
                        'url': config.createConsent.transactionEndpoint,
                        'method': config.createConsent.method,
                        'headers': config.createConsent.headers,
                        'body': {
                            "requestId": requestId,
                            "customerId": customerId,
                            "appId": appId,
                            "consentType": type,
                            "browserInfo": req.headers['user-agent']
                        },
                        'json': true
                    };
                    request(options, function (error, response, body) {
                        if (!error && response.statusCode == 201) {
                            consent.getAccessToken(req, res, next, {"customerId": customerId, "type": type});
                        }
                        else {
                            var error = {
                                "error": "NOT_FOUND",
                                "description": "Unable to set Consent Info"
                            };
                            stepsProcess.sendError(error, req, res, next);
                        }

                    });
                }
                else {
                    var error = {
                        "error": "NOT_FOUND",
                        "description": "Unable to update account request Info"
                    };
                    stepsProcess.sendError(error, req, res, next);
                }


            });
        }
        else if (type == "payment_request") {
            var consentedPayment = JSON.parse(req.body.debitorAccount);
            DebtorAccountDetails = consentedPayment.Account;
            DebtorAgentDetails = consentedPayment.Servicer;
            var options = {
                'url': config.updatePaymentRequest.transactionEndpoint + "/" + requestId,
                'method': config.updatePaymentRequest.method,
                'headers': config.updatePaymentRequest.headers,
                'body': {
                    "DebtorAccount": DebtorAccountDetails,
                    "DebtorAgent": DebtorAgentDetails,
                    "status": "Authorized"
                },
                'json': true
            };
            request(options, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    var options = {
                        'url': config.createConsent.transactionEndpoint,
                        'method': config.createConsent.method,
                        'headers': config.createConsent.headers,
                        'body': {
                            "requestId": requestId,
                            "customerId": customerId,
                            "appId": appId,
                            "consentType": type,
                            "browserInfo": req.headers['user-agent']
                        },
                        'json': true
                    };
                    request(options, function (error, response, body) {
                        if (!error && response.statusCode == 201) {
                            consent.getAccessToken(req, res, next, {"customerId": customerId, "type": type});
                        }
                        else {
                            var error = {
                                "error": "NOT_FOUND",
                                "description": "Unable to set Consent Info"
                            };
                            stepsProcess.sendError(error, req, res, next);
                        }
                    });
                }
                else {
                    var error = {
                        "error": "NOT_FOUND",
                        "description": "Unable to update account request Info"
                    };
                    stepsProcess.sendError(error, req, res, next);
                }
            });
        }
        else if(type = "openid"){
            consent.getAccessToken(req, res, next, {"customerId": customerId, "type": type});
        }
    } else {
        // If the user rejects the consent then redirect to the application with
        // the error code and message.
        var config = req.app.get('config');
        var redirect_uri = req.session.consentTransaction.redirect_uri;
        redirect_uri += "?state=" + req.session.consentTransaction.state + "&error=" + config.errors.user_cancel.code + "&error_description=" + config.errors.user_cancel.description;
        req.session.destroy();
        res.redirect(redirect_uri);
    }

};

consent.getAccessToken = function (req, res, next, formData) {
    var config = req.app.get('config');

    // call the authentication endpoint to validate the user credentials
    var options = {
        'url': config.accessTokenTransaction.transactionEndpoint + req.session.sessionid,
        'method': config.accessTokenTransaction.method,
        'headers': config.accessTokenTransaction.headers,
        'body': formData,
        "json": true
    };

    request(options, function (error, response, body) {
        if (response.statusCode == 200) {
            var redirect_uri = body.application_tx_response;
            req.session.destroy();
            res.redirect(redirect_uri);
        } else {
            var err = {
                "error": body.error,
                "description": body.error_description
            };
            stepsProcess.sendError(err, req, res, next);
        }
    });
};


module.exports = consent;