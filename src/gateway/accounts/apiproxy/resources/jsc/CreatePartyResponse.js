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
 * CreatePartyResponse.js
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
        responsearray = response.Data.Party;
        newResponseArray = [];
        for (i = 0; i < responsearray.length; i++) {
            entity = {};

            entity.PartyId = responsearray[i].PartyId;
            if (responsearray[i].PartyNumber) {
                entity.PartyNumber = responsearray[i].PartyNumber;
            }

            if (responsearray[i].PartyType) {
                entity.PartyType = responsearray[i].PartyType;
            }

            if (responsearray[i].PartyName) {
                entity.Name = responsearray[i].PartyName;
            }
            
            if (responsearray[i].EmailAddress) {
                entity.EmailAddress = responsearray[i].EmailAddress;
            }
            
            if (responsearray[i].Phone) {
                entity.Phone = responsearray[i].Phone;
            }
            
            if (responsearray[i].Mobile) {
                entity.Mobile = responsearray[i].Mobile;
            }
            
            if (responsearray[i].Address) {
                entity.Address = responsearray[i].Address;
            }

            newResponseArray.push(entity);
        }

        response.Data.Party = newResponseArray;
        context.setVariable("response.content", JSON.stringify(response));

    }
}