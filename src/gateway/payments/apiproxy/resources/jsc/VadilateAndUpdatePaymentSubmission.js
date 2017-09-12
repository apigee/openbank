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
            paymentConsent = JSON.parse(paymentConsent);
            if(paymentRequest.Data.Status == "Authorised"){
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

