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
 * ValidateRequest.js
 * Validate request resource
 */

var config =
    {

        "QueryParams": [
            {"response_type": {"Mandatory": true}},
            {"client_id": {"Mandatory": true}},
            {"state": {"Mandatory": true}},
            {
                "scope": {
                    "Mandatory": true,
                    "ValueList": ["openid", "openid accounts", "openid payments", "openid accounts payments", "openid payments accounts"]
                }
            },
            {"nonce": {"Mandatory": true}},
            {"redirect_uri": {"Mandatory": true}},
            {"request": {"Mandatory": true}}
        ]
    };

var error = validateRequest(config);
if (!error.isError) {
    var responseType = context.getVariable("request.queryparam.response_type");
    if (!parseResponseType(responseType)) {
        var errorJson = {};
        errorJson.isError = true;
        errorJson.errorResponseCode = 400;
        errorJson.errorDescription = "responseType query parameter type is invalid";
    }

}
if (!error.isError) {
    context.setVariable("isError", false);

    context.setVariable("responseType", context.getVariable("request.queryparam.response_type"));
    context.setVariable("clientId", context.getVariable("request.queryparam.client_id"));
    context.setVariable("requestState", context.getVariable("request.queryparam.state"));
    context.setVariable("scope", context.getVariable("request.queryparam.scope"));
    context.setVariable("nonce", context.getVariable("request.queryparam.nonce"));
    context.setVariable("redirectUri", context.getVariable("request.queryparam.redirect_uri"));
    //context.setVariable("request", context.getVariable("request.queryparam.request"));
}
else {
    //set 401 if clientID is not present
    var clientId = context.getVariable("request.queryparam.client_id");
    if ((clientId === null || clientId === "")) {
        error.errorResponseCode = 401;
    }
    context.setVariable("isError", error.isError);
    context.setVariable("errorResponseCode", error.errorResponseCode);
    context.setVariable("errorDescription", error.errorDescription);

}


/**
 * Parse response_type. OpenId connect can support multiple response_type
 * for more information - http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html
 * for e.g. a combination of code, token and id_token.
 * This will be used to conditionally execute GenerateIDToken, AuthorizationCode & AccessToken policies
 * @param {String} responseType - Space separated string e.g."code id_token token"
 *
 * @return void
 */
function parseResponseType(responseType) {
    var responseTypes = responseType.split(" ");
    var responseTypeCode = false;
    var responseTypeToken = false;
    var responseTypeIdToken = false;
    var bStatus = false;

    for (var j = 0; j < responseTypes.length; j++) {
        if (responseTypes[j] == "code") {
            responseTypeCode = true;
            bStatus = true;
        }
        else if (responseTypes[j] == "token") {
            responseTypeToken = true;
            bStatus = true;
        }
        else if (responseTypes[j] == "id_token") {
            responseTypeIdToken = true;
            bStatus = true;
        }
    }
    // code token flow is rejected
    if(responseTypeToken && responseTypeCode){
        bStatus = false;
    }
    context.setVariable("responseTypeToken", responseTypeToken);
    context.setVariable("responseTypeCode", responseTypeCode);
    context.setVariable("responseTypeIdToken", responseTypeIdToken);
    return bStatus;
}
