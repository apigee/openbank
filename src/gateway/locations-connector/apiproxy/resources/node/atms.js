var request = require('request');
var apigee = require('apigee-access');
var config = require("./config.js");

var basePath = config.host + '/' + config.org + '/' + config.app;


exports.getAtms= function (req, res) {

    var options = {
        url: basePath + "/locations",
        qs: {
            limit: 1000
        },
        json: true
    };


    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) {
            var transactions = [];
            for (var i = 0; i < body.entities.length; i++) {
                transactions.push({
                        address: body.entities[i].address,
                        lat: body.entities[i].lat,
                        long: body.entities[i].long,

                });
            }
            res.json(transactions);
        }
    });
};