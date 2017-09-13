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
 * ExtractBodyJWT.js
 * Extract payload from JWT and extract clientID from payload
 */
var sJWT = context.getVariable("request.formparam.client_assertion");
context.setVariable("jwt", sJWT);
var errorJson = {};
errorJson.isError = true;
errorJson.errorResponseCode = 401;
errorJson.errorDescription = "The request JWT is invalid, unknown, or malformed";
var payloadObj;
if (isProperPayload()) {
    context.setVariable("clientId", payloadObj.iss);
} else {
    context.setVariable("isError", errorJson.isError);
    context.setVariable("errorResponseCode", errorJson.errorResponseCode);
    context.setVariable("errorDescription", errorJson.errorDescription);
    //throw 'request JWT is invalid, unknown, or malformed'
}


function isProperPayload() {
    try {
        payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(sJWT.split(".")[1]));
    } catch (e) {
        return false;
    }
    return true;
}