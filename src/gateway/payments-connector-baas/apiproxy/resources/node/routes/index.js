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
router.get('/payments/:paymentId', function (req, res, next) {
    //get payment request
    query = {};
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    var paymentId = req.params.paymentId;
    options = {
        url: packagejson.baasBasePath + "/payments/" + paymentId,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        qs: query
    };
    request(options, function (err, response, resbody) {
        if (!err && response.statusCode === 200) {
            try {
                resbody = parseIfNotObject(resbody);
                var body = {};
                body.Data = resbody.entities[0].Data;
                body.Risk = resbody.entities[0].Risk;
                body.Links = {"Self": resbody.entities[0].metadata.path};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.entities[0].created).toISOString();
                body.Data.PaymentId = resbody.entities[0].uuid;
                body.Data.Status = resbody.entities[0].Status;
                res.send(body);
            }
            catch (e) {
                var err = new Error('Bad Request');
                err.status = 400;
                next(err);
            }
        }
        else {
            var err = new Error('Bad Request');
            err.status = 400;
            next(err);
        }
    });
});

router.put('/payments/:paymentId', function (req, res, next) {
    //get payment request
    query = {};
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    var paymentId = req.params.paymentId;
    options = {
        url: packagejson.baasBasePath + "/payments/" + paymentId,
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
            try {
                resbody = parseIfNotObject(resbody);
                var body = {};
                body.Data = resbody.entities[0].Data;
                body.Risk = resbody.entities[0].Risk;
                body.Links = {"Self": resbody.entities[0].metadata.path};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.entities[0].created).toISOString();
                body.Data.PaymentId = resbody.entities[0].uuid;
                body.Data.Status = resbody.entities[0].Status;
                res.send(body);
            }
            catch (e) {
                var err = new Error('Bad Request');
                err.status = 400;
                next(err);
            }
        }
        else {
            var err = new Error('Bad Request');
            err.status = 400;
            next(err);
        }
    });
});

router.get('/payment-submissions/:paymentSubmissionsId', function (req, res, next) {
    //get payment submission
    query = {};
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    var paymentSubmissionsId = req.params.paymentSubmissionsId;
    options = {
        url: packagejson.baasBasePath + "/payment-submissions/" + paymentSubmissionsId,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        qs: query
    };
    request(options, function (err, response, resbody) {
        if (!err && response.statusCode === 200) {
            try {
                resbody = parseIfNotObject(resbody);
                var body = {};
                body.Data = {};
                body.Links = {"Self": resbody.entities[0].metadata.path};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.entities[0].created).toISOString();
                body.Data.PaymentId = resbody.entities[0].Data.PaymentId;
                body.Data.Status = resbody.entities[0].Status;
                body.Data.PaymentSubmissionId = resbody.entities[0].uuid;
                res.send(body);
            }
            catch (e) {
                var err = new Error('Bad Request');
                err.status = 400;
                next(err);
            }
        }
        else {
            var err = new Error('Bad Request');
            err.status = 400;
            next(err);
        }
    });
});

router.post('/payments', function (req, res, next) {
    //create payment request
    query = {};
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    //var customerId = req.body.customerId;
    //var consentId = req.body.consentId;
    req.body.Status = "Pending";
    options = {
        url: packagejson.baasBasePath + "/payments",
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
            try {
                res.status(201);
                var body = {};
                body.Data = resbody.entities[0].Data;
                body.Risk = resbody.entities[0].Risk;
                body.Links = {"Self": resbody.entities[0].metadata.path};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.entities[0].created).toISOString();
                body.Data.PaymentId = resbody.entities[0].uuid;
                body.Data.Status = resbody.entities[0].Status;
                res.send(body);
            }
            catch (e) {
                var err = new Error('Bad Request');
                err.status = 400;
                next(err);
            }
        }
        else {
            var err = new Error('Bad Request');
            err.status = 400;
            next(err);
        }


    });
});

router.post('/payment-submissions', function (req, res, next) {
    //create payment submission
    query = {};
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    //var customerId = req.body.customerId;
    //var consentId = req.body.consentId;
    req.body.Status = "AcceptedSettlementInProcess";
    options = {
        url: packagejson.baasBasePath + "/payment-submissions",
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
            try {
                res.status(201);
                var body = {};
                body.Data = {};
                body.Links = {"Self": resbody.entities[0].metadata.path};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.entities[0].created).toISOString();
                body.Data.PaymentId = resbody.entities[0].Data.PaymentId;
                body.Data.Status = resbody.entities[0].Status;
                body.Data.PaymentSubmissionId = resbody.entities[0].uuid;
                res.send(body);
            }
            catch (e) {
                var err = new Error('Bad Request');
                err.status = 400;
                next(err);
            }
        }
        else {
            var err = new Error('Bad Request');
            err.status = 400;
            next(err);
        }


    });
});

function parseIfNotObject(obj) {
    if (typeof obj === "object") {
        return obj;
    }
    return JSON.parse(obj);
}


module.exports = router;