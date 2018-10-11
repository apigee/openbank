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
 * CreateOffersResponse.js
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
        responsearray = response.Data.Offers;
        newResponseArray = [];
        for (i = 0; i < responsearray.length; i++) {
            entity = {};

            entity.AccountId = responsearray[i].AccountId;
            entity.OfferId = responsearray[i].OfferId;
            entity.OfferType = responsearray[i].OfferType;
            if (responsearray[i].Description) {
                entity.Description = responsearray[i].Description;
            }

            if (responsearray[i].StartDateTime) {
                entity.StartDateTime = responsearray[i].StartDateTime;
            }

            if (responsearray[i].EndDateTime) {
                entity.EndDateTime = responsearray[i].EndDateTime;
            }
            
            if (responsearray[i].Rate) {
                entity.Rate = responsearray[i].Rate;
            }
            
            if (responsearray[i].Value) {
                entity.Value = responsearray[i].Value;
            }
            
            if (responsearray[i].Term) {
                entity.Term = responsearray[i].Term;
            }
            
            if (responsearray[i].URL) {
                entity.URL = responsearray[i].URL;
            }
            
            if (responsearray[i].Amount) {
                entity.Amount = responsearray[i].Amount;
            }
            
            if (responsearray[i].Fee) {
                entity.Fee = responsearray[i].Fee;
            }

            newResponseArray.push(entity);
        }

        response.Data.Offers = newResponseArray;
        context.setVariable("response.content", JSON.stringify(response));

    }
}