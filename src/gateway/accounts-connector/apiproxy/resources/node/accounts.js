/*
 Copyright 2017 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @file
 * accounts.js
 * Accounts Route.
 */
var request = require('request');
var apigee = require('apigee-access');
var packagejson = require('./package.json');

exports.getAccountInfo = function (req, res) {
    var accountNumber = req.params.accountNumber;
    var basePath = apigee.getVariable(req, 'appBasePath');
    var apikey = apigee.getVariable(req, 'apikey');
    var options =
        {
            url: basePath + "/accounts?ql= where AccountId='" + accountNumber + "'",
            json: true,
            qs :
            {
                "x-apikey": apikey
            }
        };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var accountDetails = {};

            accountDetails.AccountId = body.entities[0].AccountId;
            accountDetails.Currency = body.entities[0].Currency;
            accountDetails.Nickname = body.entities[0].Nickname;
            accountDetails.Account = body.entities[0].Account;
            accountDetails.Servicer = body.entities[0].Servicer;

            accnts = {};
            accnts.Data = {};
            accnts.Data.Account = [];
            accnts.Data.Account.push(accountDetails);
            accnts.Links = {};
            accnts.Links.self = "/accounts/" + accountNumber;
            accnts.Meta = {};
            res.json(accnts);

        }
        else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }
    });
};

exports.getAccountsOfCustomer = function (req, res) {


    var cursor = req.query.pageHint;
    var limit = req.query.limit;

    var basePath = apigee.getVariable(req, 'appBasePath');
    var apikey = apigee.getVariable(req, 'apikey');
    var accountIds = null;
    if (req.query && req.query.accountsList) {
        accountIds = req.query.accountsList;
    }
    var options = {};
    // get accounts information only for selected accounts of customer
    if (accountIds) 
    {
        getDataForAllAccounts("accounts", req, res, function(body){
        if (body.entities) 
        {
            var accounts = [];

            for (var i = 0; i < body.entities.length; i++) {
                var accountDetails = {};
                accountDetails.AccountId = body.entities[i].AccountId;
                accountDetails.Currency = body.entities[i].Currency;
                accountDetails.Nickname = body.entities[i].Nickname;
                accountDetails.Account = body.entities[i].Account;
                accountDetails.Servicer = body.entities[i].Servicer;

                accounts.push(accountDetails);
            }
            var accnts = {};
            accnts.Data = {};
            accnts.Data["Account"] = accounts;
            accnts.Meta = {};
            accnts.Links = {};
            if (body.cursor) {
                accnts.Links.next = "/accounts?pageHint=" + body.cursor;
            }
            res.json(accnts);

        } 
        else 
        {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }
    });

    } 
    else 
    {// get accounts info for all accounts of the customer
        if (!req.query || !req.query.customerId) {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            return res.status(400).json(errJson);
        }
        var customerId = req.query.customerId;
        options = {
            url: basePath + "/accounts",
            qs:
            {
                ql: "where CustomerId='"+ customerId + "'",
                "x-apikey": apikey
            },
            json: true
        };
        if (cursor) 
        {
        options.qs.cursor=cursor;
        }
        if (limit) 
        {
            options.qs.limit=limit;
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var accounts = [];
    
                for (var i = 0; i < body.entities.length; i++) {
                    var accountDetails = {};
                    accountDetails.AccountId = body.entities[i].AccountId;
                    accountDetails.Currency = body.entities[i].Currency;
                    accountDetails.Nickname = body.entities[i].Nickname;
                    accountDetails.Account = body.entities[i].Account;
                    accountDetails.Servicer = body.entities[i].Servicer;
    
                    accounts.push(accountDetails);
                }
                var accnts = {};
                accnts.Data = {};
                accnts.Data["Account"] = accounts;
                accnts.Meta = {};
                accnts.Links = {};
                if (body.cursor) {
                    accnts.Links.next = "/accounts?pageHint=" + body.cursor;
                }
                res.json(accnts);
    
            } 
            else 
            {
                var errJson = {};
                errJson.ErrorResponseCode = 400;
                errJson.ErrorDescription = "Bad Request";
                res.status(400).json(errJson);
            }
        });
    }
    
};

