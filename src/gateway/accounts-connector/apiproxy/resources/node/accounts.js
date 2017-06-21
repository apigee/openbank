var request = require('request');
var apigee = require('apigee-access');


function getAccountDetails(req, callback) {
    var accountNumber = req.params.accountNumber;

    var basePath = apigee.getVariable(req, 'appBasePath');

    var options = {
        url: basePath + "/accounts/" + accountNumber,
        json: true
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var accountDetails = {};

            try {
                accountDetails.AccountId = body.entities[0].AccountId;
                //accountDetails.account_number = body.entities[0].AccountId;
                accountDetails.Currency = body.entities[0].Currency;
                accountDetails.Nickname = body.entities[0].Nickname;
                accountDetails.Account = body.entities[0].Account;
                accountDetails.Servicer = body.entities[0].Servicer;
                
                
                accountDetails.Amount = body.entities[0].Amount;
                accountDetails.CreditDebitIndicator = body.entities[0].CreditDebitIndicator;
                accountDetails.Type = body.entities[0].Type;
                accountDetails.Date = body.entities[0].Date;
                accountDetails.CreditLine = body.entities[0].CreditLine;

                
                callback(accountDetails);

            } catch (err) {
                callback(null);
            }
        } else {
            callback(null);
        }
    });
}




exports.getAccountInfo = function (req, res) {
    getAccountDetails(req, function (details) {
        if (details) 
        {
            console.log("details available");
            delete details.Amount;
            delete details.CreditDebitIndicator ;
            delete details.Type ;
            delete details.Date ;
            delete details.CreditLine; 
        }
        res.json(details);
    });
};

exports.getAccountsOfCustomer = function (req, res) {
    

    var customerId = req.query.customerId;
    console.log(customerId);

    var basePath = apigee.getVariable(req, 'appBasePath');

    var AccountIds = req.query.accountsList;
    var options  = {};
    if(AccountIds)
    {
        AccountIds = JSON.parse(AccountIds);
        var sqlquery = "where AccountId = '";
        if(AccountIds.length >0)
        {
            for(var j=0; j< AccountIds.length;j++ )
            {
            sqlquery+= AccountIds[j] + "' or AccountId = '";
            }
        sqlquery = sqlquery.substr(0, sqlquery.length-16);
        
            
        }
        else
        {
           sqlquery = ""; 
        }
        options = 
        {
        url: basePath + "/accounts",
        qs: {
            ql: sqlquery
        },
        json: true
        };

    }
    
    else
    {
    if (!req.query || !req.query.customerId) 
    {
        return res.status(400).send();
    }
    options = {
        url: basePath + "/accounts",
        qs: {
            ql: "where customers = '" + customerId + "'"
        },
        json: true
    };
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var accounts = [];

            for (var i = 0; i < body.entities.length; i++) 
            {
                //console.log("body"+JSON.stringify(body));
                var accountDetails = {};

                //accountDetails.id = body.entities[i].name;
                //accountDetails.account_number = body.entities[i].AccountId;
                accountDetails.AccountId = body.entities[i].AccountId;
                accountDetails.Currency = body.entities[i].Currency;
                accountDetails.Nickname = body.entities[i].Nickname;
                accountDetails.Account = body.entities[i].Account;
                accountDetails.Servicer = body.entities[i].Servicer;
  
                accounts.push(accountDetails);
            }
            var accnts = {};
            accnts["Accounts"] = accounts;
            res.json(accnts);
            //res.json(accounts);

        } else {
            res.status(400).send();
        }
    });
};


exports.getAccountsBalanceOfCustomer = function ( req , res )
{
     var basePath = apigee.getVariable(req, 'appBasePath');
        var AccountIds = JSON.parse(req.query.accountsList);
        
        var sqlquery = "where AccountId = '";
        if(AccountIds.length >0)
        {
            for(var j=0; j< AccountIds.length;j++ )
            {
                console.log("Account"+AccountIds[j]);
            sqlquery+= AccountIds[j] + "' or AccountId = '";
            }
        sqlquery = sqlquery.substr(0, sqlquery.length-16);
        
            
        }
        else
        {
           sqlquery = ""; 
        }
        console.log("Sql query"+sqlquery );
        var options = {
        url: basePath + "/accounts",
        qs: {
            ql: sqlquery
        },
        json: true
    };
   
        request(options, function (error, response, body) 
    {
        var balances = {};
        console.log("RESPONSE" + JSON.stringify(response));
        if (!error && response.statusCode == 200) {
            var accounts = [];

            for (var i = 0; i < body.entities.length; i++) {
                var balance = {};
                
                balance.AccountId = body.entities[i].AccountId;
                balance.Amount = body.entities[i].Amount;
                balance.CreditDebitIndicator = body.entities[i].CreditDebitIndicator;
                balance.Type = body.entities[i].Type;
                balance.Date = body.entities[i].Date;
                balance.CreditLine = body.entities[i].CreditLine;

                accounts.push(balance);
            }
            balances["Balances"] = accounts;
            res.json(balances);

        }
        else 
        {
            res.status(400).send();
        }
    });
    
};

