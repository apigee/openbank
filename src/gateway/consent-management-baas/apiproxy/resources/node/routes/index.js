/*
 Copyright 2017 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
/**
 * @file
 * index.js
 * Consent Route.
 * This file contains the code for all the Consent operations.
 */
var express = require('express');
var router = express.Router();

var request = require('request');

var packagejson = require('../package');

/* GET home page. */
router.get('/', function (req, res, next) {
    //get all consents
    query = {};
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    var customerId = req.query.customerId;
    if (customerId) {
        query.ql = "where CustomerId = '" + customerId + "'";
    }
    else if (req.query && req.query.requestId && req.query.consentType) {
        query.ql = "where RequestId = '" + req.query.requestId + "' and ConsentType = '"+req.query.consentType+"'";
    }
    options = {
        url: packagejson.baasBasePath + "/consents",
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        qs: query
    };
    request(options, function (err, response, resbody) {
        if (!err && response.statusCode === 200) {
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
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    var consentId = req.params.consentId;
    options = {
        url: packagejson.baasBasePath + "/consents/" + consentId,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        qs: query
    };
    request(options, function (err, response, resbody) {
        if (!err && response.statusCode === 200) {
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
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    //var customerId = req.body.customerId;
    //var consentId = req.body.consentId;
    options = {
        url: packagejson.baasBasePath + "/consents/",
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
        if (!err && response.statusCode === 200) {
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
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    var consentId = req.params.consentId;
    options = {
        url: packagejson.baasBasePath + "/consents/" + consentId,
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
        if (!err && response.statusCode === 200) {
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
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    var consentId = req.params.consentId;
    options = {
        url: packagejson.baasBasePath + "/consents/" + consentId,
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        qs: query
    };
    request(options, function (err, response, resbody) {
        if (!err && response.statusCode === 200) {
            res.sendStatus(200);
        }
        else {
            next();
        }
    });
});

module.exports = router;