// get account balance for a given account of customer
exports.getAccountBalance = function (req, res) {
    var accountNumber = req.params.accountNumber;
    var basePath = apigee.getVariable(req, 'appBasePath');
    var apikey = apigee.getVariable(req, 'apikey');
    var options = {
        url: basePath + "/accounts?ql= where AccountId='" + accountNumber + "'",
        qs:{
            "x-apikey": apikey
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var balance = {};
            balance.AccountId = body.entities[0].AccountId;
            balance.Amount = body.entities[0].Amount;
            balance.CreditDebitIndicator = body.entities[0].CreditDebitIndicator;
            balance.Type = body.entities[0].Type;
            if (body.entities[0].DateTime) {
                balance.DateTime = new Date(body.entities[0].DateTime).toISOString();
            }
            balance.CreditLine = body.entities[0].CreditLine;

            var accBalance = {};
            accBalance.Data = {};
            accBalance.Data.Balance = [];
            accBalance.Data.Balance.push(balance);
            accBalance.Meta = {};
            accBalance.Links = {};
            accBalance.Links.self = "/accounts/" + accountNumber + "/balances";
            res.json(accBalance);


        }
        else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }
    });
};

// get balance info of selected accounts of customer
exports.getAccountsBalanceOfCustomer = function (req, res) {
    getDataForAllAccounts("accounts", req, res, function(body){
        var balances = {};
        if (body.entities) 
        {
            var accounts = [];

            for (var i = 0; i < body.entities.length; i++) {
                var balance = {};

                balance.AccountId = body.entities[i].AccountId;
                balance.Amount = body.entities[i].Amount;
                balance.CreditDebitIndicator = body.entities[i].CreditDebitIndicator;
                balance.Type = body.entities[i].Type;
                if (body.entities[0].DateTime) {
                    balance.DateTime = new Date(body.entities[0].DateTime).toISOString();
                }
                balance.CreditLine = body.entities[i].CreditLine;

                accounts.push(balance);
            }
            balances.Data = {};
            balances.Data["Balance"] = accounts;
            balances.Meta = {};
            balances.Links = {};
            if (body.cursor) {
                balances.Links.next = "/balances?pageHint=" + body.cursor;
            }
            res.json(balances);

        }
        else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }
    });

};
// Get details of all transactions of  all selected accounts of customer
exports.getAccountsTransactionOfCustomer = function (req, res) {


    var basePath = apigee.getVariable(req, 'appBasePath');
    var apikey = apigee.getVariable(req, 'apikey');
    if (!req.query || !req.query.accountsList) {

        var errJson = {};
        errJson.ErrorResponseCode = 400;
        errJson.ErrorDescription = "Empty Account List";
        res.status(400).json(errJson);
    }
    var cursor = req.query.pageHint;
    var limit = req.query.limit;
    var currentCursor = null;
    var accountIds = JSON.parse(req.query.accountsList);
    var index = 0;
    var currentLimit = limit;
    var data = {}
    entities = [];
    var token = "";
    var options1;
    var customCursor = "nextpage";
    var tr = {};
    tr.Data = {};
    tr.Data["Transaction"] = {};
    tr.Meta = {};
    tr.Links = {};
    
    
    if(!currentLimit)
    {
        currentLimit = 50;
    }
    if(cursor)
    {
         var cursorArray = cursor.split("::");
         if(cursorArray.length == 2 )
         {
            // start from specified account number
            var newAccounts = [];
            for(var i=0;i<accountIds.length;i++)
            {
                newAccounts.push(""+ accountIds[i] );
            }
            index = newAccounts.indexOf(cursorArray[0]);
            currentCursor = cursorArray[1];
            // if no DB cursor, donot apply
            if(cursorArray[1] == customCursor)
            {
                currentCursor = null;
            }
         }
    }
    var options = {
        url: basePath + "/transactions" ,
        qs:
        {
           ql:  "WHERE AccountId=",
           "x-apikey": apikey
        },
        json: true
    };
    var endData = false;
    console.log("all good");
    if (accountIds.length > 0) 
    {

        console.log("length more")
        options1 = options;
        var firstRequest = true;



        syncLoop(accountIds.length, function(loop){
                var j = index;
                options1.qs.ql = "WHERE AccountId="+ "'" + accountIds[j] + "'";
                options1.qs.limit = currentLimit;
                // only for first request, use the cursor;
                if(firstRequest && currentCursor)
                {
                   options1.qs.cursor = currentCursor;
                   firstRequest = false;
                }
                else
                {
                    options1.qs.cursor = null;
                }
                request(options1, function (error, response, body) 
                {
                index++;
                if (!error && response.statusCode == 200 && body.entities) 
                {
                    var transactions = [];
                    for (var i = 0; i < body.entities.length; i++) {
                    var transaction = {};

                    transaction.AccountId = body.entities[i].AccountId;
                    transaction.TransactionReference = body.entities[i].TransactionReference;
                    transaction.TransactionId = body.entities[i].uuid;
                    transaction.Amount = body.entities[i].Amount;
                    transaction.CreditDebitIndicator = body.entities[i].CreditDebitIndicator;
                    transaction.Status = body.entities[i].Status;
                    if (body.entities[i].BookingDateTime) {
                        transaction.BookingDateTime = new Date(body.entities[i].BookingDateTime).toISOString();
                    }
                    if (body.entities[i].ValueDateTime) {
                        transaction.ValueDateTime = new Date(body.entities[i].ValueDateTime).toISOString();
                    }
                    transaction.TransactionInformation = body.entities[i].TransactionInformation;
                    transaction.AddressLine = body.entities[i].AddressLine;
                    transaction.BankTransactionCode = body.entities[i].BankTransactionCode;
                    transaction.ProprietaryBankTransactionCode = body.entities[i].ProprietaryBankTransactionCode;
                    transaction.Balance = body.entities[i].Balance;
                    transaction.MerchantDetails = body.entities[i].MerchantDetails;

                    transactions.push(transaction);
                    }
                    entities = entities.concat(transactions);
                    currentLimit = currentLimit - body.entities.length;
                    // if limit gets over of no more list of accounts
                    if((currentLimit <=0) || (index == accountIds.length) )
                    {
                        endData = true;
                        tr.Data["Transaction"] = entities;
                        // if no more results for current account, set cursor to next account 
                        if(!body.cursor)
                        {
                           if(accountIds[j+1])
                           {
                           tr.Links.next = "/transactions?pageHint=" + accountIds[j+1] + "::" + customCursor; 
                           }
                        }
                        // if more results for current account
                        else
                        {
                         token = "" + accountIds[j] + "::" + body.cursor;
                         tr.Links.next = "/transactions?pageHint=" + token;
                        }
                        res.json(tr); 
                    }
                    else
                    {
                        loop.next();
                    }
                    
                }
                else
                {
                    {
                    var errJson = {};
                    errJson.ErrorResponseCode = 400;
                    errJson.ErrorDescription = "Bad Request";
                    res.status(400).json(errJson);
                }
                }
                
            });
            
        }, null);
    
    }
    else
    {
      res.json(tr);  
    }

};