exports.getAccountsTransactionOfCustomer = function(req,res)
{
     var basePath = apigee.getVariable(req, 'appBasePath');
    
    var AccountIds = JSON.parse(req.query.accountsList);
    
        var sqlquery = "where AccountId = '";
        if(AccountIds.length >0)
        {
        for(var j=0; j< AccountIds.length;j++ )
        {
            sqlquery+= AccountIds[j] + "' or AccountId = '";
        }
        sqlquery = sqlquery.substr(0, sqlquery.length-16);

        }
        else
        {
           sqlquery = ""; 
        }
        var options = {
        url: basePath + "/transactions",
        qs: {
            ql: sqlquery
        },
        json: true
    };
        request(options, function (error, response, body) 
        {
            //console.log("RESPONSE"+JSON.stringify(response));
         var tr = {};  
        if (!error && response.statusCode == 200) 
        {
            var transactions = [];
            //console.log("success");
            //console.log("RESPONSE"+JSON.stringify(body));
            for (var i = 0; i < body.entities.length; i++) 
            {
                var transaction = {};
                
                transaction.AccountId = body.entities[i].AccountId;
                transaction.TransactionReference = body.entities[i].uuid;
                transaction.TransactionId = body.entities[i].TransactionId;
                transaction.Status = body.entities[i].Status;
                transaction.AddressLine = body.entities[i].AddressLine;
                transaction.BookingDate = body.entities[i].BookingDate;
                transaction.ValueDate = body.entities[i].ValueDate;
                transaction.BankTransactionCode = body.entities[i].BankTransactionCode;
                transaction.ProprietaryBankTransactionCode = body.entities[i].ProprietaryBankTransactionCode;
                    transaction.TransactionInformation = body.entities[i].TransactionInformation;
                    transaction.Balance = body.entities[i].Balance;
                    transaction.Amount = body.entities[i].Amount;
                    transaction.CreditDebitIndicator = body.entities[i].CreditDebitIndicator;
                    transaction.MerchantDetails = body.entities[i].MerchantDetails;
                    transaction.Type = body.entities[i].Type;
                    transaction.Name = body.entities[i].Name;
                    transaction.MerchantCategoryCode = body.entities[i].MerchantCategoryCode;
                    transaction.Currency = body.entities[i].Currency;
                    
                    
                
                
                transactions.push(transaction);
            }
            tr["Transactions"] = transactions;
            res.json(tr);

        }
        else 
        {
            //console.log("status is not 200");
            res.status(400).send();
        }
    });
    
};

exports.getAccountBalance = function (req, res) {
    getAccountDetails(req, function (details) 
    {
        var balances = {};
        var balance = {};
        if (details) {
                balance.AccountId = details.AccountId;
                balance.Amount = details.Amount;
                balance.CreditDebitIndicator = details.CreditDebitIndicator;
                balance.Type = details.Type;
                balance.Date = details.Date;
                balance.CreditLine = details.CreditLine;
        }
        balances["Balances"] = [];
        balances["Balances"].push(balance);
        res.json(balances);
    });
};

exports.getAccountTransaction = function (req, res) {
    var accountNumber = req.params.accountNumber;
    var transactionId = req.params.transactionId;

    var basePath = apigee.getVariable(req, 'appBasePath');

    var options = {
        url: basePath + "/transactions",
        qs: {
            ql: "where AccountId = '" + accountNumber + "'",
            limit: 1000
        },
        json: true
    };

    if (transactionId) {
        options.url += '/' + transactionId;
        delete options.qs;
    }

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) {
            var transactions = [];
            for (var i = 0; i < body.entities.length; i++) {
                var transaction = {}

                transaction.AccountId = body.entities[i].AccountId;
                transaction.TransactionReference = body.entities[i].TransactionReference;
                transaction.TransactionId = body.entities[i].uuid;
                transaction.Status = body.entities[i].Status;
                transaction.AddressLine = body.entities[i].AddressLine;
                transaction.BookingDate = body.entities[i].BookingDate;
                transaction.ValueDate = body.entities[i].ValueDate;
                transaction.BankTransactionCode = body.entities[i].BankTransactionCode;
                transaction.ProprietaryBankTransactionCode = body.entities[i].ProprietaryBankTransactionCode;
                transaction.TransactionInformation = body.entities[i].TransactionInformation;
                transaction.Balance = body.entities[i].Balance;
                transaction.Amount = body.entities[i].Amount;
                transaction.CreditDebitIndicator = body.entities[i].CreditDebitIndicator;
                transaction.MerchantDetails = body.entities[i].MerchantDetails;
                transaction.Type = body.entities[i].Type;
                transaction.Name = body.entities[i].Name;
                transaction.MerchantCategoryCode = body.entities[i].MerchantCategoryCode;
                transaction.Currency = body.entities[i].Currency;

                transactions.push(transaction);
            }
            var tr = {};
            tr["Transactions"] = transactions;
            res.json(tr);
        }
    });
};


