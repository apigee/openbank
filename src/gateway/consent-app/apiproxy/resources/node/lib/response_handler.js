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
 * response_handler.js
 * Cookies response handler to add session back to cookie
 */

var session = require('./../lib/session');

var sendRedirect = function (req, res, url) {
    var sessionObj = req.session;
    session.replace(sessionObj, req, res);
    res.redirect(url);
}

var sendErrorRedirectJSON = function (req, res, url) {
    var sessionObj = req.session;
    session.replace(sessionObj, req, res);
    res.send({"redirect":url});
}

var sendText = function (req, res, resText) {
    var sessionObj = req.session;
    session.replace(sessionObj, req, res);
    res.send(resText);
}

var sendErrorRedirect = function (req, res, url) {
    var sessionObj = req.session;
    session.delete(sessionObj, req, res);
    res.redirect(url);
}

var render = function (req, res, pageTemplate, object) {
    var sessionObj = req.session;
    session.replace(sessionObj, req, res);
    res.render(pageTemplate, object);
}

var renderError = function (req, res, pageTemplate, object) {
    var sessionObj = req.session;
    session.delete(sessionObj, req, res);
    res.render(pageTemplate, object);
}

module.exports.redirect = sendRedirect;
module.exports.redirectError = sendErrorRedirect;
module.exports.redirectFinal = sendErrorRedirectJSON;
module.exports.redirectErrorJSON = sendErrorRedirectJSON;
module.exports.render = render;
module.exports.renderError = renderError;
module.exports.sendText = sendText;