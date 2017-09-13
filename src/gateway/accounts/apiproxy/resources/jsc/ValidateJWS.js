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
 * ValidateJWS.js
 * Validate the request payload with the detached jws signature provided in the header
 */

var xJwsSignature = context.getVariable("jwsSignature");
var appPublicKey = context.getVariable("appPublicKey");
var requestPayload = JSON.parse(context.getVariable("request.content"));
requestPayload = JSON.stringify(requestPayload);

var validAlgorithms = ["RS256"];
var isError = false;
var errorDescription = "";
var jws = new KJUR.jws.JWS();
//split the jws header in 2 parts. header and payload
var jwsParts = xJwsSignature.split("..");

if (jwsParts.length == 2) {
    // base64 decode the JOSE Header
    var jwt = jwsParts[0] + "." + utf8tob64u(requestPayload) + "." + jwsParts[1];
    jws.parseJWS(jwt);
    var isValid = KJUR.jws.JWS.verify(jwt, appPublicKey);
    if (isValid) {
        var parsedHeader = JSON.parse(jws.parsedJWS.headS);
        if ((parsedHeader.b64 !== false)) {
            isError = true;
            errorDescription = "b64 value invalid";
        }
        else if ((!parsedHeader["http://openbanking.org.uk/iat"] ) || Date.parse(parsedHeader["http://openbanking.org.uk/iat"]) > Date.parse(new Date())) {
            isError = true;
            errorDescription = "iat value invalid";

        }
        else if (validAlgorithms.indexOf(parsedHeader.alg) <= -1) {
            isError = true;
            errorDescription = "alg value invalid";
        }
    }
    else {
        isError = true;
        errorDescription = "invalid jws signature";
    }
}
else {
    isError = true;
    errorDescription = "malformed jws signature";
}

if (isError) {
    context.setVariable("isError", isError);
    context.setVariable("errorResponseCode", 400);
    context.setVariable("errorDescription", errorDescription);
}
else {
    context.setVariable("isError", false);
}