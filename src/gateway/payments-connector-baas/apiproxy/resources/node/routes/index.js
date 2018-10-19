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

var request = require('request');

var packagejson = require('../package');

/* GET home page. */
exports.getPaymentRequestConsent = function(req, res, next) {
    //get payment request
    query = {};
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    var paymentId = req.params.paymentId;
    options = {
        url: packagejson.baasBasePath + "/domestic-payment-consents/" + paymentId,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        qs: query
    };
    request(options, function(err, response, resbody) {
        if (!err && response.statusCode === 200) {
            try {
                resbody = parseIfNotObject(resbody);
                var body = {};
                body.Data = resbody.entities[0].Data;
                body.Risk = resbody.entities[0].Risk;
                body.Links = {"self": "/domestic-payment-consents/" + resbody.entities[0].uuid};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.entities[0].CreationDateTime).toISOString();
                body.Data.ConsentId = resbody.entities[0].uuid;
                body.Data.Status = resbody.entities[0].Status;
                body.Data.StatusUpdateDateTime = new Date(resbody.StatusUpdateDateTime).toISOString();
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
};

exports.updatePaymentRequestConsent = function (req, res, next) {
    //get payment request
    query = {};
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    var paymentId = req.params.paymentId;
    res.body.StatusUpdateDateTime = Date.parse(new Date());
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
                body.Data = resbody.Data;
                body.Risk = resbody.Risk;
                body.Links = {"self": "/domestic-payment-consents/" + resbody.uuid};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.CreationDateTime).toISOString();
                body.Data.ConsentId = resbody.uuid;
                body.Data.Status = resbody.Status;
                body.Data.StatusUpdateDateTime = new Date(resbody.StatusUpdateDateTime).toISOString();
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
};

exports.getPaymentOrder = function (req, res, next) {
    //get payment submission
    query = {};
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    var paymentSubmissionsId = req.params.paymentSubmissionsId;
    options = {
        url: packagejson.baasBasePath + "/domestic-payments/" + paymentSubmissionsId,
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
                body.Links = {"self": "/domestic-payments/" + resbody.entities[0].uuid};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.entities[0].CreationDateTime).toISOString();
                body.Data.StatusUpdateDateTime = new Date(resbody.entities[0].StatusUpdateDateTime).toISOString();
                body.Data.Status = resbody.entities[0].Status;
                body.Data.DomesticPaymentId = resbody.entities[0].uuid;
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
};

/* Create  Payment Request Consent */
exports.createPaymentRequestConsent = function(req,res,next) {
    //create payment request
    query = {};
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    //var customerId = req.body.customerId;
    //var consentId = req.body.consentId;
    req.body.Status = "Pending";
    req.body.CreationDateTime = Date.parse(new Date());
    res.body.StatusUpdateDateTime = Date.parse(new Date());
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
                body.Data = resbody.Data;
                body.Risk = resbody.Risk;
                body.Links = {"self": "/domestic-payment-consents/" + resbody.uuid};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.CreationDateTime).toISOString();
                body.Data.ConsentId = resbody.uuid;
                body.Data.Status = resbody.Status;
                body.Data.StatusUpdateDateTime = new Date(resbody.StatusUpdateDateTime).toISOString();
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
};

/* Create Payment Order */

exports.createPaymentOrder = function(req,res,next) {
    //create payment submission
    query = {};
    query.client_id = packagejson.clientId;
    query.client_secret = packagejson.clientSecret;
    //var customerId = req.body.customerId;
    //var consentId = req.body.consentId;
    req.body.Status = "AcceptedSettlementInProcess";
    req.body.CreationDateTime = Date.parse(new Date());
    req.body.StatusUpdateDateTime = Date.parse(new Date());

    options = {
        url: packagejson.baasBasePath + "/domestic-payments",
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
                body.Data = resbody.Data;
                body.Links = {"self": "/domestic-payments/" + resbody.uuid};
                body.Meta = {};
                body.Data.CreationDateTime = new Date(resbody.CreationDateTime).toISOString();
                body.Data.StatusUpdateDateTime = new Date(resbody.StatusUpdateDateTime).toISOString();
                body.Data.DomesticPaymentId = resbody.uuid;
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
};

function parseIfNotObject(obj) {
    if (typeof obj === "object") {
        return obj;
    }
    return JSON.parse(obj);
}


module.exports = router;