// get list of transactions of a single account of customer
exports.getAccountTransaction = function (req, res) {

    var accountNumber = req.params.accountNumber;
    var options = getOptionsJsonForAccount("transactions", req);
    if (req.query && req.query.fromBookingDateTime && !isNaN(Date.parse(req.query.fromBookingDateTime))) {
        options.qs.ql += " and BookingDateTime >= " + Date.parse(req.query.fromBookingDateTime);
    }
    if (req.query && req.query.toBookingDateTime && !isNaN(Date.parse(req.query.toBookingDateTime))) {
        options.qs.ql += " and BookingDateTime <= " + Date.parse(req.query.toBookingDateTime);
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) {
            var transactions = [];
            for (var i = 0; i < body.entities.length; i++) {
                var transaction = {};

                transaction.AccountId = body.entities[i].AccountId;
                transaction.TransactionReference = body.entities[i].TransactionReference;
                transaction.TransactionId = body.entities[i].uuid;
                transaction.Amount = body.entities[i].Amount;
                transaction.CreditDebitIndicator = body.entities[i].CreditDebitIndicator;
                transaction.Status = body.entities[i].Status;
                if (body.entities[i].BookingDateTime) {
                    transaction.BookingDateTime = new Date(body.entities[i].BookingDateTime).toISOString();
                }
                if (body.entities[i].ValueDateTime) {
                    transaction.ValueDateTime = new Date(body.entities[i].ValueDateTime).toISOString();
                }
                transaction.TransactionInformation = body.entities[i].TransactionInformation;
                transaction.AddressLine = body.entities[i].AddressLine;
                transaction.BankTransactionCode = body.entities[i].BankTransactionCode;
                transaction.ProprietaryBankTransactionCode = body.entities[i].ProprietaryBankTransactionCode;
                transaction.Balance = body.entities[i].Balance;
                transaction.MerchantDetails = body.entities[i].MerchantDetails;

                transactions.push(transaction);
            }
            var tr = {};
            tr.Data = {};
            tr.Data["Transaction"] = transactions;
            tr.Meta = {};
            tr.Links = {};
            if (body.cursor) {
                tr.Links.next = "/accounts/" + accountNumber + "/transactions?pageHint=" + body.cursor;
            }
            res.json(tr);
        }
        else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }
    });
};

