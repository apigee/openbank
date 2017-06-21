var stepsProcess = require('./stepsProcess');
var request = require('request');
var login = {};
var jwt = require('jsonwebtoken');

login.loginForm = function(req, res, next) {
    console.log('rendering login page');
    res.render('login');
};

login.doLogin = function(req, res, next) {
    var config = req.app.get('config');

    var username = req.body.username;
    var password = req.body.password;

    // call the authentication endpoint to validate the user credentials
    var options = {
        'url': config.authenticationTransaction.transactionEndpoint,
        'method': config.authenticationTransaction.method,
        'headers': config.authenticationTransaction.headers,
        'body': {
            "grant_type": "password",
            "username": username,
            "password": password
        },
        "json": true
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            try {
                var authenticationTransaction = body;
                req.session.authenticationTransaction = body;
                var loginJWT = jwt.sign(body, 'ssshhhh', {expiresIn: 60 * 60});
                res.cookie('login-jwt',loginJWT, { maxAge: 3600000, httpOnly: true });
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

    // Call the backend to validate the login credentials.
    //

};

module.exports = login;