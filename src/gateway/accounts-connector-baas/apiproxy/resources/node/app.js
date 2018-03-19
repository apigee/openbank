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
 * app.js
 * Entry point for the node application to run.
 */
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

app.use(bodyParser.json());

var accounts = require("./accounts.js");

app.get('/accounts', accounts.getAccountsOfCustomer);
app.get('/transactions', accounts.getAccountsTransactionOfCustomer);
app.get('/balances', accounts.getAccountsBalanceOfCustomer);
app.get('/beneficiaries', accounts.getAccountsBeneficiariesOfCustomer);
app.get('/standing-orders', accounts.getStandingOrdersOfCustomer);
app.get('/direct-debits', accounts.getDirectDebitsOfCustomer);

app.get('/accounts/:accountNumber', accounts.getAccountInfo);
app.get('/accounts/:accountNumber/balances', accounts.getAccountBalance);
app.get('/accounts/:accountNumber/beneficiaries', accounts.getAccountBeneficiaries);
app.get('/accounts/:accountNumber/standing-orders', accounts.getAccountStandingOrders);
app.get('/accounts/:accountNumber/direct-debits', accounts.getAccountDirectDebits);
app.get('/accounts/:accountNumber/transactions', accounts.getAccountTransaction);
app.get('/accounts/:accountNumber/product', accounts.getAccountProducts);


app.get('/account-requests/:requestId', accounts.getAccountRequest);
app.put('/account-requests/:requestId', accounts.updateAccountRequest);
app.delete('/account-requests/:requestId', accounts.deleteAccountRequest);
app.post('/account-requests', accounts.createAccountRequest);


app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
