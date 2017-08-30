var request = require('request');
var otp = {};
var responseHandler = require('./../lib/response_handler');
/*

otp.showMsisdnForm = function (req, res, next) {
    var msisdn = req.session.customerDetails.Phone;
    if (msisdn === null || typeof msisdn === 'undefined' || msisdn === '') {
        responseHandler.render(req, res, 'otp');
    } else
        otp.generateOtp(req, res, next);
};
 */

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
/*

otp.showOtpForm = function (req, res, next) {
    var msisdn = req.body.msisdn || req.session.customerDetails.Phone;
    msisdn = msisdn.toString().slice(-4);
    var otpData = {};
    otpData.msisdn = msisdn;
    responseHandler.render(req, res, 'verify_otp', otpData);
};
*/

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