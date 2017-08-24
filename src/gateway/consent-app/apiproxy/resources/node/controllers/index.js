/**
 * IndexController
 * The controller for the home page operations.
 */
var session = require('./../lib/session');
var request = require('request');
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