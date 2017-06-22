context.setVariable('target.copy.pathsuffix', false);
var proxyPathSuffix = context.getVariable('proxy.pathsuffix');
var Suffix = "";
if(proxyPathSuffix.indexOf("payment-submissions") >= 0)
{
    Suffix = "paymentsubmissions";
}
else
{
    Suffix = "paymentsrequests";
}


var pathTokens = proxyPathSuffix.split("/");
if(pathTokens[2])
{
    Suffix += "/" + pathTokens[2];
}

context.setVariable("Suffix",Suffix);