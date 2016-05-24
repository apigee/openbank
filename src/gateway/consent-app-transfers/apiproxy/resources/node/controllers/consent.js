/**
 * @file
 * Consent Controller.
 * This file contains the code for all the consent operations.
 */

var stepsProcess = require('./stepsProcess');
var request = require('request');
var url = require('url');
var consent = {};

consent.showConsent = function (req, res, next) {
    var config = req.app.get('config');
    var consentTransaction = req.session.consentTransaction;
    var consentData = {};
    consentData.application = consentTransaction.applicationname;

    var scopes = consentTransaction.scope.split(" ");
    var to = consentTransaction.to;
    var amount = consentTransaction.amount;
    var currency = consentTransaction.currency;

    // Remove openid from scopes as it is implicit and need not be shown to the
    // users.
    var openid_index = scopes.indexOf('openid');
    if (openid_index != -1) {
        scopes.splice(openid_index, 1);
    }
    consentData.scopes = scopes;
    consentData.to = to;
    consentData.amount = amount;
    consentData.currency = currency;
    consentData.tnc = consentTransaction.tandcs;

    var authenticationTransaction = req.session.authenticationTransaction;
    console.log('user = ' + authenticationTransaction.user);

    var accounts = {};
    // call the authentication endpoint to validate the user credentials
    var options = {
        'url': config.getAccounts.transactionEndpoint + "?customerId=" + authenticationTransaction.user,
        'method': config.getAccounts.method,
        'headers': config.getAccounts.headers,
        'json': true
    };

    console.log('accounts uri = ' + options.url);
    console.log('acc options = ' + JSON.stringify(options));

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            consentData.accounts = body;
            console.log(consentData.accounts);
        }
        // render the consent page.
        res.render('consent', consentData);
    })
};

consent.doConsent = function (req, res, next) {
    // call the access token endpoint with the details of the user based on the
    // loa.
    // If the loa is just otp we need to send just the msisdn to the
    // backend, if the loa is username_password then the user information
    // needs to be sent

    console.log('body = ' + JSON.stringify(req.body));

    // If the user allowed his consent the call the access token endpoint.
    if (req.body.allow == 'allow') {
        // Send the user information to the access token endpoint.
        if (typeof req.session.authenticationTransaction !== 'undefined') {
            // We give priority to the userinfo if it is present in the session and
            // send it to the access token endpoint.
            console.log("1");
            var authenticationTransaction = req.session.authenticationTransaction;
            authenticationTransaction.account_number = req.body.account_number;
            console.log(authenticationTransaction.user);
            console.log(authenticationTransaction);

            if (typeof authenticationTransaction.user !== 'undefined') {
                console.log("3");
                var formData = authenticationTransaction;
                // invoke the call to get the access token.
                consent.executeTransfer(req, res, next, formData);
            }
        }
        else if (typeof req.session.authenticationTransaction === 'undefined' && typeof req.session.msisdn !== 'undefined') {
            // If userinfo is not present in the session and the msisdn is present
            // then we send the msisdn to the access token endpoint.
            console.log("3");
            var formData = {
                "msisdn": req.session.msisdn
            };
            consent.executeTransfer(req, res, next, formData);
        }
    }
    else {
        // If the user rejects the consent then redirect to the application with
        // the error code and message.
        var config = req.app.get('config');
        var redirect_uri = req.session.consentTransaction.redirect_uri;
        redirect_uri += "?state=" + req.session.consentTransaction.state + "&error=" + config.errors.user_cancel.code + "&error_description=" + config.errors.user_cancel.description;
        req.session.destroy();
        res.redirect(redirect_uri);
    }

};

consent.executeTransfer = function (req, res, next, formData) {
    var config = req.app.get('config');

    var options = {
        'url': config.transferTransaction.transactionEndpoint + req.session.sessionid,
        'method': config.transferTransaction.method,
        'headers': config.transferTransaction.headers,
        'body': formData,
        "json": true
    };

    request(options, function (error, response, body) {
        if (response.statusCode == 200) {
            var redirect_uri = body.application_tx_response;
            console.log('redirect = ' + redirect_uri);

            var config = req.app.get('config');

            var msisdn = req.session.msisdn || req.session.authenticationTransaction.phone_number;
            console.log('sending SMS confirmation to ' + msisdn);

            var consentTransaction = req.session.consentTransaction;
            console.log('consent txn = ', JSON.stringify(consentTransaction));
            var transfer_reference = url.parse(redirect_uri, true).query.transaction_id;

            if (msisdn && transfer_reference) {
                var options = {
                    'url': config.sendConfirmationSMS.transactionEndpoint + msisdn,
                    'method': config.sendConfirmationSMS.method,
                    'headers': config.sendConfirmationSMS.headers,
                    "json": {
                        account_to: consentTransaction.to,
                        amount: consentTransaction.amount,
                        currency: consentTransaction.currency,
                        transfer_reference: transfer_reference
                    }
                };

                request(options, function () {
                });
            }

            req.session.destroy();
            res.redirect(redirect_uri);
        }
        else {
            var err = {
                "error": body.error,
                "description": body.error_description
            };
            stepsProcess.sendError(err, req, res, next);
        }
    });
};

consent.getCustomerAccounts = function (customerNumber) {

};

module.exports = consent;
