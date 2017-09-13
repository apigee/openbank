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
 * ValidateAccReqPerm.js
 * Script is used to validate account request permissions
 */

var validPermissionEnum = ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances", "ReadBeneficiariesBasic", "ReadBeneficiariesDetail", "ReadDirectDebits", "ReadProducts", "ReadStandingOrdersBasic", "ReadStandingOrdersDetail", "ReadTransactionsBasic", "ReadTransactionsCredits", "ReadTransactionsDebits", "ReadTransactionsDetail"];
var content = "";
var permissions = null;
var invalidReq = false;
var errorDescription = "";
if (isProperJson(context.getVariable("request.content"))) {
    content = JSON.parse(context.getVariable("request.content"));
}
else {
    invalidReq = true;
    errorDescription = "Malformed JSON";
}


if (!invalidReq && content && content.Data && content.Data.Permissions) {
    permissions = content.Data.Permissions;
}
else {
    invalidReq = true;
    errorDescription = "Missing Permissions";
}

// check if  permissions array exist and is not empty 
if (!invalidReq && permissions && permissions.length > 0) {
    // check if each permission code is valid
    for (var i = 0; i < permissions.length; i++) {
        if (validPermissionEnum.indexOf(permissions[i]) <= -1) {
            invalidReq = true;
            errorDescription = "Invalid Permission code";
            break;
        }
    }

    if (!invalidReq) {
        // validate for following invalid conditions
        if (((permissions.indexOf("ReadTransactionsBasic") > -1) || (permissions.indexOf("ReadTransactionsDetail") > -1)) && !((permissions.indexOf("ReadTransactionsCredits") > -1) || (permissions.indexOf("ReadTransactionsDebits") > -1))) {
            invalidReq = true;
            errorDescription = "Missing one of ReadTransactionCredits , ReadTransactionDebits Permissions";
        }

        else if (((permissions.indexOf("ReadTransactionsCredits") > -1) || (permissions.indexOf("ReadTransactionsDebits") > -1)) && !((permissions.indexOf("ReadTransactionsBasic") > -1) || (permissions.indexOf("ReadTransactionsDetail") > -1))) {
            invalidReq = true;
            errorDescription = "Missing one of ReadTransactionBasic , ReadTransactionDetail Permissions";

        }
        if (content.Data.ExpirationDateTime && !isNaN(Date.parse(content.Data.ExpirationDateTime)) && Date.parse(content.Data.ExpirationDateTime) < new Date()) {
            invalidReq = true;
            errorDescription = "ExpirationDateTime is Old";

        }
    }
}

else {
    invalidReq = true;
    errorDescription = "Permission array empty/ missing";
}


context.setVariable("isError", invalidReq);
context.setVariable("errorResponseCode", 400);
context.setVariable("errorDescription", errorDescription);


function isProperJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