// get list of account beneficiaries for a single account
exports.getAccountBeneficiaries = function (req, res) {
    var accountNumber = req.params.accountNumber;
    var options = getOptionsJsonForAccount("beneficiaries", req);
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) {
            var beneficiaries = [];
            for (var i = 0; i < body.entities.length; i++) {
                var beneficiary = {};


                beneficiary.AccountId = body.entities[i].AccountId;
                beneficiary.BeneficiaryId = body.entities[i].uuid;
                beneficiary.Reference = body.entities[i].Reference;
                beneficiary.Servicer = body.entities[i].Servicer;
                beneficiary.CreditorAccount = body.entities[i].CreditorAccount;

                beneficiaries.push(beneficiary);
            }
            var ben = {};
            ben.Data = {};
            ben.Data.Beneficiary = beneficiaries;
            ben.Meta = {};
            ben.Links = {};
            if (body.cursor) {
                ben.Links.next = "/accounts/" + accountNumber + "/beneficiaries?pageHint=" + body.cursor;
            }
            res.json(ben);
        }
        else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }
    });
};

// get beneficiary details of all selected accounts of a customer
exports.getAccountsBeneficiariesOfCustomer = function (req, res) {

    getDataForAllAccounts("beneficiaries", req, res, function(body)
    {
    if(body.entities)
     {
        var beneficiaries = [];
        for (var i = 0; i < body.entities.length; i++) 
        {
            var beneficiary = {};

            beneficiary.AccountId = body.entities[i].AccountId;
            beneficiary.BeneficiaryId = body.entities[i].uuid;
            beneficiary.Reference = body.entities[i].Reference;
            beneficiary.Servicer = body.entities[i].Servicer;
            beneficiary.CreditorAccount = body.entities[i].CreditorAccount;

            beneficiaries.push(beneficiary);
        }
        var ben = {};
        ben.Data = {};
        ben.Data.Beneficiary = beneficiaries;
        ben.Meta = {};
        ben.Links = {};
        if (body.cursor) 
        {
            ben.Links.next = "/beneficiaries?pageHint=" + body.cursor;
        }
        res.json(ben);
        
        
    }
    else 
    {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
    } 
    });
    


};

// get standing order details for all selected customer's accounts
exports.getStandingOrdersOfCustomer = function (req, res) {

    getDataForAllAccounts("standingorders", req, res, function(body)
    {
        if (body.entities) {
            var standingorders = [];
            for (var i = 0; i < body.entities.length; i++) {
                var so = {};

                so.AccountId = body.entities[i].AccountId;
                so.StandingOrderId = body.entities[i].uuid;
                so.Frequency = body.entities[i].Frequency;
                so.Currency = body.entities[i].Currency;
                so.Reference = body.entities[i].Reference;
                if (body.entities[i].FirstPaymentDateTime) {
                    so.FirstPaymentDateTime = new Date(body.entities[i].FirstPaymentDateTime).toISOString();
                }
                if (body.entities[i].NextPaymentDateTime) {
                    so.NextPaymentDateTime = new Date(body.entities[i].NextPaymentDateTime).toISOString();
                }
                if (body.entities[i].FinalPaymentDateTime) {
                    so.FinalPaymentDateTime = new Date(body.entities[i].FinalPaymentDateTime).toISOString();
                }
                so.FirstPaymentAmount = body.entities[i].FirstPaymentAmount;
                so.NextPaymentAmount = body.entities[i].NextPaymentAmount;
                so.FinalPaymentAmount = body.entities[i].FinalPaymentAmount;
                so.Servicer = body.entities[i].Servicer;
                so.CreditorAccount = body.entities[i].CreditorAccount;

                standingorders.push(so);

            }
            var sto = {};
            sto.Data = {};
            sto.Data.StandingOrder = standingorders;
            sto.Meta = {};
            sto.Links = {};
            if (body.cursor) {
                sto.Links.next = "/standing-orders?pageHint=" + body.cursor;
            }
            res.json(sto);
        }
        else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }   
    });


};

