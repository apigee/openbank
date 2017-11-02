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
 * ConstructRedirectApplicationURI.js
 * Construct response URI based on /authorize response_type parameter
 */

var applicationUri;
var state;
var accessToken;
var code;
var expires;
var tokenType;
var idToken;

applicationUri = context.getVariable("RedirectUri");
state = context.getVariable("RequestState");
accessToken = context.getVariable("apigee.access_token");
code = context.getVariable("oauthv2authcode.Generate-Authorization-Code.code");
expires = context.getVariable("oauthv2accesstoken.Security-Generate-Access-Token-Implicit.expires_in");
tokenType = context.getVariable("token_type");
idToken = context.getVariable("id_token");

var ResponseTypeToken = context.getVariable("ResponseTypeToken");
var ResponseTypeCode = context.getVariable("ResponseTypeCode");
var ResponseTypeIdToken = context.getVariable("ResponseTypeIdToken");

// Based on the response_type construct the application response
// if the response_type contains idToken or token then add a "#" else add a "?"
if (ResponseTypeToken == "true" || ResponseTypeIdToken == "true")
    applicationUri = applicationUri + "#";
else
    applicationUri = applicationUri + "?";

applicationUri = applicationUri + "state=" + state;


if (ResponseTypeIdToken == "true") {
    applicationUri = applicationUri + "&id_token=" + idToken;
}
if (ResponseTypeToken == "true") {
    applicationUri = applicationUri + "&access_token=" + accessToken;
    applicationUri = applicationUri + "&expires=" + expires;
    applicationUri = applicationUri + "&token_type=" + tokenType;
}

if (ResponseTypeCode == "true") {
    applicationUri = applicationUri + "&code=" + code;
}

context.setVariable("application_uri", applicationUri);
