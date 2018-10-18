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

/* GET Payment Request Consent */
exports.getPaymentRequestConsent = function(req,res,next) {
    //get payment request
    query = {};
    query["x-apikey"] = packagejson.apikey;
    var paymentId = req.params.paymentId;
    options = {
        url: packagejson.targetURL + "/domestic-payment-consents/" + paymentId,
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

}


/* Update Payment Request Consent */

exports.updatePaymentRequestConsent = function (req,res,next) {
    query = {};
    query["x-apikey"] = packagejson.apikey;
    var paymentId = req.params.paymentId;

    res.body.StatusUpdateDateTime = Date.parse(new Date());

    options = {
        url: packagejson.targetURL + "/domestic-payment-consents/" + paymentId,
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

}

/* GET  Payment Order */

exports.getPaymentOrder = function(req,res,next) {
    query = {};
    query["x-apikey"] = packagejson.apikey;
    var paymentSubmissionsId = req.params.paymentSubmissionsId;
    options = {
        url: packagejson.targetURL + "/domestic-payments/" + paymentSubmissionsId,
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
}


/* Create  Payment Request Consent */
exports.createPaymentRequestConsent = function(req,res,next) {
    query = {};
    query["x-apikey"] = packagejson.apikey;
    //var customerId = req.body.customerId;
    //var consentId = req.body.consentId;
    req.body.Status = "Pending";
    req.body.CreationDateTime = Date.parse(new Date());
    res.body.StatusUpdateDateTime = Date.parse(new Date());
    options = {
        url: packagejson.targetURL + "/domestic-payment-consents",
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
        console.log("error"+JSON.stringify(err));
        console.log("resbody"+JSON.stringify(resbody));
        if (!err && response.statusCode === 200 || response.statusCode === 201) {
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
                var err = new Error(e);
                err.status = 400;
                next(err);
            }
        }
        else {
            console.log("err"+err);
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
  query["x-apikey"] = packagejson.apikey;
  //var customerId = req.body.customerId;
  //var consentId = req.body.consentId;
  req.body.Status = "AcceptedSettlementInProcess";
  req.body.CreationDateTime = Date.parse(new Date());
  req.body.StatusUpdateDateTime = Date.parse(new Date());
  options = {
      url: packagejson.targetURL + "/domestic-payments",
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
}  


function parseIfNotObject(obj) {
    if (typeof obj === "object") {
        return obj;
    }
    return JSON.parse(obj);
}


