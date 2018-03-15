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
var requestPayload = context.getVariable("request.content");
//requestPayload = JSON.stringify(requestPayload);

context.setVariable("java-jws.payload",requestPayload);
context.setVariable("java-jws.signatureType","DETACHED");
context.setVariable("java-jws.key",appPublicKey);
context.setVariable("java-jws.jwt",xJwsSignature);
var isError = false;
var errorDescription = "";
//split the jws header in 2 parts. header and payload
var jwsParts = xJwsSignature.split("..");

/*if (jwsParts.length == 2) {
    // base64 decode the JOSE Header
    var jwt = jwsParts[0] + "." + utf8tob64u(requestPayload) + "." + jwsParts[1];
    context.setVariable("java-jws.jwt",jwt);
}
else {
    isError = true;
    errorDescription = "malformed jws signature";
}*/

if (isError) {
    context.setVariable("isJWSError", isError);
    context.setVariable("errorResponseCode", 400);
    context.setVariable("jwsError", errorDescription);
}
else {
    context.setVariable("isError", false);
    context.setVariable("isJWSError", false);
}