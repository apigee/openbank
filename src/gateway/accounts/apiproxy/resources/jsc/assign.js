//context.setVariable("AccountRequestId","b6067916-4751-11e7-aa3d-0ad881f403bf");

var proxyPathSuffix = context.getVariable('proxy.pathsuffix');
var pathlist = ['balance','transactions','beneficiaries','standing-orders','direct-debits'];

proxyPathSuffix = proxyPathSuffix.split("/");
doVerification = false;
if(pathlist.indexOf(proxyPathSuffix[1]) >=0 || pathlist.indexOf(proxyPathSuffix[2]) >=0  )
{
    doVerification = true;

}

context.setVariable("doVerification",doVerification);