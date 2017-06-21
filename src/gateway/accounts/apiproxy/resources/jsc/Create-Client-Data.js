//This script is used to form client response based on the permissions and scope in account request
var response = JSON.parse(context.getVariable("response.content"));

var clientResponse = {};

var proxyPathSuffix = context.getVariable('proxy.pathsuffix');
var ReadsensitiveData = context.getVariable('ReadsensitiveData');

// Form balance data
if(proxyPathSuffix.indexOf("balance") >=0)
 {
     var responsearray = response["Balances"];
     var newResponseArray = [];
     for (var i = 0; i < responsearray.length; i++) {
                var entity = {};

                
                entity.AccountId = responsearray[i].AccountId;
                entity.Amount = responsearray[i].Amount;
                entity.CreditDebitIndicator = responsearray[i].CreditDebitIndicator;
                entity.Type = responsearray[i].Type;
                entity.Date = responsearray[i].Date;
                entity.CreditLine = responsearray[i].CreditLine;
                
                if(ReadsensitiveData)
                {
                
                }

                newResponseArray.push(entity);
            }
     
     clientResponse["Balances"] = newResponseArray;
 }
 
 
 // form transactions data
 else if(proxyPathSuffix.indexOf("transactions") >=0)
 {
     var responsearray = response["Transactions"];
     var newResponseArray = [];
     for (var i = 0; i < responsearray.length; i++) {
                var entity = {};
                
                entity.AccountId = responsearray[i].AccountId;
                entity.TransactionReference = responsearray[i].TransactionReference;
                entity.TransactionId = responsearray[i].TransactionId;
                entity.Status = responsearray[i].Status;
                entity.AddressLine = responsearray[i].AddressLine;
                entity.BookingDate = responsearray[i].BookingDate;
                entity.ValueDate = responsearray[i].ValueDate;
                entity.BankTransactionCode = responsearray[i].BankTransactionCode;
                entity.ProprietaryBankTransactionCode = responsearray[i].ProprietaryBankTransactionCode;
                
                if(ReadsensitiveData)
                {
                    entity.TransactionInformation = responsearray[i].TransactionInformation;
                    entity.Balance = responsearray[i].Balance;
                    entity.Amount = responsearray[i].Amount;
                    entity.CreditDebitIndicator = responsearray[i].CreditDebitIndicator;
                    entity.MerchantDetails = responsearray[i].MerchantDetails;
                    entity.Type = responsearray[i].Type;
                    entity.Name = responsearray[i].Name;
                    entity.MerchantCategoryCode = responsearray[i].MerchantCategoryCode;
                    entity.Currency = responsearray[i].Currency;
                }

                newResponseArray.push(entity);
            }
     
     clientResponse["Transactions"] = newResponseArray;
 }
 
 
 
 // Form beneficiaries Data
 else if(proxyPathSuffix.indexOf("beneficiaries") >=0)
 {
     var responsearray = response["Beneficiaries"];
     var newResponseArray = [];
     for (var i = 0; i < responsearray.length; i++) {
                var entity = {};

                entity.AccountId = responsearray[i].AccountId;
                entity.BeneficiaryId = responsearray[i].uuid;
                entity.CreditorReferenceInformation = responsearray[i].CreditorReferenceInformation;
                
                if(ReadsensitiveData)
                {
                    entity.Servicer = responsearray[i].Servicer;
                    entity.CreditorAccount = responsearray[i].CreditorAccount;
                }

                newResponseArray.push(entity);
            }
     
     clientResponse["Beneficiaries"] = newResponseArray;
 }
 
 
 // Form Direct Debits Data
 else if(proxyPathSuffix.indexOf("direct-debits") >=0)
 {
     var responsearray = response["DirectDebits"];
     var newResponseArray = [];
     for (var i = 0; i < responsearray.length; i++) {
                var entity = {};
                
                entity.AccountId = responsearray[i].AccountId;
                entity.DirectDebitId = responsearray[i].DirectDebitId;
                entity.MandateIdentification = responsearray[i].MandateIdentification;
                entity.DirectDebitStatusCode = responsearray[i].DirectDebitStatusCode;
                entity.Currency = responsearray[i].Currency;
                entity.Name = responsearray[i].Name;
                entity.PreviousPaymentDate = responsearray[i].PreviousPaymentDate;
                entity.PreviousPaymentAmount = responsearray[i].PreviousPaymentAmount;
                
                if(ReadsensitiveData)
                {
                
                }

                newResponseArray.push(entity);
            }
     
     clientResponse["DirectDebits"] = newResponseArray;
 }
 
 // form standing orders Data
 else if(proxyPathSuffix.indexOf("standing-orders") >=0)
 {
     var responsearray = response["StandingOrders"];
     var newResponseArray = [];
     for (var i = 0; i < responsearray.length; i++) {
                var entity = {};

                
                entity.AccountId = responsearray[i].AccountId;
                entity.StandingOrderId = responsearray[i].StandingOrderId;
                entity.Currency = responsearray[i].Currency;
                entity.Frequency = responsearray[i].Frequency;
                entity.CreditorReferenceInformation = responsearray[i].CreditorReferenceInformation;
                entity.FirstPaymentDate = responsearray[i].FirstPaymentDate;
                entity.FirstPaymentAmount = responsearray[i].FirstPaymentAmount;
                entity.NextPaymentDate = responsearray[i].NextPaymentDate;
                entity.NextPaymentAmount = responsearray[i].NextPaymentAmount;
                entity.FinalPaymentDate = responsearray[i].FinalPaymentDate;
                entity.FinalPaymentAmount = responsearray[i].FinalPaymentAmount;
                
                if(ReadsensitiveData)
                {
                entity.Servicer = responsearray[i].Servicer;
                entity.CreditorAccount = responsearray[i].CreditorAccount;
                }

                newResponseArray.push(entity);
            }
     
     clientResponse["StandingOrders"] = newResponseArray;
 }
 
 // form account info Data
 else
 {
     var responsearray = response["Accounts"];
     var newResponseArray = [];
     for (var i = 0; i < responsearray.length; i++) {
                var entity = {};
                
                entity.AccountId = responsearray[i].AccountId;
                entity.Currency = responsearray[i].Currency;
                entity.Nickname = responsearray[i].Nickname;
                
                
                if(ReadsensitiveData)
                {
                entity.Account = responsearray[i].Account;
                entity.Servicer = responsearray[i].Servicer;
                }

                newResponseArray.push(entity);
            }
     
     clientResponse["Accounts"] = newResponseArray;
 }
 
 
 context.setVariable("response.content",JSON.stringify(clientResponse));
 
            