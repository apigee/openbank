var request = require('request');
var stepsProcess = {};

stepsProcess.getStepPath = function (name) {
    // define all the system paths for each of the steps as an array.
    // Keys are the step names that will be given in config.json.
    var stepPaths = [];
    stepPaths['OTP'] = '/otp';
    stepPaths['UID_PWD'] = '/login';
    return stepPaths[name];
}

stepsProcess.loadStep = function (req, res, next) {
    var config = req.app.get('config');
    var currentStep = 0;
    if (typeof req.session.loaCurrentStep !== 'undefined') {
        var currentStep = req.session.loaCurrentStep;
    }
    else {
        req.session.loaCurrentStep = currentStep;
    }

    // Load the active loa steps, numSteps and sessionid from the session which get store during the
    // initialization.
    var loaActiveSteps = req.session.loaActiveSteps;
    var numSteps = req.session.loaNumSteps;
    var sessionid = req.session.sessionid;
    var currentStepItem = loaActiveSteps[currentStep];

    console.log('loaActiveSteps = ' + JSON.stringify(loaActiveSteps, null, 2));
    console.log('numSteps = ' + numSteps);
    console.log('currentStepItem = ' + JSON.stringify(currentStepItem, null, 2));
    console.log('sessionid = ' + sessionid);

    // Increment the step value and store it in the session to be used by the next
    // call of loadStep().
    if (currentStep < numSteps) {
        // If mobile number is present and needs to go to OTP flow, then trigger OTP directly.
        // if (currentStepItem.name === 'OTP' && req.session.authenticationTransaction.phone_number !== null) {
        //   req.session.loaCurrentStep = currentStep+1;
        //
        //   var uri = config.base_path+stepsProcess.getStepPath(currentStepItem.name);
        //
        // } else {
        // Get the redirect path for the current step and set the redirect.
        var redirectPath = config.base_path + stepsProcess.getStepPath(currentStepItem.name);

        req.session.loaCurrentStep = currentStep + 1;
        // Issue a redirect to the appropriate steps.
        console.log('redirectPath = ' + redirectPath);
        res.redirect(redirectPath + '?sessionid=' + sessionid);
        // }
    }
    else {
        // We are done with all the authentication steps. We now pass on the control
        // to the consent step.
        res.redirect(config.base_path + '/consent');
    }
};

stepsProcess.sendError = function (err, req, res, next) {

    var consentTransaction = req.session.consentTransaction;
    var redirect_uri = consentTransaction.redirect_uri + "?error=" + err.error + "&error_description=" + err.description + "&state=" + consentTransaction.state;
    req.session.destroy();
    res.redirect(redirect_uri);
}

module.exports = stepsProcess;
