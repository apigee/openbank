var proxyPathSuffix = context.getVariable('proxy.pathsuffix');
var veb = context.getVariable("request.verb");
var pathlist = ['accounts', 'balances', 'transactions', 'beneficiaries', 'standing-orders', 'direct-debits', 'product'];

proxyPathSuffix = proxyPathSuffix.split("/");
var doValidation = false;
print(proxyPathSuffix);
if (proxyPathSuffix.length >= 2) {
    if (pathlist.indexOf(proxyPathSuffix[1]) >= 0 || pathlist.indexOf(proxyPathSuffix[3]) >= 0) {
        doValidation = true;

    }
}
context.setVariable("doValidation", doValidation);