/**
 * IndexController
 * The controller for the home page operations.
 */

var request = require('request');
var stepsProcess = require('./stepsProcess');
var index = {};

index.consentTransaction = function(req, res, next) {
  req.session.regenerate(function(err){
    if (err) {
      throw new Error(err.message);
    }
  });
  var sessionid = req.session.sessionid = req.query.sessionid;

  // Call the transaction endpoint to get the details of the authentication
  // After getting the details decide on the LOA based on acr value.
  var config = req.app.get('config');
  var options = {
    'url': config.consentTransaction.transactionEndpoint + sessionid,
    'method': config.consentTransaction.method,
    'headers': config.consentTransaction.headers
  };
  request.get(options, function(error, response, body) {
    // Once we get the response we need to store it till the end of the consent.
    // We store the response in the session.
    if (!error && response.statusCode == 200) {
      try {
        var consentTransaction = JSON.parse(body);
        req.session.consentTransaction = consentTransaction;
        var acr_value = consentTransaction.acr_values;
        var loa = config.loa;
        var loaActive = loa[acr_value];
        var numSteps = loaActive.steps.length;

        // If the number of steps is greater than or equal to 2 sort them on
        // weight
        if (numSteps > 1) {
          loaActive.steps.sort(function(a, b) {
            if (a.weight < b.weight) {
              return -1;
            }
            if (a.weight > b.weight) {
              return 1
            }
            return 0
          });
        }

        // Set the active loa steps into session and allow it to be handled by
        // step process controller.
        req.session.loaActiveSteps = loaActive.steps;
        req.session.loaNumSteps = numSteps;
        stepsProcess.loadStep(req, res, next);

      } catch (ex) {}
    } else {
      var err = {
        "error": body.error,
        "description": body.error_description
      };
      stepsProcess.sendError(err, req, res, next);
    }
  });
}

module.exports = index;
