var request = require('request');
var stepsProcess = {};


stepsProcess.loadStep = function (req, res, next) {
  var config = req.app.get('config');
  var currentStep = 0;
  if (typeof req.session.loaCurrentStep !== 'undefined') {
    currentStep = req.session.loaCurrentStep;
  }
  else{
    req.session.loaCurrentStep = currentStepItem;
  }

  // Load the active loa steps, numSteps and sessionid from the session which get store during the
  // initialization.
  console.log('here ' + req.session.loaActiveSteps + ' req.session.loaActiveSteps');
  console.log('here ' + currentStep + ' currentStep');
  console.log('here ' + req.session.loaCurrentStep + ' req.session.loaCurrentStep');

  var loaActiveSteps = req.session.loaActiveSteps;
  var numSteps = req.session.loaNumSteps;
  var sessionid = req.session.sessionid;
  var currentStepItem = loaActiveSteps[currentStep];

  console.log('here ' + JSON.stringify(currentStepItem) + ' currentStepItem');

  // Increment the step value and store it in the session to be used by the next
  // call of loadStep().
  if (currentStep < numSteps) {
    // Get the redirect path for the current step and set the redirect.

    console.log('here ' + currentStepItem.path + ' currentStepItem.path');

    var redirectPath = config.base_path + currentStepItem.path;

    req.session.loaCurrentStep = currentStep+1;
    // Issue a redirect to the appropriate steps.
    res.redirect(redirectPath+'?sessionid='+sessionid);
  }
  else {
    // We are done with all the authentication steps. We now pass on the control
    // to the consent step.
    res.redirect(config.base_path+'/consent');
  }

}

stepsProcess.sendError = function (err, req, res, next) {

  var consentTransaction = req.session.consentTransaction ;
  var redirect_uri = consentTransaction.redirect_uri+"?error="+err.error+"&error_description="+err.description+"&state="+consentTransaction.state;
  req.session.destroy();
  res.redirect(redirect_uri);
}

module.exports = stepsProcess;
