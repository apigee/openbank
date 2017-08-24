/**
 * Index Route.
 *
 */
var express = require('express');
var router = express.Router();
var index = require('../controllers/index');

/* GET home page. */
router.post('/authorize', index.storeSession);

module.exports = router;
