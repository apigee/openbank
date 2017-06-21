var consentResponse = context.getVariable("consentResponse.content");
var proxyPathSuffix = context.getVariable('proxy.pathsuffix');
var pathlist = ['balance','transactions','beneficiaries','standing-orders','direct-debits','accounts-requests'];
consentResponse = JSON.parse(consentResponse);

var accountsList = [];

var selectedacc = consentResponse.SelectedAccounts;
    for(var i=0; i< selectedacc.length;i++ )
        {
            accountsList.push(selectedacc[i].Account.Identification);
        }

 var accPermissions = consentResponse.Permissions;
 var accStatus = consentResponse.status;
 
 context.setVariable("reqStatus",accStatus);
 
 //accountsList = JSON.stringify(accountsList);
 //accountsList = btoa(accountsList);
 context.setVariable("accountsList",JSON.stringify(accountsList));
 context.setVariable("accPermissions",accPermissions);
 
 // check if valid acount number passed
 var suffix = proxyPathSuffix.split("/");
 var account_number = context.getVariable("account_number");
 var accountIsValid = false;
 if(!(suffix[1]))
 {
    accountIsValid  = true;  
 }
 
 else if(pathlist.indexOf(suffix[1]) >=0 )
 {
     accountIsValid  = true; 
 }
 else if ((suffix[1]) && accountsList.indexOf((suffix[1])) >=0)
 {
  accountIsValid  = true;   
 }
 
 
 context.setVariable("accountIsValid",accountIsValid );
 
 // check for permissions
 context.setVariable("ReadsensitiveData", false);
 
 //balabce
 var validPermissions = false;
 if(proxyPathSuffix.indexOf("balance") >=0)
 {
     
     if(accPermissions.indexOf("ReadBalances") > -1 || accPermissions.indexOf("ReadBalancesSensitive") > -1 )
     {
         validPermissions = true;
         if(accPermissions.indexOf("ReadBalancesSensitive") > -1)
         {
         context.setVariable("ReadsensitiveData", true);
         }
     }
 }
 
 //transactios
 else if(proxyPathSuffix.indexOf("transactions") >=0)
 {
     
     if(accPermissions.indexOf("ReadTransactions") > -1 || accPermissions.indexOf("ReadTransactionsSensitive") > -1 )
     {
         validPermissions = true;
          if(accPermissions.indexOf("ReadTransactionsSensitive") > -1)
         {
         context.setVariable("ReadsensitiveData", true);
         }
     }
 }
 
 
 //beneficiaries
 else if(proxyPathSuffix.indexOf("beneficiaries") >=0)
 {
     
     if(accPermissions.indexOf("ReadBeneficiaries") > -1 || accPermissions.indexOf("ReadBeneficiaries") > -1 )
     {
         validPermissions = true;
          if(accPermissions.indexOf("ReadBeneficiaries") > -1)
         {
         context.setVariable("ReadsensitiveData", true);
         }
     }
 }
 
 
 // standing-orders
 else if(proxyPathSuffix.indexOf("standing-orders") >=0)
 {
     
     if(accPermissions.indexOf("ReadStandingOrders") > -1 || accPermissions.indexOf("ReadStandingOrdersSensitive") > -1 )
     {
         validPermissions = true;
          if(accPermissions.indexOf("ReadStandingOrdersSensitive") > -1)
         {
         context.setVariable("ReadsensitiveData", true);
         }
     }
 }
 
 // direct debits
  else if(proxyPathSuffix.indexOf("direct-debits") >=0)
 {
     
     if(accPermissions.indexOf("ReadDirectDebits") > -1 || accPermissions.indexOf("ReadDirectDebitsSensitive") > -1 )
     {
         validPermissions = true;
          if(accPermissions.indexOf("ReadDirectDebitsSensitive") > -1)
         {
         context.setVariable("ReadsensitiveData", true);
         }
     }
 }
 
 // account info case
 else
 {
     if(accPermissions.indexOf("ReadAccounts") > -1 || accPermissions.indexOf("ReadAccountsSensitive") > -1 )
     {
         validPermissions = true;
          if(accPermissions.indexOf("ReadAccountsSensitive") > -1)
         {
         context.setVariable("ReadsensitiveData", true);
         }
     }
 }
 
 context.setVariable("validPermissions",validPermissions);
 
