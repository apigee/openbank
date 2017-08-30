/**
 * Otp Route.
 */
var express = require('express');
var otp = require('../controllers/otp');
var router = express.Router();
/*
router.get('/', otp.showMsisdnForm);
router.post('/', otp.generateOtp);
router.get('/validate', otp.showOtpForm);
*/
router.post('/validate', otp.validateOtp);
module.exports = router;