exports.getAccountBeneficiaries = function (req, res) {
    var accountNumber = req.params.accountNumber;
    

    var basePath = apigee.getVariable(req, 'appBasePath');

    var options = {
        url: basePath + "/beneficiaries",
        qs: {
            ql: "where AccountId = '" + accountNumber + "'"
        },
        json: true
    };

    

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) {
            var beneficiaries = [];
            for (var i = 0; i < body.entities.length; i++) {
                var beneficiary = {};

                
                beneficiary.AccountId = body.entities[i].AccountId;
                beneficiary.BeneficiaryId = body.entities[i].uuid;
                beneficiary.CreditorReferenceInformation = body.entities[i].CreditorReferenceInformation;
                beneficiary.Servicer = body.entities[i].Servicer;
                beneficiary.CreditorAccount = body.entities[i].CreditorAccount;

                beneficiaries.push(beneficiary);
            }
            var ben = {};
            ben["Beneficiaries"] = beneficiaries
            res.json(ben);
        }
    });
};


exports.createAccountRequest = function(req,res)
{
    var basePath = apigee.getVariable(req, 'appBasePath');
    var requestPayload = apigee.getVariable(req, 'request.content');
    requestPayload = JSON.parse(requestPayload);
    requestPayload.status = "AwaitingAuthentication";
    //requestPayload = JSON.stringify(requestPayload);
    
    var options = {
        url: basePath + "/accountsrequests",
        method : "POST",
        headers : {'content-type' : 'application/json'},
        body : requestPayload,
        json: true
    };
    
    request(options, function(err, resp, bdy)
    {
        //resp = JSON.parse(resp);
        //bdy = JSON.parse(bdy);
        //console.log("bbbdddyyy"+JSON.stringify(resp));
        //console.log("body"+JSON.stringify(bdy));
        //console.log("ent"+JSON.stringify(bdy.entities));
        
        
        if (!err && (resp.statusCode == 200 )  && bdy.entities)
        {
            var accRequest = bdy.entities[0];
                accRequest.AccountRequestId = accRequest.name;
                delete accRequest.created;
                delete accRequest.modified;
                //delete accRequest.customerId;

                delete accRequest.uuid;
                delete accRequest.type;
                delete accRequest.metadata;
            
            res.status(201).json(accRequest);
        }
        else {
            res.status(400).send();
        }
        
    });
    
}


exports.getAccountRequest = function(req,res){
  var requestId = req.params.requestId;
  
    
    var basePath = apigee.getVariable(req, 'appBasePath');

    var options = {
        url: basePath + "/accountsrequests" ,
        qs: {
            ql: "where name = '" + requestId + "'"
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            
            var accreq = body.entities[0];
             accreq.AccountIds = [];
            var selectedacc = accreq.SelectedAccounts;
            for(var i=0; i< selectedacc.length;i++ )
            {
                //console.log(selectedacc[i]);
               // console.log(selectedacc[i].Account);
                //console.log("Val"+selectedacc[i].Account["Identification"]);
                accreq.AccountIds.push(selectedacc[i].Account.Identification);
            }
            
            
                accreq.AccountRequestId = accreq.name;
                delete accreq.created;
                delete accreq.modified;
                //delete accRequest.customerId;

                delete accreq.uuid;
                delete accreq.type;
                delete accreq.metadata;
                delete accreq.name;

            res.json(accreq);

        } else {
            res.status(404).send();
        }
    });
    
    
};

