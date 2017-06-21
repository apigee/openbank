var bodyParser = require('body-parser');

var express = require('express');
var app = express();

app.use(bodyParser.json());

var accounts = require("./accounts.js");

app.get('/', accounts.getAccountsOfCustomer);
app.get('/transactions', accounts.getAccountsTransactionOfCustomer);
app.get('/balance', accounts.getAccountsBalanceOfCustomer);
app.get('/beneficiaries', accounts.getAccountsBeneficiariesOfCustomer);
app.get('/standing-orders', accounts.getStandingOrdersOfCustomer);
app.get('/direct-debits', accounts.getDirectDebitsOfCustomer);


app.post('/accounts-requests', accounts.createAccountRequest);
app.get('/accounts-requests/:requestId', accounts.getAccountRequest);
app.put('/accounts-requests/:requestId', accounts.updateAccountRequest);
app.delete('/accounts-requests/:requestId', accounts.deleteAccountRequest);



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
app.get('/:accountNumber/beneficiaries', accounts.getAccountBeneficiaries);
app.get('/:accountNumber/standing-orders', accounts.getAccountStandingOrders);
app.get('/:accountNumber/direct-debits', accounts.getAccountDirectDebits);

/*
 *  GET /acr:token/transactions
 *  GET Transaction of an Account
 */
app.get('/:accountNumber/transactions', accounts.getAccountTransaction);
app.get('/:accountNumber/transactions/:transactionId', accounts.getAccountTransaction);

/*
* POST /validate
*/
app.post('/validate', accounts.validate);

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
