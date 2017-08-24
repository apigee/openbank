var session = require('./../lib/session');

var sendRedirect = function(req,res,url) {
    var sessionObj = req.session;
    session.replace(sessionObj,req,res);
    res.redirect(url);
}

var sendErrorRedirect = function(req,res,url) {
    var sessionObj = req.session;
    session.delete(sessionObj,req,res);
    res.redirect(url);
}

var render = function(req,res,pageTemplate,object) {
    var sessionObj = req.session;
    session.replace(sessionObj,req,res);
    res.render(pageTemplate,object);
}

var renderError = function(req,res,pageTemplate,object) {
    var sessionObj = req.session;
    session.delete(sessionObj,req,res);
    res.render(pageTemplate,object);
}

module.exports.redirect = sendRedirect;
module.exports.redirectError = sendErrorRedirect;
module.exports.redirectFinal = sendErrorRedirect;
module.exports.render = render;
module.exports.renderError = renderError;