exports.updateAccountRequest = function(req,res)
{
    var basePath = apigee.getVariable(req, 'appBasePath');
    var requestId = req.params.requestId;
    var requestPayload = apigee.getVariable(req, 'request.content');
    requestPayload = JSON.parse(requestPayload);
    //requestPayload.status = "AwaitingAuthentication";
    //requestPayload = JSON.stringify(requestPayload);
    
    var options = {
        url: basePath + "/accountsrequests",
        qs: {
            ql: "where name = '" + requestId + "'"
        },
        method : "PUT",
        headers : {'content-type' : 'application/json'},
        body : requestPayload,
        json: true
    };
    
    request(options, function(err, resp, bdy)
    {
        //resp = JSON.parse(resp);
        //bdy = JSON.parse(bdy);
        //console.log("bbbdddyyy"+JSON.stringify(resp));
        //console.log("body"+JSON.stringify(bdy));
        //console.log("ent"+JSON.stringify(bdy.entities));
        
        
        if (!err && (resp.statusCode == 200 )  && bdy.entities)
        {
            var accRequest = bdy.entities[0];
                accRequest.AccountRequestId = accRequest.name;
                delete accRequest.created;
                delete accRequest.modified;
                //delete accRequest.customerId;

                delete accRequest.uuid;
                delete accRequest.type;
                delete accRequest.metadata;
            
            res.json(accRequest);
        }
        else {
            res.status(400).send();
        }
        
    });
}

exports.deleteAccountRequest = function(req,res)
{
    var requestId = req.params.requestId;
  
    
    var basePath = apigee.getVariable(req, 'appBasePath');

    var options = {
        method : "DELETE",
        url: basePath + "/accountsrequests" ,
        qs: {
            ql: "where name = '" + requestId + "'"
        }
        //json: true
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 204 || response.statusCode == 200) 
        {
            res.status(204).send();

        } else 
        {
            res.status(404).send();
        }
    });
}
exports.getAccountsBeneficiariesOfCustomer = function (req, res) {
    
    var basePath = apigee.getVariable(req, 'appBasePath');
    var AccountIds = JSON.parse(req.query.accountsList);
        var sqlquery = "where AccountId = '";
        if(AccountIds.length >0)
        {
        for(var j=0; j< AccountIds.length;j++ )
        {
            sqlquery+= AccountIds[j] + "' or AccountId = '";
        }
        sqlquery = sqlquery.substr(0, sqlquery.length-16);

        }
        else
        {
           sqlquery = ""; 
        }
        var options = {
        url: basePath + "/beneficiaries",
        qs: {
            ql: sqlquery
        },
        json: true
    };
        request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) {
            var beneficiaries = [];
            for (var i = 0; i < body.entities.length; i++) {
                var beneficiary = {};
              
                beneficiary.AccountId = body.entities[i].AccountId;
                beneficiary.BeneficiaryId = body.entities[i].uuid;
                beneficiary.CreditorReferenceInformation = body.entities[i].CreditorReferenceInformation;
                beneficiary.Servicer = body.entities[i].Servicer;
                beneficiary.CreditorAccount = body.entities[i].CreditorAccount;

                beneficiaries.push(beneficiary);
            }
            var ben = {};
            ben["Beneficiaries"] = beneficiaries;
            res.json(ben);
        }
        else
        {
            res.status(400).send();
        }
    });
    
        
   
};



exports.getStandingOrdersOfCustomer = function (req, res) {

    var basePath = apigee.getVariable(req, 'appBasePath');
    var AccountIds = JSON.parse(req.query.accountsList);
        var sqlquery = "where AccountId = '";
        if(AccountIds.length >0)
        {
        for(var j=0; j< AccountIds.length;j++ )
        {
            sqlquery+= AccountIds[j] + "' or AccountId = '";
        }
        sqlquery = sqlquery.substr(0, sqlquery.length-16);

        }
        else
        {
           sqlquery = ""; 
        }
        var options = {
        url: basePath + "/standingorders",
        qs: {
            ql: sqlquery
        },
        json: true
    };

        request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) 
        {
            //console.log("standingorders" + JSON.stringify(response));
            var standingorders = [];
            for (var i = 0; i < body.entities.length; i++) {
                var so = {};
 
                so.AccountId = body.entities[i].AccountId;
                so.StandingOrderId = body.entities[i].uuid;
                so.Currency = body.entities[i].Currency;
                so.Frequency = body.entities[i].Frequency;
                so.CreditorReferenceInformation = body.entities[i].CreditorReferenceInformation;
                so.FirstPaymentDate = body.entities[i].FirstPaymentDate;
                so.FirstPaymentAmount = body.entities[i].FirstPaymentAmount;
                so.NextPaymentDate = body.entities[i].NextPaymentDate;
                so.NextPaymentAmount = body.entities[i].NextPaymentAmount;
                so.FinalPaymentDate = body.entities[i].FinalPaymentDate;
                so.FinalPaymentAmount = body.entities[i].FinalPaymentAmount;
                so.Servicer = body.entities[i].Servicer;
                so.CreditorAccount = body.entities[i].CreditorAccount;
   
                standingorders.push(so);
                
            }
            var sto = {};
            sto["StandingOrders"] = standingorders;
            res.json(sto);
        }
        else
        {
            res.status(400).send();
        }
    });
   
    
};


