var express = require('express');
var router = express.Router();

var request = require('request');

var package = require('../package');

/* GET home page. */
router.get('/', function (req, res, next) {
    //get all consents
    query = {};
    query.client_id = package.clientId;
    query.client_secret = package.clientSecret;
    var customerId = req.query.customerId;
    options = {
        url: package.baasURI + "/" + package.baasOrg + "/" + package.baasApp + "/customers/" + customerId + "/has_consented_to/consents",
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        qs: query
    };
    request(options, function (err, response, resbody) {
        if (!err && response.statusCode == 200) {
            var body = JSON.parse(resbody);
            if (body.entities)
                res.send(body.entities);
            else
                next();
        }
        else {
            next();
        }


    });
});

router.get('/:consentId', function (req, res, next) {
    //get consent
    query = {};
    query.client_id = package.clientId;
    query.client_secret = package.clientSecret;
    var consentId = req.params.consentId;
    options = {
        url: package.baasURI + "/" + package.baasOrg + "/" + package.baasApp + "/consents/" + consentId,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        qs: query
    };
    request(options, function (err, response, resbody) {
        if (!err && response.statusCode == 200) {
            var body = JSON.parse(resbody);
            if (body.entities)
                res.send(body.entities[0]);
            else
                next();
        }
        else {
            next();
        }


    });
});

router.post('/', function (req, res, next) {
    //create consent
    query = {};
    query.client_id = package.clientId;
    query.client_secret = package.clientSecret;
    var customerId = req.body.customerId;
    var consentId = req.body.consentId;
    options = {
        url: package.baasURI + "/" + package.baasOrg + "/" + package.baasApp + "/consents/",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        body: req.body,
        json: true,
        qs: query
    };
    request(options, function (err, response, resbody) {
        if (!err && response.statusCode == 200) {
                    res.sendStatus(201);
        }
        else {
            next();
        }


    });
});

router.put('/:consentId', function (req, res, next) {
    //update consent
    query = {};
    query.client_id = package.clientId;
    query.client_secret = package.clientSecret;
    var consentId = req.params.consentId;
    options = {
        url: package.baasURI + "/" + package.baasOrg + "/" + package.baasApp + "/consents/" + consentId,
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        body: req.body,
        json: true,
        qs: query
    };
    request(options, function (err, response, resbody) {
        if (!err && response.statusCode == 200) {
            res.sendStatus(200);
        }
        else {
            next();
        }
    });
});

router.delete('/:consentId', function (req, res, next) {
    //get delete consents
    query = {};
    query.client_id = package.clientId;
    query.client_secret = package.clientSecret;
    var consentId = req.params.consentId;
    options = {
        url: package.baasURI + "/" + package.baasOrg + "/" + package.baasApp + "/consents/" + consentId,
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        qs: query
    };
    request(options, function (err, response, resbody) {
        if (!err && response.statusCode == 200) {
            res.sendStatus(200);
        }
        else {
            next();
        }
    });
});

module.exports = router;
