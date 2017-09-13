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
 * ValidatePostRequest.js
 * Validate Get request resource with the confid provided
 */
var PostResourceConfig =
    {
        "Headers": [
            {"Authorization": {"Mandatory": true}},
            {"x-fapi-financial-id": {"Mandatory": true}},
            {"x-idempotency-key": {"Mandatory": true}},
            {"x-jws-signature": {"Mandatory": true}},
            {"Content-Type": {"Mandatory": true, "ValueList": ["application/json"]}}

        ],
        "Body": [
            {"Data.Initiation": {"Mandatory": true, "ValueType": "Object"}},
            {"Data.Initiation.EndToEndIdentification": { "MaxText":31}},
            {"Data.Initiation.InstructedAmount": {"Mandatory": true, "ValueType": "Object"}},
            {"Data.Initiation.InstructedAmount.Amount": {"Mandatory": true, "ValueType": "Float", "MaxText":14}},
            {"Data.Initiation.CreditorAccount": {"Mandatory": true, "ValueType": "Object"}},
            {"Data.Initiation.CreditorAccount.Identification": {"Mandatory": true}},
            {"Data.Initiation.CreditorAccount.Name": { "MaxText":18}},
            {"Data.Initiation.CreditorAccount.SecondaryIdentification": { "MaxText":18}},
            {"Data.Initiation.RemittanceInformation": {"ValueType": "Object"}},
            {"Data.Initiation.RemittanceInformation.Reference": { "MaxText":18}},
            {"Risk": {"Mandatory": true, "ValueType": "Object"}}
        ]
    };
    

var error = validateRequest(PostResourceConfig);
if (error.isError) {
    context.setVariable("isError", error.isError);
    context.setVariable("errorResponseCode", error.errorResponseCode);
    context.setVariable("errorDescription", error.errorDescription);
}
else {
    context.setVariable("isError", false);
}