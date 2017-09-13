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
 * CreateJWS.js
 * Script is used to create detached JWS value
 */
var responsePayload = JSON.parse(context.getVariable("response.content"));
responsePayload = JSON.stringify(responsePayload);
var privateKey = context.getVariable("private.privateKey");
var joseHeader =
    {
        "alg": "RS256",
        "kid": "90210ABAD",
        "b64": false,
        "http://openbanking.org.uk/iat": "2017-06-12T20:05:50+00:00",
        "http://openbanking.org.uk/iss": "C=UK, ST=England, L=London, O=Acme Ltd.",
        "crit": ["b64", "http://openbanking.org.uk/iat", "http://openbanking.org.uk/iss"]

    };

var jwt = KJUR.jws.JWS.sign(joseHeader.alg, joseHeader, responsePayload, privateKey);
detachedJWT = jwt.split(".");
var detachedJws = detachedJWT[0] + ".." + detachedJWT[2];
context.setVariable("detachedJws", detachedJws);