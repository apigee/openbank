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

    if (req.query.wheelchair) {
        options.qs.ql += ' and access.wheelchair = true'
    }

    if (req.query.currency) {
        options.qs.ql += " and currency = '" + req.query.currency + "'";
    }

    if (req.query.openAt) {
        options.qs.ql += " and timings.opensAt <= " + req.query.openAt
            + " timings.closesAt >= " + req.query.openAt;
    }

    request(options, function (err, resp, body) {
        var data = [];

        if (!err && resp.statusCode == 200 && body.entities) {
            for (var i = 0; i < body.entities.length; i++) {
                var entity = body.entities[i];

                delete entity.uuid;
                delete entity.type;
                delete entity.metadata;
                delete entity.created;
                delete entity.modified;

                data.push(entity);
            }
        }

        callback(data);
    });
}