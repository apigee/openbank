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