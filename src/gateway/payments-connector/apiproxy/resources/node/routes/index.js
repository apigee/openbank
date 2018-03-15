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
    query["x-apikey"] = packagejson.apikey;
    var paymentId = req.params.paymentId;
    options = {
        url: packagejson.targetURL + "/payments/" + paymentId,
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
                body.Links = {"self": "/payments/" + resbody.entities[0].uuid};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.entities[0].CreationDateTime).toISOString();
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
    query["x-apikey"] = packagejson.apikey;
    var paymentId = req.params.paymentId;
    options = {
        url: packagejson.targetURL + "/payments/" + paymentId,
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
                body.Data = resbody.Data;
                body.Risk = resbody.Risk;
                body.Links = {"self": "/payments/" + resbody.uuid};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.CreationDateTime).toISOString();
                body.Data.PaymentId = resbody.uuid;
                body.Data.Status = resbody.Status;
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
    query["x-apikey"] = packagejson.apikey;
    var paymentSubmissionsId = req.params.paymentSubmissionsId;
    options = {
        url: packagejson.targetURL + "/paymentsubmissions/" + paymentSubmissionsId,
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
                body.Links = {"self": "/paymentsubmissions/" + resbody.entities[0].uuid};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.entities[0].CreationDateTime).toISOString();
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
    query["x-apikey"] = packagejson.apikey;
    //var customerId = req.body.customerId;
    //var consentId = req.body.consentId;
    req.body.Status = "Pending";
    req.body.CreationDateTime = Date.parse(new Date());
    options = {
        url: packagejson.targetURL + "/payments",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        body: req.body,
        json: true,
        qs: query
    };
    request(options, function (err, response, resbody) 
    {
        console.log("response.statusCode"+response.statusCode);
        console.log("errr"+JSON.stringify(err));
        console.log("resbody"+JSON.stringify(resbody));
        if (!err && response.statusCode === 200 || response.statusCode === 201) {
            try {
                res.status(201);
                var body = {};
                body.Data = resbody.Data;
                body.Risk = resbody.Risk;
                body.Links = {"self": "/payments/" + resbody.uuid};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.CreationDateTime).toISOString();
                body.Data.PaymentId = resbody.uuid;
                body.Data.Status = resbody.Status;
                res.send(body);
            }
            catch (e) {
                var err = new Error(e);
                err.status = 400;
                next(err);
            }
        }
        else {
            console.log("errrrr"+err);
            var err = new Error('Bad Request');
            err.status = 400;
            next(err);
        }


    });
});

router.post('/payment-submissions', function (req, res, next) {
    //create payment submission
    query = {};
    query["x-apikey"] = packagejson.apikey;
    //var customerId = req.body.customerId;
    //var consentId = req.body.consentId;
    req.body.Status = "AcceptedSettlementInProcess";
    req.body.CreationDateTime = Date.parse(new Date());
    options = {
        url: packagejson.targetURL + "/paymentsubmissions",
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
        if (!err && response.statusCode === 200 || response.statusCode === 201) {
            try {
                res.status(201);
                var body = {};
                body.Data = {};
                body.Links = {"self": "/paymentsubmissions/" + resbody.uuid};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.CreationDateTime).toISOString();
                body.Data.PaymentId = resbody.Data.PaymentId;
                body.Data.Status = resbody.Status;
                body.Data.PaymentSubmissionId = resbody.uuid;
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