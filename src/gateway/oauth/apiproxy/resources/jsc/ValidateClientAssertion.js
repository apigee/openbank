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
 * ValidateClientAssertion.js
 * Validate Client Assertion JWS
 */

//var jws = new KJUR.jws.JWS();

var isValid = false;
var alg = ['RS256']; // algorithm to sign - if unsecured jwt then use 'none'

var clientId = context.getVariable("clientId");
var jwt = context.getVariable("jwt");



var errorJson = {};
errorJson.isError = true;
errorJson.errorResponseCode = 400;
errorJson.errorDescription = "The request JWT is invalid, unknown, or malformed";

var clientSecret = context.getVariable("verifyapikey.Authorize-Client-Application.client_secret");
context.setVariable("clientIdSecret", Base64.encode(clientId + ":" + clientSecret));