// get standing orders details for an account of customer
exports.getAccountStandingOrders = function (req, res) {
    var accountNumber = req.params.accountNumber;
    var options = getOptionsJsonForAccount("standingorders", req);
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) {
            var standingorders = [];
            for (var i = 0; i < body.entities.length; i++) {
                var so = {};

                so.AccountId = body.entities[i].AccountId;
                so.StandingOrderId = body.entities[i].uuid;
                so.Frequency = body.entities[i].Frequency;
                so.Currency = body.entities[i].Currency;
                so.Reference = body.entities[i].Reference;
                if (body.entities[i].FirstPaymentDateTime) {
                    so.FirstPaymentDateTime = new Date(body.entities[i].FirstPaymentDateTime).toISOString();
                }
                if (body.entities[i].NextPaymentDateTime) {
                    so.NextPaymentDateTime = new Date(body.entities[i].NextPaymentDateTime).toISOString();
                }
                if (body.entities[i].FinalPaymentDateTime) {
                    so.FinalPaymentDateTime = new Date(body.entities[i].FinalPaymentDateTime).toISOString();
                }
                so.FirstPaymentAmount = body.entities[i].FirstPaymentAmount;
                so.NextPaymentAmount = body.entities[i].NextPaymentAmount;
                so.FinalPaymentDateTime = new Date(body.entities[i].FinalPaymentDateTime).toISOString();
                so.FinalPaymentAmount = body.entities[i].FinalPaymentAmount;
                so.Servicer = body.entities[i].Servicer;
                so.CreditorAccount = body.entities[i].CreditorAccount;

                standingorders.push(so);
            }
            var sto = {};
            sto.Data = {};
            sto.Data.StandingOrder = standingorders;
            sto.Meta = {};
            sto.Links = {};
            if (body.cursor) {
                sto.Links.next = "/accounts/" + accountNumber + "/standing-orders?pageHint=" + body.cursor;
            }
            res.json(sto);
        }
        else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }
    });
};


// get direct debits list of all selected accounts of a customer
exports.getDirectDebitsOfCustomer = function (req, res) {
    console.log("in dd");
    getDataForAllAccounts("directdebits", req, res, function(body)
    {
        console.log("body1"+ JSON.stringify(body));
        if (body) 
        {
            var directdebits = [];
            for (var i = 0; i < body.entities.length; i++) {
                var dd = {};


                dd.AccountId = body.entities[i].AccountId;
                dd.DirectDebitId = body.entities[i].uuid;
                dd.MandateIdentification = body.entities[i].MandateIdentification;
                dd.DirectDebitStatusCode = body.entities[i].DirectDebitStatusCode;
                dd.Name = body.entities[i].name;
                if (body.entities[i].PreviousPaymentDateTime) {
                    dd.PreviousPaymentDateTime = new Date(body.entities[i].PreviousPaymentDateTime).toISOString();
                }
                dd.PreviousPaymentAmount = body.entities[i].PreviousPaymentAmount;

                directdebits.push(dd);
            }
            var drd = {};
            drd.Data = {};
            drd.Data["DirectDebit"] = directdebits;
            drd.Meta = {};
            drd.Links = {};
            if (body.cursor) {
                drd.Links.next = "/direct-debits?pageHint=" + body.cursor;
            }
            res.json(drd);

        }
        else 
        {
            console.log("error bad request");
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request length";
            res.status(400).json(errJson);
        }
    });
    
    

};


// get direct debits list for a single account of customer
exports.getAccountDirectDebits = function (req, res) {
    var accountNumber = req.params.accountNumber;
    var options = getOptionsJsonForAccount("directdebits", req);
    console.log(JSON.stringify(options));
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) {
            var directdebits = [];
            for (var i = 0; i < body.entities.length; i++) {
                var dd = {};


                dd.AccountId = body.entities[i].AccountId;
                dd.DirectDebitId = body.entities[i].uuid;
                dd.MandateIdentification = body.entities[i].MandateIdentification;
                dd.DirectDebitStatusCode = body.entities[i].DirectDebitStatusCode;
                dd.Name = body.entities[i].name;
                if (body.entities[i].PreviousPaymentDateTime) {
                    dd.PreviousPaymentDateTime = new Date(body.entities[i].PreviousPaymentDateTime).toISOString();
                }
                dd.PreviousPaymentAmount = body.entities[i].PreviousPaymentAmount;

                directdebits.push(dd);
            }
            var drd = {};
            drd.Data = {};
            drd.Data["DirectDebit"] = directdebits;
            drd.Meta = {};
            drd.Links = {};
            if (body.cursor) {
                drd.Links.next = "/accounts/" + accountNumber + "/direct-debits?pageHint=" + body.cursor;
            }
            res.json(drd);
        }
        else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }
    });
};


