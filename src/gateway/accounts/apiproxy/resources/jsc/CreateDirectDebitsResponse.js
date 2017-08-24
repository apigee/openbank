//This script is used to form client response based on the permissions and scope in account request

var responseStatus = context.getVariable("response.status.code");


// Form balance data
if (responseStatus == 200) {
    var response = JSON.parse(context.getVariable("response.content"));
    assignResponse(response);
}


function assignResponse(response) {
    var proxyPathSuffix = context.getVariable('proxy.pathsuffix');
    var readDetailData = context.getVariable('readDetailData');
    var readCredits = context.getVariable('readCredits');
    var readDebits = context.getVariable('readDebits');

    var responsearray = [];
    var newResponseArray = [];
    var entity = {};
    var i = 0;
    if (response.Data) {
        responsearray = response.Data.DirectDebit;
        newResponseArray = [];
        for (i = 0; i < responsearray.length; i++) {
            entity = {};

            entity.AccountId = responsearray[i].AccountId;
            entity.DirectDebitId = responsearray[i].DirectDebitId;
            entity.MandateIdentification = responsearray[i].MandateIdentification;
            entity.DirectDebitStatusCode = responsearray[i].DirectDebitStatusCode;
            entity.Name = responsearray[i].Name;
            entity.PreviousPaymentDateTime = responsearray[i].PreviousPaymentDateTime;
            entity.PreviousPaymentAmount = responsearray[i].PreviousPaymentAmount;

            if (readDetailData) {

            }

            newResponseArray.push(entity);
        }

        response.Data.DirectDebit = newResponseArray;
        context.setVariable("response.content", JSON.stringify(response));
    }
}

 
            