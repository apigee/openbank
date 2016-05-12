var stepsProcess = require('./stepsProcess');
var request = require('request');
var otp = {};

otp.showMsisdnForm = function(req, res, next) {
  var msisdn = req.session.authenticationTransaction.phone_number;
  console.log('phone = ' + msisdn);
  if (msisdn === null || typeof msisdn === 'undefined' || msisdn === '')
    res.render('otp');
  else
    otp.generateOtp(req, res);
};

otp.generateOtp = function(req, res, next) {
  var config = req.app.get('config');

  var msisdn = req.body.msisdn || req.session.authenticationTransaction.phone_number;
  console.log('sending OTP to ' + msisdn);

  // call the authentication endpoint to validate the user credentials
  var options = {
    'url': config.generateOtp.transactionEndpoint + msisdn,
    'method': config.generateOtp.method,
    'headers': config.generateOtp.headers,
    "json": true
  };

  request(options, function(error, response, body) {
    if (response.statusCode) {
      req.session.msisdn = msisdn;
      res.redirect(config.base_path+'/otp/validate');
    }
  });
};

otp.showOtpForm = function(req, res, next) {
  var msisdn = req.body.msisdn || req.session.authenticationTransaction.phone_number;
  msisdn = msisdn.toString().slice(-4);
  var otpData = {};
  otpData.msisdn = msisdn;

  res.render('verify_otp', otpData);
};

otp.validateOtp = function(req, res, next) {
  var otp = req.body.otp;
  var msisdn = req.session.msisdn;

  var config = req.app.get('config');
  var options = {
    'url': config.validateOtp.transactionEndpoint + msisdn + '/' + otp,
    'method': config.validateOtp.method,
    'headers': config.validateOtp.headers,
    "json": true
  };
  request(options, function(error, response, body) {
    if (response.statusCode == 200) {
      stepsProcess.loadStep(req, res, next);
    }
    else{
      var err = {
        "error": body.error,
        "description": body.error_description
      };
      stepsProcess.sendError(err, req, res, next);
    }
  });
}

module.exports = otp;