// get products of an account of a customer
exports.getAccountProducts = function (req, res) {
    var accountNumber = req.params.accountNumber;
    var options = getOptionsJsonForAccount("products", req);
    options.qs.ql = "where AccountId contains '" + accountNumber + "'";
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200 && body.entities) {
            var products = [];
            for (var i = 0; i < body.entities.length; i++) {
                var product = {};


                product.AccountId = "" + accountNumber;
                product.ProductIdentifier = body.entities[i].name;
                product.ProductType = body.entities[i].ProductType;
                product.ProductName = body.entities[i].ProductName;
                product.SecondaryProductIdentifier = body.entities[i].SecondaryProductIdentifier;

                products.push(product);
            }
            var prd = {};
            prd.Data = {};
            prd.Data["Product"] = products;
            prd.Meta = {};
            prd.Links = {};
            if (body.cursor) {
                prd.Links.next = "/accounts/" + accountNumber + "/products?pageHint=" + body.cursor;
            }
            res.json(prd);

        }
        else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }
    });
};


exports.createAccountRequest = function (req, res) {
    var basePath = apigee.getVariable(req, 'appBasePath');
    var apikey = apigee.getVariable(req, 'apikey');
    var requestPayload = apigee.getVariable(req, 'request.content');
    requestPayload = JSON.parse(requestPayload);
    requestPayload.Status = "AwaitingAuthentication";
    requestPayload.TppId = req.query.tppId;
    requestPayload.CreationDateTime = Date.parse(new Date());
    var options = {
        url: basePath + "/accountsrequests",
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: requestPayload,
        json: true,
        qs : {
            "x-apikey": apikey
            }
    };

    request(options, function (err, resp, body) {
        if (!err && (resp.statusCode == 200 || resp.statusCode == 201 ) && body) {
            var accRequest = {};
            accRequest.Data = {};
            accRequest.Data.AccountRequestId = body.uuid;
            accRequest.Data.Status = body.Status;
            if (body.CreationDateTime) 
            {
                accRequest.Data.CreationDateTime = new Date(body.CreationDateTime).toISOString();
            }
            accRequest.Data.Permissions = body.Data.Permissions;
            if (body.Data.ExpirationDateTime) {
                accRequest.Data.ExpirationDateTime = new Date(body.Data.ExpirationDateTime).toISOString();
            }
            if (body.Data.TransactionFromDateTime) {
                accRequest.Data.TransactionFromDateTime = new Date(body.Data.TransactionFromDateTime).toISOString();
            }
            if (body.Data.TransactionToDateTime) {
                accRequest.Data.TransactionToDateTime = new Date(body.Data.TransactionToDateTime).toISOString();
            }
            accRequest.Risk = body.Risk;
            accRequest.Links = {};
            accRequest.Links.self = "/account-requests/" + accRequest.Data.AccountRequestId;
            accRequest.Meta = {};

            res.status(201).json(accRequest);
        }
        else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }

    });

}

