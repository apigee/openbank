/**
 * Login Route.
 */
var express = require('express');
var router = express.Router();
var login = require('common-consent-controller').login;

router.get('/', login.loginForm);
router.post('/', login.doLogin);

module.exports = router;
