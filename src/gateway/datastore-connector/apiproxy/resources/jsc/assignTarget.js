var query = unescape(context.getVariable("request.querystring")).split("&");
var verb = context.getVariable('request.verb');
var proxyPathSuffix = context.getVariable('proxy.pathsuffix');

context.setVariable('target.copy.pathsuffix', false);
context.setVariable('target.copy.queryparams', false);
context.setVariable("statusCode",200);
var pathTokens = proxyPathSuffix.split('/');
var pathSuffix = '';

var kind = pathTokens[1];
var id = pathTokens[2];

var isError = false;
var errorDescription = "";
if(pathTokens.length < 2 || pathTokens.length >3 )
{
    isError = true;
    errorDescription = "Invalid path";
}
else
{
    context.setVariable("kind",pathTokens[1]);
    context.setVariable("id",pathTokens[2]);
    
    if(verb == "POST")
    {
        context.setVariable("create","true");
        context.setVariable("statusCode",201)
    }
    else if(verb == "GET")
    {
        context.setVariable("read","true");
        context.setVariable("statusCode",200)
    }
    else if(verb == "PUT")
    {
        context.setVariable("update","true");
        context.setVariable("statusCode",200)
    }
    else if(verb == "DELETE")
    {
        context.setVariable("delete","true");
        context.setVariable("statusCode",200);
    }
}
context.setVariable("originalRequestVerb", verb);
context.setVariable("isError",isError);
context.setVariable("errorDescription",errorDescription);


