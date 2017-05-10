/**
* Consent Route.
*/

var express = require('express');
var router = express.Router();
var consent = require('../controllers/consent');



/* GET Consent page. */
router.get('/', consent.showConsent);

/* POST Consent page. */
router.post('/', consent.doConsent);



module.exports = router;
