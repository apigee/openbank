var consentResponse = context.getVariable("consentResponse.content");
var fapiCustomerIpAddr = context.getVariable("fapiCustomerIpAddr");
var proxyPathSuffix = context.getVariable('proxy.pathsuffix');

var isError = false;
var errorCode = 400;
var errorDescription = "";
var statusCode = context.getVariable("consentResponse.status.code");

if (consentResponse && statusCode == 200 && JSON.parse(consentResponse)[0]) {
    consentResponse = JSON.parse(consentResponse)[0];
    context.setVariable("consentId", consentResponse.uuid);
    var count = consentResponse.NoOfAccessWithoutUsersPresence;
    if (fapiCustomerIpAddr === null) {
        if (count < 4) {
            var updateAccessCountPayload = JSON.stringify({"NoOfAccessWithoutUsersPresence": count + 1});
            context.setVariable("updateAccessCountPayload", updateAccessCountPayload);
        }
        else {
            isError = true;
            errorCode = 403;
            errorDescription = "Exceed Access Token Use";
        }
    }
    else {
        var updateAccessCountPayload = JSON.stringify({"NoOfAccessWithoutUsersPresence": 0});
        context.setVariable("updateAccessCountPayload", updateAccessCountPayload);

    }

    if (!isError) {
        var accountIsValid = false;
        var accountsList = [];
        var selectedacc = consentResponse.SelectedAccounts;
        for (var i = 0; i < selectedacc.length; i++) {
            accountsList.push(selectedacc[i].Account.Identification);
        }

        var accountId = context.getVariable("accountId");
        if (accountId) {
            if (accountsList.indexOf(accountId) >= 0) {
                accountIsValid = true;
            }

        }
        else {
            accountIsValid = true;
        }

        context.setVariable("accountIsValid", accountIsValid);

        if (!accountIsValid) {
            isError = true;
            errorCode = 400;
            errorDescription = "Accout Id invalid";
        }
        else {
            context.setVariable("validAccountsList", JSON.stringify(accountsList));
        }

    }
}
else {
    isError = true;
    errorCode = statusCode;
    errorDescription = "No consent found for the account request id provided";
}

if (isError) {
    context.setVariable("isError", true);
    context.setVariable("errorResponseCode", errorCode);
    context.setVariable("errorDescription", errorDescription);
}


 