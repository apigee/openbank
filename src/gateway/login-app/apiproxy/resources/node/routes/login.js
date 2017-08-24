/**
 * Created by rmahalank on 8/8/17.
 */
/**
 * Login Route.
 */
var express = require('express');
var router = express.Router();
var login = require('../controllers/login');
var jwt = require('jsonwebtoken');


router.get('/', login.loginForm);
router.post('/', login.doLogin);


module.exports = router;
