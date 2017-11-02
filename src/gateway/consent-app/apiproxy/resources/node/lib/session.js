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
 * session.js
 * Cookie session implementation
 */

var config = require('./../config.json');

var session = null;

const MAX_AGE = 15 * 60 * 1000;//15 minutes for session cookie

const OB_COOKIE = config.cookie_name ? config.cookie_name : "OB_SESSION";

//Creating Sub class
//*********************
//var session =     {
// create: function (sessionDetails) {
//     //shall create new session
//     //generate sessionId
//     //return Session JSON object that needs to be assigned to OB_SESSION cookie
// },
//
// update: function(sessionObject, sessionDetails) {
//     //shall update the session with the sessionId
//     //return Session JSON Object that needs to be assigned to OB_SESSION cookie
// },
//
// get: function(sessionObject) {
//     //return session details
// },
//
// delete: function(sessionObject) {
//     //delete session details
// }
//}
//module.exports = session; //Export session object
//*********************


//Usage

//add an entry in config.json
//Path to Session Implementation relative to session.js
//"sessionImpl":"./cookie_session_impl"

//var session = require('/lib/session')
//session.create(details,res)
//session.update(id,details,res)
//session.get(string)
//session.delete(id,res)


function getSession() {

    if (!session) {
        var sessionImpl;
        if (config.sessionImpl) {
            sessionImpl = require(config.sessionImpl);
        } else {
            sessionImpl = require('./cookie_session_impl');
        }
        session = createSession(sessionImpl);
    }

    return session;
}

//Default Session Implementation
var Session = {

    create: function (sessionDetails) {
        //shall create new session
        //generate sessionId
        //return Session JSON object that needs to be assigned to OB_SESSION cookie
        console.log("in Session.create");
        return sessionDetails;
    },

    update: function (sessionObject, sessionDetails) {
        //shall update the session with the sessionId
        //return Session JSON Object that needs to be assigned to OB_SESSION cookie
        if (sessionDetails) {
            for (x in sessionDetails) {
                sessionObject[x] = sessionDetails[x];
            }
        }
        return sessionObject;
    },

    //Replace existing object with the new one
    replace: function (sessionObject) {
        return sessionObject;
    },

    get: function (sessionObject) {
        //return session details
        return sessionObject;
    },

    delete: function (sessionObject) {
        //delete session details
        return sessionObject;
    }
}


module.exports.create = function (sessionDetails, req, res) {
    var s = getSession();
    var cookieObject = s.create(sessionDetails);
    // do whatever necessary encryption required with expiry settings and return the String to be set in OB_COOKIE in the response
    res.cookie(OB_COOKIE, cookieObject, {
        domain: req.hostname,
        maxAge: MAX_AGE,
        httpOnly: true,
        secure: true,
        signed: true
    });
    return cookieObject;
}

module.exports.update = function (sessionObject, sessionDetails, req, res) {
    var s = getSession();
    var cookieObject = s.update(sessionObject, sessionDetails);
// do whatever necessary encryption required with expiry settings and return the String to be set in OB_COOKIE in the response
    if (cookieObject) {
        res.cookie(OB_COOKIE, cookieObject, {
            domain: req.hostname,
            maxAge: MAX_AGE,
            httpOnly: true,
            secure: true,
            signed: true
        });
    }
    return cookieObject;


}

module.exports.replace = function (sessionObject, req, res) {
    var s = getSession();
    var cookieObject = s.replace(sessionObject);
// do whatever necessary encryption required with expiry settings and return the String to be set in OB_COOKIE in the response
    if (cookieObject) {
        res.cookie(OB_COOKIE, cookieObject, {
            domain: req.hostname,
            maxAge: MAX_AGE,
            httpOnly: true,
            secure: true,
            signed: true
        });
    }
    return cookieObject;


}


module.exports.get = function (sessionObject) {
    //do necessary decryption
    //get sessionId
    var s = getSession();
    var sessionValue = s.get(sessionObject);
    return sessionValue;

}

module.exports.delete = function (sessionObject, req, res) {
    var s = getSession();
    s.delete(sessionObject);
    //return necessary cookie String with expiry set in past
    res.clearCookie(OB_COOKIE, {domain: req.hostname});
    return sessionObject;
}

module.exports.getSession = getSession;

function createSession(impl) {
    if (impl) {
        impl.__proto__ = Session;
    }
    return impl;
}

module.exports.COOKIE_NAME = OB_COOKIE;