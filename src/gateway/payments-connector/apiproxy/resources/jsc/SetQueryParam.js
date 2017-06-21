var proxyPathSuffix = context.getVariable('proxy.pathsuffix');
var querystatement = "where name='";


var pathTokens = proxyPathSuffix.split("/");
if(pathTokens[2])
{
    querystatement += pathTokens[2];
}
querystatement += "'";
context.setVariable("querystatement",querystatement);