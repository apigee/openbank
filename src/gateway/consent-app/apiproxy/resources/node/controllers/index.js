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
 * Index Controller.
 * The controller for the home page operations.
 */
var session = require('./../lib/session');
//var request = require('request');
var index = {};
var config = require('../config.json');


index.storeSession = function (req, res, next) {

    var state = makeState();//for loginApp redirection
    var sessionObj = {
        consentTransaction: req.body,
        state: state
    }

    if (req.session) {//Already a  session is found, but URL is wrong
        console.log("Cookie Error, Invalid State: Invalid session");
        session.replace(sessionObj, req, res);
        //redirect to Error Page;
    } else {
        session.create(sessionObj, req, res);
    }

    res.redirect(config.loginApplication.transactionEndpoint + "?redirectUri=" + config.consentPath + "&state=" + state);
};

function makeState() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
module.exports = index;