exports.getAccountRequest = function (req, res) {
    var requestId = req.params.requestId;


    var basePath = apigee.getVariable(req, 'appBasePath');
    var apikey = apigee.getVariable(req, 'apikey');
    var tppId = req.query.tppId;

    var options = {
        url: basePath + "/accountsrequests/"+requestId,
        json: true,
        qs:
        {
            "x-apikey": apikey
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (body.entities && body.entities.length > 0) {
                if (body.entities[0].TppId && body.entities[0].TppId != tppId) {
                    var errJson = {};
                    errJson.ErrorResponseCode = 403;
                    errJson.ErrorDescription = "UnAuthorized Access"
                    res.status(403).json(errJson);

                }

                else {
                    var accRequest = {};
                    accRequest.Data = {};
                    accRequest.Data.AccountRequestId = body.entities[0].uuid;
                    accRequest.Data.Status = body.entities[0].Status;
                    if (body.entities[0].CreationDateTime) 
                    {
                        accRequest.Data.CreationDateTime = new Date(body.entities[0].CreationDateTime).toISOString();
                    }
                    
                    accRequest.Data.Permissions = body.entities[0].Data.Permissions;
                    if (body.entities[0].Data.ExpirationDateTime) {
                        accRequest.Data.ExpirationDateTime = new Date(body.entities[0].Data.ExpirationDateTime).toISOString();
                    }
                    if (body.entities[0].Data.TransactionFromDateTime) {
                        accRequest.Data.TransactionFromDateTime = new Date(body.entities[0].Data.TransactionFromDateTime).toISOString();
                    }
                    if (body.entities[0].Data.TransactionToDateTime) {
                        accRequest.Data.TransactionToDateTime = new Date(body.entities[0].Data.TransactionToDateTime).toISOString();
                    }
                    accRequest.Risk = body.entities[0].Risk;
                    accRequest.Links = {};
                    accRequest.Links.self = "/account-requests/" + accRequest.Data.AccountRequestId;
                    accRequest.Meta = {};


                    res.json(accRequest);
                }
            }
            else {
                var errJson = {};
                errJson.ErrorResponseCode = 400;
                errJson.ErrorDescription = "Bad Request";
                res.status(400).json(errJson);
            }

        } else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(404).json(errJson);
        }
    });


};

exports.updateAccountRequest = function (req, res) {
    var basePath = apigee.getVariable(req, 'appBasePath');
    var apikey = apigee.getVariable(req, 'apikey');
    var requestId = req.params.requestId;
    var requestPayload = apigee.getVariable(req, 'request.content');
    requestPayload = JSON.parse(requestPayload);

    var options = {
        url: basePath + "/accountsrequests/"+requestId,
        method: "PUT",
        headers: {'content-type': 'application/json'},
        body: requestPayload,
        qs:
        {
           "x-apikey": apikey 
        },
        json: true
    };

    request(options, function (err, resp, body) {
        if (!err && (resp.statusCode == 200 ) && body) {
            var accRequest = {};
            accRequest.Data = {};
            accRequest.Data.AccountRequestId = body.uuid;
            accRequest.Data.Status = body.Status;
            if (body.CreationDateTime) 
            {
                accRequest.Data.CreationDateTime = new Date(body.CreationDateTime).toISOString();
            }
            
            accRequest.Data.Permissions = body.Data.Permissions;
            if (body.Data.ExpirationDateTime) {
                accRequest.Data.ExpirationDateTime = new Date(body.Data.ExpirationDateTime).toISOString();
            }
            if (body.Data.TransactionFromDateTime) {
                accRequest.Data.TransactionFromDateTime = new Date(body.Data.TransactionFromDateTime).toISOString();
            }
            if (body.Data.TransactionToDateTime) {
                accRequest.Data.TransactionToDateTime = new Date(body.Data.TransactionToDateTime).toISOString();
            }
            accRequest.Risk = body.Risk;
            accRequest.Links = {};
            accRequest.Links.self = "/account-requests/" + accRequest.Data.AccountRequestId;
            accRequest.Meta = {};

            res.json(accRequest);
        }
        else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }

    });
}

exports.deleteAccountRequest = function (req, res) {
    if (!req.params || !req.params.requestId || req.params.requestId == null || req.params.requestId == "") {
        var errJson = {};
        errJson.ErrorResponseCode = 400;
        errJson.ErrorDescription = "Bad Request";
        res.status(400).json(errJson);
    }
    var requestId = req.params.requestId;

    var basePath = apigee.getVariable(req, 'appBasePath');
    var apikey = apigee.getVariable(req, 'apikey');

    var options = {
        method: "DELETE",
        url: basePath + "/accountsrequests/"+requestId,
        qs:
        {
           "x-apikey": apikey 
        }
    };

    request(options, function (error, response, body) {
        body = JSON.parse(body);
        if (!error && (response.statusCode == 204 || response.statusCode == 200)) {
            res.status(204).send();

        }
        else if (response.statusCode = 404) {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }
        else {
            var errJson = {};
            errJson.ErrorResponseCode = 400;
            errJson.ErrorDescription = "Bad Request";
            res.status(400).json(errJson);
        }
    });
};

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};


