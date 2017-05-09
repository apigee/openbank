/**
 * @file
 * Consent Controller.
 * This file contains the code for all the consent operations.
 */

var request = require('request');

var consentModule = require('common-consent-controller');

var customConsentImpl = function(){};

customConsentImpl.prepareCustomConsentData =  function (req,res,consentData,cb) {
    var consentTransaction          = req.session.consentTransaction;
    var config                      = req.app.get('config');
    var authenticationTransaction   = req.session.authenticationTransaction;

    consentData.to      = consentTransaction.to;
    consentData.amount  = consentTransaction.amount;

    // Get accounts
    var options = {
        'url': config.getAccounts.transactionEndpoint + "?customerId=" + authenticationTransaction.user,
        'method': config.getAccounts.method,
        'headers': config.getAccounts.headers,
        'json': true
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            consentData.accounts = body;
            cb(null, consentData);
        }

    })
};

customConsentImpl.customDoConsent = function(req,res,consentData,cb) {
    consentData.accountNumber = req.body.account_number;
    cb(null,consentData,true); //true: do default response handling
};


var consent = consentModule.createConsent(customConsentImpl);

module.exports = consent;
