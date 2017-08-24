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
        responsearray = response.Data.Transaction;
        newResponseArray = [];
        for (i = 0; i < responsearray.length; i++) {
            if ((responsearray[i].CreditDebitIndicator == "Credit" && readCredits == true) || (responsearray[i].CreditDebitIndicator == "Debit" && readDebits == true)) {
                entity = {};
                entity.AccountId = responsearray[i].AccountId;
                entity.TransactionReference = responsearray[i].TransactionReference;
                entity.TransactionId = responsearray[i].TransactionId;
                entity.Amount = responsearray[i].Amount;
                entity.Status = responsearray[i].Status;
                entity.CreditDebitIndicator = responsearray[i].CreditDebitIndicator;
                entity.AddressLine = responsearray[i].AddressLine;
                entity.BookingDateTime = responsearray[i].BookingDateTime;
                entity.ValueDateTime = responsearray[i].ValueDateTime;
                entity.BankTransactionCode = responsearray[i].BankTransactionCode;
                entity.ProprietaryBankTransactionCode = responsearray[i].ProprietaryBankTransactionCode;

                if (readDetailData) {
                    entity.TransactionInformation = responsearray[i].TransactionInformation;
                    entity.Balance = responsearray[i].Balance;
                    entity.MerchantDetails = responsearray[i].MerchantDetails;
                }

                newResponseArray.push(entity);
            }
        }

        response.Data.Transaction = newResponseArray;
        context.setVariable("response.content", JSON.stringify(response));
    }

}

 
            