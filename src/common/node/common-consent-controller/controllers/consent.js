/**
 * @file
 * Consent Controller.
 * This file contains the code for all the consent operations.
 */

var request = require('request');

var stepsProcess = require('./stepsProcess');

//Usage:
// var consentModule = require('consent');
// var consent = consentModule.createConsent();
//       or
// customizing:
//
// var customConsentImpl = new function() {};
//
// customConsentImpl.prepareCustomConsentData = function (req,res,consentData,cb) {
//    ... custom implementation
//    cb(null,customConsentData)
// };
//
// customConsentImpl.customDoConsent = function(req,res,consentData,cb) {
//    .... custom actions
//    cb(null,consentData,true);//true: do default response handling
// };
//
// customConsentImpl.customRejectConsent = function(req,res,consentData,cb) {
//    .... custom actions
//    cb(null,consentData,true);//true: do default response handling
// };
// 
//  var consent = consentModule.createConsent(customConsentImpl);




function createConsent(customConsent) {
    var baseConsent = new consent();
    if (customConsent) {
        customConsent.prototype = baseConsent;
        return customConsent;
    } else {
        return baseConsent;
    }

}

function consent() {

    this.showConsent = function(req, res, next) {
        var consentTransaction = req.session.consentTransaction;
        var consentData = {};
        consentData.application = consentTransaction.applicationname;

        var scopes = consentTransaction.scope.split(" ");

        // Remove openid from scopes as it is implicit and need not be shown to the
        // users.
        var openid_index = scopes.indexOf('openid');
        if (openid_index != -1) {
            scopes.splice(openid_index, 1);
        }
        consentData.scopes = scopes;
        consentData.tnc = consentTransaction.tandcs;
        // reder the consent page.
        this.prepareCustomConsentData(req,res,consentData,function(err,customData){
            if (err) {
                returnErrorResponse(req,res,config.errors.unknown.code,""+err);
            } else {
                res.render('consent', customData);
            }
        });

    };
    this.prepareCustomConsentData = function(req, res, consentData, cb) {cb(null,consentData);}; //Override for custom data. return cb(error,customData).
    this.doConsent = function (req, res, next) {
        // call the access token endpoint with the details of the user based on the
        // loa.
        // If the loa is just otp we need to send just the msisdn to the
        // backend, if the loa is username_password then the user information
        // needs to be sent

        // If the user allowed his consent the call the access token endpoint.
        var formData;
        if (typeof req.session.authenticationTransaction !== 'undefined') {
            // We give priority to the userinfo if it is present in the session and
            // send it to the access token endpoint.
            var authenticationTransaction = req.session.authenticationTransaction;
            if (typeof authenticationTransaction.user !== 'undefined') {
                formData = authenticationTransaction;

            }
        }
        else if (typeof req.session.authenticationTransaction === 'undefined' && typeof req.session.msisdn !== 'undefined') {
            // If userinfo is not present in the session and the msisdn is present
            // then we send the msisdn to the access token endpoint.
            formData = {
                "msisdn": req.session.msisdn
            };
        }

        if (req.body.allow == 'allow') {
            // Send the user information to the access token endpoint.
            executeCustomConsent(this,req,res,formData,next);
        }
        else{
            // If the user rejects the consent then redirect to the application with
            // the error code and message.
            executeCustomRejectConsent(this,req,res,formData,next);
        }

    };
    this.customDoConsent = function(req,res,consentData,cb) {cb(null,consentData,true);};//Override for custom implementation on users' agree consent.  Return cb(err,consentData,isDefaultResponse)
    this.customRejectConsent =function(req,res,consentData,cb) {cb(null,consentData,true);};//Override for custom implementation on users' agree consent.  Return cb(err,consentData,isDefaultResponse)
    this.getAccessToken = function  (req, res, next, formData) {
        var config = req.app.get('config');

        // call the authentication endpoint to validate the user credentials
        var options = {
            'url': config.accessTokenTransaction.transactionEndpoint + req.session.sessionid,
            'method': config.accessTokenTransaction.method,
            'headers': config.accessTokenTransaction.headers,
            'body': formData,
            "json": true
        };

        request(options, function (error, response, body){
            if (response.statusCode == 200) {
                var redirect_uri = body.application_tx_response;
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
    }
}

function returnErrorResponse(req,res,errorCode,errorDescription) {
    var config = req.app.get('config');
    var redirect_uri = req.session.consentTransaction.redirect_uri;
    redirect_uri+="?state="+req.session.consentTransaction.state+"&error="+config.errors[errorCode].code+"&error_description="+errorDescription;
    req.session.destroy();
    res.redirect(redirect_uri);
}

function executeCustomConsent(consent,req,res,formData,next) {
    consent.customDoConsent(req,res,formData,function(err,consentData,isDefaultResponse){
        if (err) {
            returnErrorResponse(req,res,'unknown',""+err);
        } else if (isDefaultResponse || isDefaultResponse == undefined) {
            //consentData.baas_access_token = authenticationTransaction.access_token
            // invoke the call to get the access token.
            consent.getAccessToken(req, res, next, consentData);
        } else {
            req.session.destroy();
        }
    });
}

function executeCustomRejectConsent(consent,req,res,formData,next) {
    consent.customRejectConsent(req,res,formData,function(err,consentData,isDefaultResponse){
        if (err) {
            returnErrorResponse(req,res,'unknown',""+err);
        } else if (isDefaultResponse) {
            returnErrorResponse(req,res,config.errors.user_cancel.code,config.errors.user_cancel.description);
        } else {
            req.session.destroy();
        }
    });
}

module.exports.createConsent = createConsent;
