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
 * GetAccReqData.js
 * Script is used to validate account request status and permission
 */
var accReqResponse = context.getVariable("accReqResponse.content");
var proxyPathSuffix = context.getVariable('proxy.pathsuffix');

var statusCode = context.getVariable("accReqResponse.status.code");

var isError = false;
var errorCode = 400;
var errorDescription = "";
var accPermissions, accStatus;

if (statusCode == 200 && accReqResponse && JSON.parse(accReqResponse).Data) {
    accReqResponse = JSON.parse(accReqResponse);
    accPermissions = accReqResponse.Data.Permissions;
    accStatus = accReqResponse.Data.Status;
}

else {
    isError = true;
    errorCode = statusCode;
    errorDescription = "Invalid Account Request Id";
}


if (!isError) {

    if (accStatus == "Authorised") {
        var validPermissions = hasValidPermissions();
        if (!validPermissions) {
            isError = true;
            errorCode = 403;
            errorDescription = "Invalid Permissions";
        }

    }

    else {
        isError = true;
        errorCode = 403;
        errorDescription = "Account Request status is not Authorised";

    }
}

if (isError) {
    context.setVariable("isError", true);
    context.setVariable("errorResponseCode", errorCode);
    context.setVariable("errorDescription", errorDescription);
}


function hasValidPermissions() {
    context.setVariable("readDetailData", false);

    //balances
    //var validPermissions = false;
    if (proxyPathSuffix.indexOf("balances") >= 0) {

        return getDataReadPermission(accPermissions, "ReadBalances", null);
    }

    //transactios
    else if (proxyPathSuffix.indexOf("transactions") >= 0) {
        if (accPermissions.indexOf("ReadTransactionsCredits") > -1)
            context.setVariable("readCredits", true);

        if (accPermissions.indexOf("ReadTransactionsDebits") > -1)
            context.setVariable("readDebits", true);

        return getDataReadPermission(accPermissions, "ReadTransactionsBasic", "ReadTransactionsDetail");

    }


    //beneficiaries
    else if (proxyPathSuffix.indexOf("beneficiaries") >= 0) {
        return getDataReadPermission(accPermissions, "ReadBeneficiariesBasic", "ReadBeneficiariesDetail");
    }


    // standing-orders
    else if (proxyPathSuffix.indexOf("standing-orders") >= 0) {
        return getDataReadPermission(accPermissions, "ReadStandingOrdersBasic", "ReadStandingOrdersDetail");
    }

    // direct debits
    else if (proxyPathSuffix.indexOf("direct-debits") >= 0) {
        return getDataReadPermission(accPermissions, "ReadDirectDebits", null);
    }

    // products
    else if (proxyPathSuffix.indexOf("product") >= 0) {
        return getDataReadPermission(accPermissions, "ReadProducts", null);
    }

    // accounts info
    else if (proxyPathSuffix.indexOf("accounts") >= 0) {
        return getDataReadPermission(accPermissions, "ReadAccountsBasic", "ReadAccountsDetail");
    }

    return false;

}


function getDataReadPermission(accPermissions, basicPermission, detailPermission) {
    if (accPermissions.indexOf(basicPermission) > -1 || (detailPermission !== null && (accPermissions.indexOf(detailPermission) > -1) )) {
        //validPermissions = true;
        if (detailPermission !== null) {
            if (accPermissions.indexOf(detailPermission) > -1) {
                context.setVariable("readDetailData", true);
            }

        }
        return true;
    }
    return false;

}
 