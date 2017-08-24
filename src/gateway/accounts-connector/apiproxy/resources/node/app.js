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
