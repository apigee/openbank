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
        responsearray = response.Data.Account;
        newResponseArray = [];
        for (i = 0; i < responsearray.length; i++) {
            entity = {};

            entity.AccountId = responsearray[i].AccountId;
            entity.Currency = responsearray[i].Currency;
            entity.Nickname = responsearray[i].Nickname;


            if (readDetailData) {
                entity.Account = responsearray[i].Account;
                entity.Servicer = responsearray[i].Servicer;
            }

            newResponseArray.push(entity);
        }

        response.Data.Account = newResponseArray;
        context.setVariable("response.content", JSON.stringify(response));

    }

}

 
            