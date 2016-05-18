var express = require('express');
var app = express();

var accounts = require("./accounts.js");

app.get('/', accounts.getAccountsOfCustomer);
/*
 * GET /acr:token/info
 * GET Account Information
 */
app.get('/:accountNumber', accounts.getAccountInfo);
app.get('/:accountNumber/info', accounts.getAccountInfo);

/*
 * GET /acr:token/balance
 * GET Account balance details
 */
app.get('/:accountNumber/balance', accounts.getAccountBalance);

/*
 *  GET /acr:token/transactions
 *  GET Transaction of an Account
 */
app.get('/:accountNumber/transactions', accounts.getAccountTransaction);
app.get('/:accountNumber/transactions/:transactionId', accounts.getAccountTransaction);

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
