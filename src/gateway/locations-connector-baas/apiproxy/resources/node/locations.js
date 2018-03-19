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
 * locations.js
 * Locations Route.
 */
var request = require('request');
var apigee = require('apigee-access');
var packagejson = require('./package.json');
exports.getAtms = function (req, res) {
    getLocations('atm', req, function (data) {
        res.json(data);
    });
};

exports.getBranches = function (req, res) {
    getLocations('branch', req, function (data) {
        delete data.isWithdrawalCharged;
        delete data.status;
        delete data.statusMessage;
        delete data.currency;

        res.json(data);
    });
};

function getLocations(resType, req, callback) {
    var basePath = apigee.getVariable(req, 'appBasePath');

    var options = {
        url: basePath + '/locations',
        qs: {
            ql: 'where ' + resType + ' = true',
            limit: 1000,
            client_id : packagejson.clientId,
            client_secret : packagejson.clientSecret
        },
        json: true
    };
    var openingday =  "allday";
    var openingAt = "alltime";

    if (req.query.latitude && req.query.longitude) {
        var radius = req.query.radius || 1;
        var lat = req.query.latitude;
        var long = req.query.longitude;
        
        console.log("lat"+lat);

        options.qs.ql += ' and Location within ' + radius + ' of ' + lat + ', ' + long;
    }

    if (req.query.hasOwnProperty('wheelchair')) {
        options.qs.ql += " and Wheelchair = " + (req.query.wheelchair === 'true');
    }

    if (resType === 'atm' && req.query.currency) {
        options.qs.ql += " and Currency = '" + req.query.currency + "'";
    }

    if (resType === 'atm' && req.query.hasOwnProperty('isWithdrawalCharged')) {
        options.qs.ql += " and IsWithdrawalCharged = " + (req.query.isWithdrawalCharged === 'true');
    }

    if (resType === 'atm' && req.query.hasOwnProperty('status')) {
        options.qs.ql += " and Status = '" + req.query.status + "'";
    }

    if (req.query.openingDay) 
    {
        openingday = req.query.openingDay;
        if(req.query.openAt)
        {
            openingAt = req.query.openAt;
        }
    }

    console.log(options.qs.ql);

    request(options, function (err, resp, body) {
        var data = [];

        if (!err && resp.statusCode == 200 && body.entities) 
        {
            if(resType == "atm")
            {
            for (var i = 0; i < body.entities.length; i++) {
                var entity = {}; 
                
                entity.AtmId = body.entities[i].AtmId;
                entity.AtmServices = body.entities[i].AtmServices;
                entity.Address = body.entities[i].Address;
                entity.Currency = body.entities[i].Currency;
                entity.Location = body.entities[i].Location;
                entity.LocationCategory = body.entities[i].LocationCategory;
                entity.MinimumValueDispensed = body.entities[i].MinimumValueDispensed;
                entity.Organisation = body.entities[i].Organisation;
                entity.SiteName = body.entities[i].SiteName;
                entity.SupportedLanguages = body.entities[i].SupportedLanguages;
              
                
               

                data.push(entity);
            }
        }
        else if(resType == "branch")
        {
            var filterDay = false;
            var filtertime = false;
            if(openingday != "allday")
            {
                filterDay = true;
                
            }
            
            if(openingAt != "alltime")
            {
             filtertime = true;
            }
            
            
            for (var i = 0; i < body.entities.length; i++) 
            {
                
                var entity = {}; 
                entity.AtmAtBranch = body.entities[i].AtmAtBranch;
                entity.Access = body.entities[i].Access;
                entity.BranchIdentification = body.entities[i].BranchIdentification;
                entity.BranchName = body.entities[i].BranchName;
                entity.Address = body.entities[i].Address;
                entity.BranchMediatedServiceName = body.entities[i].BranchMediatedServiceName;
                entity.BranchPhoto = body.entities[i].BranchPhoto;
                entity.BranchSelfServeServiceName = body.entities[i].BranchSelfServeServiceName;
                entity.BranchType = body.entities[i].BranchType;
                entity.CustomerSegment = body.entities[i].CustomerSegment;
                entity.FaxNumber = body.entities[i].FaxNumber;
                entity.Location = body.entities[i].Location;
                entity.OpeningTimes = body.entities[i].OpeningTimes;
                entity.Organisation = body.entities[i].Organisation;
                entity.TelephoneNumber = body.entities[i].TelephoneNumber;
                
                if(filterDay)
                {
                    if(body.entities[i].openingTimes)
                    {
                        
                    for(var j = 0; j < body.entities[i].openingTimes.length; j++)
                    {
                        if( body.entities[i].openingTimes[j].openingDay == openingday )
                        {
                            if(filtertime)
                            {
                                
                                var openingTime = body.entities[i].openingTimes[j].openingTime.split(":");
                                var closingTime = body.entities[i].openingTimes[j].closingTime.split(":");
                                
                                
                                var openminute = parseFloat(openingTime[0])*60 + parseFloat(openingTime[1]);
                                var closeminute = parseFloat(closingTime[0])*60 + parseFloat(closingTime[1]);
                                
                                console.log("open"+ openminute);
                                console.log("close"+ closeminute);
                                
                                if( (openingAt >= openminute ) && (openingAt <= closeminute)) 
                                {
                                    data.push(entity);
                                    break;
                                }
                                
                            }
                            else
                            {
                                data.push(entity);
                                break;
                            }
                        }
                    }
                }
                }
                else
                {
                    data.push(entity);
                }
                
            }
        }
        }

        callback(data);
    });
}