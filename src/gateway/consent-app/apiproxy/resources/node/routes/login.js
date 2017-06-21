/**
 * Login Route.
 */
var express = require('express');
var router = express.Router();
var login = require('../controllers/login');
var jwt = require('jsonwebtoken');
var stepsProcess = require('../controllers/stepsProcess');

router.get('/', function (req, res, next) {
    var loginJWT = req.cookies['login-jwt'];
    if (loginJWT) {
        try {
            var decoded = jwt.verify(loginJWT, 'ssshhhh');
            req.session.authenticationTransaction = decoded;
            stepsProcess.loadStep(req, res, next);
        } catch (err) {
            next()
        }
    }
    else {
        next()
    }
},login.loginForm);
router.post('/', login.doLogin);

module.exports = router;
