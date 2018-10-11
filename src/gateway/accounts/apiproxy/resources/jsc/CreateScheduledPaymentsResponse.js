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
 * CreateScheduledPaymentsResponse.js
 * Script is used to form client response based on the permissions and scope in account request
 */
var responseStatus = context.getVariable("response.status.code");

if (responseStatus == 200) {
    var response = JSON.parse(context.getVariable("response.content"));
    assignResponse(response);
}


function assignResponse(response) {
    var readDetailData = context.getVariable('readDetailData');
  
    var responsearray = [];
    var newResponseArray = [];
    var entity = {};
    var i = 0;
    if (response.Data) {
        responsearray = response.Data.ScheduledPayment;
        newResponseArray = [];
        for (i = 0; i < responsearray.length; i++) {
            entity = {};

            entity.AccountId = responsearray[i].AccountId;

            entity.ScheduledPaymentId = responsearray[i].ScheduledPaymentId;
            entity.ScheduledPaymentDateTime = responsearray[i].ScheduledPaymentDateTime;
            entity.ScheduledType = responsearray[i].ScheduledType;
            entity.InstructedAmount = responsearray[i].InstructedAmount;
            if (readDetailData) {

                if (responsearray[i].CreditorAgent) {
                    entity.CreditorAgent = responsearray[i].CreditorAgent
                }
                if (responsearray[i].CreditorAccount) {
                    entity.CreditorAccount = responsearray[i].CreditorAccount;
                }
            }
            if (responsearray[i].Reference) {
                entity.Reference = responsearray[i].Reference
            }
            
            newResponseArray.push(entity);
        }

        response.Data.ScheduledPayment = newResponseArray;
        context.setVariable("response.content", JSON.stringify(response));

    }
}