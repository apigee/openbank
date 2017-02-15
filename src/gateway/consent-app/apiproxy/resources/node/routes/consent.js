/**
* Consent Route.
*/

var express = require('express');
var router = express.Router();
var consent = require('../controllers/consent');

/* GET Consent page. */
router.get('/', function(req, res, next){
	consent.showConsent(req, res, next);
});

/* POST Consent page. */
router.post('/', function(req, res, next){
	consent.doConsent(req, res, next);
});



module.exports = router;
