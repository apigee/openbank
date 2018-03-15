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
 * ValidateRequestJWT.js
 * Validate Request JWT in request
 */


var isValid = true;
var alg = ['RS256']; // algorithm to sign - if unsecured jwt then use 'none'

var jwt = context.getVariable("request.queryparam.request");
var scope = context.getVariable("scope");
var state = context.getVariable("requestState");
var nonce = context.getVariable("nonce");
var clientId = context.getVariable("clientId");
var redirectUri = context.getVariable("redirectUri");
var responseType = context.getVariable("responseType");

var scopesXML = context.getVariable("AccessEntity.Get-API-Product-Scopes.ApiProduct.Scopes"); // scope from API Products
var applicationRedirectionUris = context.getVariable("verifyapikey.Authorize-Client-Application.redirection_uris"); // callback_uri defined in developer application configuration
var applicationName = context.getVariable("verifyapikey.Authorize-Client-Application.app.name");
var applicationDesc = context.getVariable("verifyapikey.Authorize-Client-Application.app.applicationdesc");
var tandcs = context.getVariable("verifyapikey.Authorize-Client-Application.tandcs");
var applicationId = context.getVariable("verifyapikey.Authorize-Client-Application.app.id");
var applicationPublicKey = context.getVariable("verifyapikey.Authorize-Client-Application.publicKey");
var tppId = context.getVariable("verifyapikey.Authorize-Client-Application.tppId");

var key = applicationPublicKey;

//key = rstrtohex(key);
var errorJson = {};
errorJson.isError = true;
errorJson.errorResponseCode = 400;
errorJson.errorDescription = "The request JWT is invalid, unknown, or malformed";
if (!validateScopes(scopesXML, scope)) {
    isValid = false;
    errorJson.errorDescription = "Application doesnt have access to requested scope";
}
var jwsPayload = context.getVariable("jwt.Verify-Request-JWT.payload-json");
var payload = JSON.parse(jwsPayload);
if (payload.redirect_uri != redirectUri || applicationRedirectionUris.indexOf(redirectUri) === -1) {
    isValid = false;
    errorJson.errorDescription = "RedirectUri queryparam doesnt match Request Token";
}
if (state && payload.state != state) {
    isValid = false;
    errorJson.errorDescription = "state queryparam doesnt match Request Token";
}
if (nonce && payload.nonce != nonce) {
    isValid = false;
    errorJson.errorDescription = "nonce queryparam doesnt match Request Token";
}
if (payload.client_id != clientId) {
    isValid = false;
    errorJson.errorDescription = "client_id queryparam doesnt match Request Token";
}
if (payload.response_type != responseType) {
    isValid = false;
    errorJson.errorDescription = "response_type queryparam doesnt match Request Token";
}
if (!validateClaims(payload.claims, scope)) {
    isValid = false;
    errorJson.errorDescription = "The request JWT has invalid claims";
}

if (!isValid) {
    context.setVariable("isError", errorJson.isError);
    context.setVariable("errorResponseCode", errorJson.errorResponseCode);
    context.setVariable("errorDescription", errorJson.errorDescription);
} else {
    context.setVariable("tandcs", tandcs);
    context.setVariable("applicationName", applicationName);
    context.setVariable("applicationId", applicationId);
    context.setVariable("applicationDesc", applicationDesc);
    context.setVariable("tppId", tppId);
}


/**
 *
 * @param {String} scopesXML
 * @param {String} applicationScope
 *
 * @return boolean
 */
function validateScopes(scopesXML, applicationScope) {
    // Convert the scope from application request to Array
    var receivedScopes = applicationScope.split(" ");

    if (scopesXML == null) {
        return false;

    } else {

        // Workaround for e4x
        scopesXML = scopesXML.replace(/^<\?xml\s+version\s*=\s*(["'])[^\1]+\1[^?]*\?>/, "");
        // Create a new xml object from scope xml string
        var Scopes = new XML(scopesXML);

        var lookup = {};
        var scope = Scopes.Scope;
        // Iterate, parse and validate the application scopes against the API Products scopes
        for (var j = 0; j < scope.length(); j++) {
            lookup[scope[j].toString()] = scope[j].toString();
        }

        for (var i in receivedScopes) {
            if (typeof lookup[receivedScopes[i]] != 'undefined') {
            }
            else {
                return false;
            }
        }
        return true;
    }
}


function validateClaims(claims, scope) {

    var intent;
    print(claims);
    if (claims && claims.id_token) {
        if (claims.id_token.openbanking_intent_id) {
            intent = claims.id_token.openbanking_intent_id;
        }
        else if (claims.id_token[0].openbanking_intent_id) {
            intent = claims.id_token[0].openbanking_intent_id;
        }
    }
    var scopeAvailable = false;
    if (intent) {
        var intentId = intent.value;
        var intentURN = intentId.split(":");
        var neededScope = intentURN[3];
        var requestId = intentURN[4];
        var receivedScopes = scope.split(" ");


        for (var i in receivedScopes) {
            if (receivedScopes[i] == neededScope) {
                scopeAvailable = true;
            }
        }
        if (receivedScopes.length == 1 && receivedScopes[0] == "openid") {
            scopeAvailable = true;
        }
        context.setVariable("requestId", requestId);
        context.setVariable("type", neededScope);
    }

    return scopeAvailable;

}