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
 * ValdiateAccountRequest.js
 * validate account /payment request status
 */

var requestContent = context.getVariable("requestIdResponse.content");
var type = context.getVariable("type");
requestContent = JSON.parse(requestContent);
var errorJson = {};
errorJson.isError = false;
errorJson.errorResponseCode = 400;
errorJson.errorDescription = "accountRequest/paymentRequest is already authorised";
if ((type !== null && type !== "" && (type == "accounts" || type == "payments" )) && (requestContent && requestContent.Data && !(requestContent.Data.Status == "Pending" || requestContent.Data.Status == "AwaitingAuthorisation"))) {
    errorJson.isError = true;
}
context.setVariable("isError", errorJson.isError);
context.setVariable("errorResponseCode", errorJson.errorResponseCode);
context.setVariable("errorDescription", errorJson.errorDescription);