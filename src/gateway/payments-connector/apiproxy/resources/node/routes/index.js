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
        url: packagejson.baasURI + "/" + packagejson.baasOrg + "/" + packagejson.baasApp + "/payments/" + paymentId,
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
                body.Link = {"Self": resbody.entities[0].metadata.path};
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
        url: packagejson.baasURI + "/" + packagejson.baasOrg + "/" + packagejson.baasApp + "/payments/" + paymentId,
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
                body.Link = {"Self": resbody.entities[0].metadata.path};
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
        url: packagejson.baasURI + "/" + packagejson.baasOrg + "/" + packagejson.baasApp + "/payment-submissions/" + paymentSubmissionsId,
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
                body.Link = {"Self": resbody.entities[0].metadata.path};
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
    var customerId = req.body.customerId;
    var consentId = req.body.consentId;
    req.body.Status = "Pending";
    options = {
        url: packagejson.baasURI + "/" + packagejson.baasOrg + "/" + packagejson.baasApp + "/payments",
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
                body.Link = {"Self": resbody.entities[0].metadata.path};
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
    var customerId = req.body.customerId;
    var consentId = req.body.consentId;
    req.body.Status = "AcceptedCustomerProfile";
    options = {
        url: packagejson.baasURI + "/" + packagejson.baasOrg + "/" + packagejson.baasApp + "/payment-submissions",
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
                body.Link = {"Self": resbody.entities[0].metadata.path};
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