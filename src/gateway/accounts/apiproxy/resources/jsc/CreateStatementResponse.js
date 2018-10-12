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
 * CreateStatementResponse.js
 * Script is used to form client response based on the permissions and scope in account request
 */

var responseStatus = context.getVariable("response.status.code");

if (responseStatus == 200) {
    var response = JSON.parse(context.getVariable("response.content"));
    assignResponse(response);
}


function assignResponse(response) {
    var readCredits = context.getVariable('readCredits');
    var readDebits = context.getVariable('readDebits');

    var responsearray = [];
    var newResponseArray = [];
    var entity = {};
    var i = 0;
    if (response.Data) {
        responsearray = response.Data.Statement;
        newResponseArray = [];
        for (i = 0; i < responsearray.length; i++) {

            entity = {};
            entity.AccountId = responsearray[i].AccountId;
            entity.StatementId = responsearray[i].StatementId;
            entity.StatementReference = responsearray[i].StatementReference;
            entity.Type = responsearray[i].Type;
            entity.StartDateTime = responsearray[i].StartDateTime;
            entity.EndDateTime = responsearray[i].EndDateTime;
            entity.CreationDateTime = responsearray[i].CreationDateTime;

            if (responsearray[i].StatementDescription) {
                entity.StatementDescription = responsearray[i].StatementDescription;
            }
                            
            if (responsearray[i].StatementBenefit) {
                entity.StatementBenefit = responsearray[i].StatementBenefit;
            }

            var statementFee = filterPermittedRecords(readCredits,readDebits,responsearray[i].StatementFee);

            if (statementFee) {
                entity.StatementFee = statementFee;
            }
            
            var statementInterest = filterPermittedRecords(readCredits,readDebits,responsearray[i].StatementInterest);

            if (statementInterest) {
                entity.StatementInterest = statementInterest;
            }
            
            var statementAmount = filterPermittedRecords(readCredits,readDebits,responsearray[i].StatementAmount);

            if (statementAmount) {
                entity.StatementAmount = statementAmount;
            }
            
            if (responsearray[i].StatementDateTime) {
                entity.StatementDateTime = responsearray[i].StatementDateTime;
            }
            if (responsearray[i].StatementRate) {
                entity.StatementRate = responsearray[i].StatementRate;
            }
            if (responsearray[i].StatementValue) {
                entity.StatementValue = responsearray[i].StatementValue;
            }
            
            newResponseArray.push(entity);
        }

        response.Data.Statement = newResponseArray;
        context.setVariable("response.content", JSON.stringify(response));
    }

}

function filterPermittedRecords(viewCredits, viewDebits, statements) {
    if (!statements) return null;

    var fileteredStatements = [];
    for (var i=0; i<statements.length; i++) {
        if ((statements[i].CreditDebitIndicator == "Credit" && viewCredits === true) || 
            (statements[i].CreditDebitIndicator == "Debit" && viewDebits === true)) {
                filteredStatements.push(statements[i]);
        }
    }
    return filteredStatements;

}

 
            