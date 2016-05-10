context.setVariable('target.copy.pathsuffix', false);

var proxyPathSuffix = context.getVariable('proxy.pathsuffix');
var pathTokens = proxyPathSuffix.split('/');
var pathSuffix = '/info';

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
            break;
        case 'transactions':
            pathSuffix = '/transactions';
            break;
    }

    if (pathTokens[2] === 'transactions' && pathTokens[3]) {
        pathSuffix += '/' + pathTokens[3];
    }
} catch (err) {
    console.log('Error occurred : ' + JSON.stringify(err));
} finally {
    context.setVariable('pathSuffix', pathSuffix);
}
