//This script is used to form client response based on the permissions and scope in account request

var responseStatus = context.getVariable("response.status.code");

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
        responsearray = response.Data.StandingOrder;
        newResponseArray = [];
        for (i = 0; i < responsearray.length; i++) {
            entity = {};


            entity.AccountId = responsearray[i].AccountId;
            entity.StandingOrderId = responsearray[i].StandingOrderId;
            entity.Frequency = responsearray[i].Frequency;
            entity.Reference = responsearray[i].Reference;
            entity.FirstPaymentDateTime = responsearray[i].FirstPaymentDateTime;
            entity.FirstPaymentAmount = responsearray[i].FirstPaymentAmount;
            entity.NextPaymentDateTime = responsearray[i].NextPaymentDateTime;
            entity.NextPaymentAmount = responsearray[i].NextPaymentAmount;
            entity.FinalPaymentDateTime = responsearray[i].FinalPaymentDateTime;
            entity.FinalPaymentAmount = responsearray[i].FinalPaymentAmount;

            if (readDetailData) {
                entity.Servicer = responsearray[i].Servicer;
                entity.CreditorAccount = responsearray[i].CreditorAccount;
            }

            newResponseArray.push(entity);
        }

        response.Data.StandingOrder = newResponseArray;
        context.setVariable("response.content", JSON.stringify(response));
    }

}
            