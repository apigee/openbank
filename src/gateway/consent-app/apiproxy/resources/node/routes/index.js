/**
* Index Route.
*
*/
var express = require('express');
var router = express.Router();
var index = require('common-consent-controller').index;



/* GET home page. */
router.get('/', index.consentTransaction);




module.exports = router;