function getDataForAllAccounts(baasCollection, req, res, cb) {
    var basePath = apigee.getVariable(req, 'appBasePath');
    var apikey = apigee.getVariable(req, 'apikey');
    
    if (!req.query || !req.query.accountsList) {

        var errJson = {};
        errJson.ErrorResponseCode = 400;
        errJson.ErrorDescription = "Empty Account List";
        res.status(400).json(errJson);
    }
    var cursor = req.query.pageHint;
    var limit = req.query.limit;
    var currentCursor = null;
    var accountIds = JSON.parse(req.query.accountsList);
    var index = 0;
    var currentLimit = limit;
    var data = {}
    entities = [];
    var token = "";
    var options1;
    var customCursor = "nextpage";
    
    
    if(!currentLimit)
    {
        currentLimit = 50;
    }
    if(cursor)
    {
         var cursorArray = cursor.split("::");
         if(cursorArray.length == 2 )
         {
            // start from specified account number
            var newAccounts = [];
            for(var i=0;i<accountIds.length;i++)
            {
                newAccounts.push(""+ accountIds[i] );
            }
            index = newAccounts.indexOf(cursorArray[0]);
            currentCursor = cursorArray[1];
            // if no DB cursor, donot apply
            if(cursorArray[1] == customCursor)
            {
                currentCursor = null;
            }
         }
    }
    var options = {
        url: basePath + "/" + baasCollection,
        qs:
        {
           ql:  "WHERE AccountId=",
           "x-apikey": apikey
        },
        json: true
    };
    var endData = false;
    console.log("all good");
    if (accountIds.length > 0) 
    {

        console.log("length more")
        options1 = options;
        var firstRequest = true;



        syncLoop(accountIds.length, function(loop){
                var j = index;
                options1.qs.ql = "WHERE AccountId="+ "'" + accountIds[j] + "'";
                options1.qs.limit = currentLimit;
                // only for first request, use the cursor;
                if(firstRequest && currentCursor)
                {
                   options1.qs.cursor = currentCursor;
                   firstRequest = false;
                }
                else
                {
                    options1.qs.cursor = null;
                }
                request(options1, function (error, response, body) 
                {
                index++;
                if (!error && response.statusCode == 200 && body.entities) 
                {
                    console.log("indexl"+index);
                    entities = entities.concat(body.entities);
                    currentLimit = currentLimit - body.entities.length;
                    // if limit gets over of no more list of accounts
                    if((currentLimit <=0) || (index == accountIds.length) )
                    {
                        endData = true;
                        data.entities = entities;
                        // if no more results for current account, set cursor to next account 
                        if(!body.cursor)
                        {
                           if(accountIds[j+1])
                           {
                            data.cursor = accountIds[j+1] + "::" + customCursor; 
                           }
                        }
                        // if more results for current account
                        else
                        {
                         token = "" + accountIds[j] + "::" + body.cursor;  
                         data.cursor = token;
                        }
                        cb(data);
                    }
                    else
                    {
                        loop.next();
                    }
                    
                }
                else
                {
                    cb(null);
                }
                
            });
            
        }, null);
    
    }
    else
    {
      console.log("in else loop");
      cb(data);  
    }
}

function getOptionsJsonForAccount(baasCollection, req) {
    var accountNumber = req.params.accountNumber;
    var cursor = req.query.pageHint;
    var limit = req.query.limit;

    var basePath = apigee.getVariable(req, 'appBasePath');
    var apikey = apigee.getVariable(req, 'apikey');

    var options = {
        url: basePath + "/" + baasCollection ,
        qs:{
        ql: "WHERE AccountId='" + accountNumber + "'",
        "x-apikey": apikey
        },
        json: true
    };
    if (cursor) {
        options.qs.cursor = cursor;
    }
    if (limit) {
        options.qs.limit = limit;
    }

    return options;
}


function syncLoop(iterations, process, exit){
    var index = 0,
        done = false,
        shouldExit = false;
    var loop = {
        next:function(){
            if(done){
                if(shouldExit && exit){
                    return exit(); // Exit if we're done
                }
            }
            // If we're not finished
            if(index < iterations){
                index++; // Increment our index
                process(loop); // Run our process, pass in the loop
            // Otherwise we're done
            } else {
                done = true; // Make sure we say we're done
                if(exit) exit(); // Call the callback on exit
            }
        },
        iteration:function(){
            return index - 1; // Return the loop number we're on
        },
        break:function(end){
            done = true; // End the loop
            shouldExit = end; // Passing end as true means we still call the exit callback
        }
    };
    loop.next();
    return loop;
}