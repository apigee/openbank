var request = require('request');
var apigee = require('apigee-access');

exports.getAtms = function (req, res) {
    getLocations('atm', req, function (data) {
        res.json(data);
    });
};

exports.getBranches = function(req, res) {
    getLocations('branch', req, function (data) {
        res.json(data);
    });
};

function getLocations(resType, req, callback) {
    var basePath = apigee.getVariable(req, 'appBasePath');

    var options = {
        url: basePath + '/locations',
        qs: {
            ql: 'where resources.' + resType + ' = true',
            limit: 1000
        },
        json: true
    };

    if (req.query.latitude && req.query.longitude) {
        var radius = req.query.radius || 1;
        var lat = req.query.latitude;
        var long = req.query.longitude;

        options.qs.ql += ' and location within ' + radius + ' of ' + lat + ', ' + long;
    }

    console.log(options.qs.ql);

    request(options, function (err, resp, body) {
        var data = [];

        if (!err && resp.statusCode == 200 && body.entities) {
            for (var i = 0; i < body.entities.length; i++) {
                data.push({
                    address: body.entities[i].address,
                    location: body.entities[i].location
                });
            }
        }

        callback(data);
    });
}