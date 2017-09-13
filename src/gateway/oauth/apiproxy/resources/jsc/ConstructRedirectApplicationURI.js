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

var application_uri;
var state;
var access_token;
var code;
var expires;
var token_type;
var response_type_token;
var response_type_code;
var response_type_id_token;
var id_token;

application_uri = context.getVariable("RedirectUri");
state = context.getVariable("RequestState");
access_token = context.getVariable("apigee.access_token");
code = context.getVariable("oauthv2authcode.Generate-Authorization-Code.code");
expires = context.getVariable("oauthv2accesstoken.Security-Generate-Access-Token-Implicit.expires_in");
token_type = context.getVariable("token_type");
id_token = context.getVariable("id_token");

var ResponseTypeToken = context.getVariable("ResponseTypeToken");
var ResponseTypeCode = context.getVariable("ResponseTypeCode");
var ResponseTypeIdToken = context.getVariable("ResponseTypeIdToken");

// Based on the response_type construct the application response
// if the response_type contains id_token or token then add a "#" else add a "?"
if (ResponseTypeToken == "true" || ResponseTypeIdToken == "true")
    application_uri = application_uri + "#";
else
    application_uri = application_uri + "?";

application_uri = application_uri + "state=" + state;


if (ResponseTypeIdToken == "true") {
    application_uri = application_uri + "&id_token=" + id_token;
}
if (ResponseTypeToken == "true") {
    application_uri = application_uri + "&access_token=" + access_token;
    application_uri = application_uri + "&expires=" + expires;
    application_uri = application_uri + "&token_type=" + token_type;
}

if (ResponseTypeCode == "true") {
    application_uri = application_uri + "&code=" + code;
}

context.setVariable("application_uri", application_uri);
