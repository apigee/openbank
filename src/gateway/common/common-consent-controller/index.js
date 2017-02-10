var index 	= require('./controllers/index'); 
var login 	= require('./controllers/login'); 
var otp 	= require('./controllers/otp'); 


var stepsprocess = require('./controllers/stepsProcess');

module.exports.createConsent = function(customConsent) {
    return require('./controllers/consent').createConsent(customConsent);
}

/*
module.exports.createLogin = function() {
    return require('./controllers/login');
}

module.exports.loadNextPage = function(req,res,next){
    stepsprocess.loadStep(req,res,next);
}

module.exports.loadErrorPage = function(err,req,res,next) {
    stepsprocess.sendError(err,req,res,next);
}
*/

module.exports.index 	= index;
module.exports.login 	= login;
module.exports.otp 		= otp;