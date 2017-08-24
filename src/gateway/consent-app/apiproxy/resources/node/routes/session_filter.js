var session = require('./../lib/session');

var filter = function (req, res, next) {
    var sessionCookie = req.signedCookies[session.COOKIE_NAME];
    if (sessionCookie) {
        var sessionObj = session.get(sessionCookie);
        req.session = sessionObj;
    }
    next();
}

module.exports = filter;