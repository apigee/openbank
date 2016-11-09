/**
 * @file
 * Consent Controller.
 * This file contains the code for all the consent operations.
 */

var stepsProcess = require('./stepsProcess');
var request = require('request');

var consentModule = require('common-consent-controller');

var customConsentImpl = function(){};

customConsentImpl.prepareCustomConsentData =  function (req,res,consentData,cb) {
    var consentTransaction = req.session.consentTransaction;
    
    consentData.to      = consentTransaction.to;
    consentData.amount  = consentTransaction.amount;
    
    cb(null,ConsentData);
};

customConsentImpl.customDoConsent = function(req,res,consentData,cb) {
    consentData.accountNumber = req.body.account_number;
    cb(null,consentData,true); //true: do default response handling
};


var consent = consentModule.createConsent(customConsentImpl);

module.exports = consent;
