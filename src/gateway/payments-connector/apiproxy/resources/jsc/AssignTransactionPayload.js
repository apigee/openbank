var request = JSON.parse(context.getVariable("request.content"));

// Get current date for transaction
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = yyyy+'/'+mm+'/'+dd;


var transactionPayload  = {};

transactionPayload.AccountId = request.DebtorAccount.Identification;

transactionPayload.Status = "Booked";

transactionPayload.BankTransactionCode = {};
transactionPayload.BankTransactionCode.Code = "BANK123";

transactionPayload.CreditDebitIndicator = "Debit";

transactionPayload.Amount = {};
transactionPayload.Amount.Amount = request.InstructedAmount.Amount;
transactionPayload.Amount.Currency = request.InstructedAmount.Currency;

transactionPayload.BookingDate = {};
transactionPayload.BookingDate.Date = today;
transactionPayload.BookingDate.DateTime = new Date().toLocaleString();

transactionPayload.MerchantDetails = {};
transactionPayload.MerchantDetails.MerchantCategoryCode = request.MerchantCategoryCode;

transactionPayload.AccountId = request.DebtorAccount.Identification;
transactionPayload.AccountId = request.DebtorAccount.Identification;


context.setVariable("transactionPayload",JSON.stringify(transactionPayload));


