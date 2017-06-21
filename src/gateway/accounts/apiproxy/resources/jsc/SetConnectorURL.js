context.setVariable('target.copy.pathsuffix', false);

var proxyPathSuffix = context.getVariable('proxy.pathsuffix');
var pathTokens = proxyPathSuffix.split('/');
var pathSuffix = '';
var account_number;
var accountsList = context.getVariable("accountsList");
//var customer_number = context.getVariable("customer_number"); 
// its not all "accounts of customer " call
if(pathTokens[1] && pathTokens[1] != "transactions" && pathTokens[1] != "balance" && pathTokens[1] !="beneficiaries" && pathTokens[1] != "accounts-requests" && pathTokens[1] != "standing-orders" && pathTokens[1] != "direct-debits" )
{
   pathSuffix = "/info"
   account_number = context.getVariable("account_number");
   account_number = "/" + account_number;
   context.setVariable('account_number', account_number);

}

else if(pathTokens[1] == "accounts-requests" && !pathTokens[2])
{
    account_number = "";
   context.setVariable('account_number', account_number);
   pathSuffix = "/accounts-requests";
}
else if(pathTokens[1] == "accounts-requests" && pathTokens[2])
{
    account_number = "";
   context.setVariable('account_number', account_number);
    pathSuffix = "/accounts-requests/"  + pathTokens[2] ;
}
else
{
    account_number = "";
    context.setVariable('account_number', account_number);
    if( pathTokens[1] == "transactions" || pathTokens[1] == "balance" || pathTokens[1] == "beneficiaries" || pathTokens[1] == "standing-orders" || pathTokens[1] == "direct-debits")
        { 
            pathSuffix +="/" + pathTokens[1]; 
            
            pathSuffix += "?accountsList=" + accountsList;
            
        }
        
    //pathSuffix += "?customerId=" + customer_number;

    
}


/*
 * eg: /acr:token/balance
 * Path tokens
 * [0] -> null
 * [1] -> acr:token | account_number
 * [2] -> null | info | balance | transactions
 * [3] -> [2] == transactions ? transaction_id : null
 * */

try {
    switch (pathTokens[2]) {
        case 'balance':
            pathSuffix = '/balance';
            pathSuffix += "?accountsList=" + accountsList;
            break;
        case 'transactions':
            pathSuffix = '/transactions';
            pathSuffix += "?accountsList=" + accountsList;
            break;
        case 'beneficiaries':
            pathSuffix = '/beneficiaries';
            pathSuffix += "?accountsList=" + accountsList;
            break;
        case 'standing-orders':
            pathSuffix = '/standing-orders';
            pathSuffix += "?accountsList=" + accountsList;
            break;
        case 'direct-debits':
            pathSuffix = '/direct-debits';
            pathSuffix += "?accountsList=" + accountsList;
            break;
    }

    if (pathTokens[2] === 'transactions' && pathTokens[3]) {
        pathSuffix += '/' + pathTokens[3];
    }
} catch (err) {
    print('Error occurred : ' + JSON.stringify(err));
} finally {
    context.setVariable('pathSuffix', pathSuffix);
}


InfoFlowVerified = context.getVariable("InfoFlowVerified");
if(InfoFlowVerified)
{
    pathSuffix += "?accountsList=" + accountsList;
    context.setVariable('pathSuffix', pathSuffix);
}