exports.getAccountStandingOrders = function (req, res) {
    var accountNumber = req.params.accountNumber;
    

    var basePath = apigee.getVariable(req, 'appBasePath');

    var options = {
        url: basePath + "/standingorders",
        qs: {
            ql: "where AccountId = '" + accountNumber + "'"
        },
        json: true
    };

    

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) {
            var standingorders = [];
            for (var i = 0; i < body.entities.length; i++) {
                var so = {};

                
                so.AccountId = body.entities[i].AccountId;
                so.StandingOrderId = body.entities[i].uuid;
                so.Currency = body.entities[i].Currency;
                so.Frequency = body.entities[i].Frequency;
                so.CreditorReferenceInformation = body.entities[i].CreditorReferenceInformation;
                so.FirstPaymentDate = body.entities[i].FirstPaymentDate;
                so.FirstPaymentAmount = body.entities[i].FirstPaymentAmount;
                so.NextPaymentDate = body.entities[i].NextPaymentDate;
                so.NextPaymentAmount = body.entities[i].NextPaymentAmount;
                so.FinalPaymentDate = body.entities[i].FinalPaymentDate;
                so.FinalPaymentAmount = body.entities[i].FinalPaymentAmount;
                so.Servicer = body.entities[i].Servicer;
                so.CreditorAccount = body.entities[i].CreditorAccount;

                standingorders.push(so);
            }
            var sto = {};
            sto["StandingOrders"] = standingorders;
            res.json(sto);
        }
    });
};


exports.getDirectDebitsOfCustomer = function (req, res) {
 
    var basePath = apigee.getVariable(req, 'appBasePath');
    var AccountIds = JSON.parse(req.query.accountsList);
        var sqlquery = "where AccountId = '";
        if(AccountIds.length >0)
        {
        for(var j=0; j< AccountIds.length;j++ )
        {
            sqlquery+= AccountIds[j] + "' or AccountId = '";
        }
        sqlquery = sqlquery.substr(0, sqlquery.length-16);

        }
        else
        {
           sqlquery = ""; 
        }
        var options = 
        {
        url: basePath + "/directdebits",
        qs: {
            ql: sqlquery
        },
        json: true
        };
        request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) {
            var directdebits = [];
            for (var i = 0; i < body.entities.length; i++) {
                var dd = {};

                
                dd.AccountId = body.entities[i].AccountId;
                dd.DirectDebitId = body.entities[i].uuid;
                dd.MandateIdentification = body.entities[i].MandateIdentification;
                dd.DirectDebitStatusCode = body.entities[i].DirectDebitStatusCode;
                dd.Currency = body.entities[i].Currency;
                dd.Name = body.entities[i].Name;
                dd.PreviousPaymentDate = body.entities[i].PreviousPaymentDate;
                dd.PreviousPaymentAmount = body.entities[i].PreviousPaymentAmount;

                directdebits.push(dd);
            }
            var drd = {};
            drd["DirectDebits"] = directdebits;
            res.json(drd);
            
        }
        else
        {
            res.status(400).send();
        }
    });
    
};



exports.getAccountDirectDebits = function (req, res) {
    var accountNumber = req.params.accountNumber;
    

    var basePath = apigee.getVariable(req, 'appBasePath');

    var options = {
        url: basePath + "/directdebits",
        qs: {
            ql: "where AccountId = '" + accountNumber + "'"
        },
        json: true
    };

    

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) {
           var directdebits = [];
            for (var i = 0; i < body.entities.length; i++) {
                var dd = {};

                
                dd.AccountId = body.entities[i].AccountId;
                dd.DirectDebitId = body.entities[i].uuid;
                dd.MandateIdentification = body.entities[i].MandateIdentification;
                dd.DirectDebitStatusCode = body.entities[i].DirectDebitStatusCode;
                dd.Currency = body.entities[i].Currency;
                dd.Name = body.entities[i].Name;
                dd.PreviousPaymentDate = body.entities[i].PreviousPaymentDate;
                dd.PreviousPaymentAmount = body.entities[i].PreviousPaymentAmount;

                directdebits.push(dd);
            }
            var drd = {};
            drd["DirectDebits"] = directdebits;
            res.json(drd);
        }
    });
};


exports.validate = function(req, res) {

};