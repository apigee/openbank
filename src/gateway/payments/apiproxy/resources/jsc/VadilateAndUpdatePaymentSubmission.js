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
 * VadilateAndUpdatePaymentSubmission.js
 * Validate payment request and update payment submission payload with debitors account details
 */
var paymentRequest = context.getVariable("paymentsRequestResponse.content");
var paymentConsent = context.getVariable("consentResponse.content");

var paymentRequestStatusCode = context.getVariable("paymentsRequestResponse.status.code");
var paymentConsentStatusCode = context.getVariable("consentResponse.status.code");

var isError = false;
var errorCode = 400;
var errorDescription = "";

if(paymentRequestStatusCode == 200 &&  paymentRequest){
    paymentRequest = JSON.parse(paymentRequest);
    if(paymentRequest.Data.Status == "AcceptedTechnicalValidation"){
        if(paymentConsentStatusCode == 200 && paymentConsent){
            paymentConsent = JSON.parse(paymentConsent)[0];
            if(paymentConsent.Status == "Authorised"){
                //get debitor accounts.. append it to the body!
                var requestBody = JSON.parse(context.getVariable("request.content"));
                requestBody.Data.Initiation.DebtorAccount = paymentConsent.SelectedAccounts[0];
                context.setVariable('request.content', JSON.stringify(requestBody));
            }
            else{
                isError = true;
                errorCode = 403;
                errorDescription = "Payment Consent status is not Authorised";
            }
        }
        else{
            isError = true;
            errorDescription = "Invalid Payment Consent";
        }
    }
    else{
        isError = true;
        errorCode = 403;
        errorDescription = "Payment Request status is not Authorised";
    }
    
}
else{
    isError = true;
    errorDescription = "Invalid Payment Request Id";
}

