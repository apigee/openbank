/*
 Copyright 2018 Google Inc.

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
 * JWTError.js
 * Script is used to create open bank specific error messages for JWTPolicy error
 */


var faultName = context.getVariable("fault.name");

var obieCode = "";
var errorResponseCode = "400";
var errorMessage = "";

if (faultName === "InvalidClaim" || faultName === "ClaimTypeMismatch" || faultName === "JwtIssuerMismatch" 
        || faultName === "JwtSubjectMismatch" || faultName === "JwtAudienceMismatch"  || faultName === "AlgorithmMismatch"){
    obieCode = "UK.OBIE.Signature.InvalidClaim";
    errorMessage = faultName;
} else if (faultName === "JwtClaimNotPresent" || faultName === "KeyIdMissing") {    
    obieCode = "UK.OBIE.Signature.MissingClaim";
    errorMessage = faultName;
} else if (faultName === "FailedToDecode" || faultName === "InvalidJwt" || faultName === "KeyParsingFailed") {
    obieCode = "UK.OBIE.Signature.Malformed";
    errorMessage = faultName;
}  else {
    obieCode = "UK.OBIE.Signature.Unexpected";
    errorMessage = faultName;
}   

context.setVariable("isError","true");
context.setVariable("obieCode",obieCode);
context.setVariable("errorMessage",errorMessage);
context.setVariable("errorCode",errorResponseCode);