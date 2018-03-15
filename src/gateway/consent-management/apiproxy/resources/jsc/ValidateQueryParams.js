var reqQuery = context.getVariable("request.querystring");
var query = unescape(reqQuery).split("&");
var queryParamList = ["x-apikey","requestId","consentType"];
var isError = false;
var errorDescription = "";
var queryParamArray = [];
if(reqQuery && reqQuery!= "")
{
    for(var i=0; i<query.length; i++)
    {
        var queryName = query[i].split("=")[0];
        var queryValue = query[i].split("=")[1];
        queryParamArray.push(queryName);
        if(queryParamList.indexOf(queryName)<0)
        {
            isError = true;
            errorDescription = "inValid query params";
        }
    }
}

// Mandatory query params for Get Consents.
var verb = context.getVariable("request.verb");
var consentId = context.getVariable("consentId");
var ql = "";
var requestId = context.getVariable("request.queryparam.requestId");
var consentType = context.getVariable("request.queryparam.consentType");
if(!consentId && verb == "GET")
{
    if(!consentType || !requestId)
    {
        isError = true;
        errorDescription = "missing query parameters requestId or consentType ";
    }
    ql +="where RequestId = '"+ requestId + "' and ConsentType = '" + consentType + "'";
    context.setVariable("request.queryparam.ql",ql);
}

context.setVariable("isError", isError);
context.setVariable("errorDescription", errorDescription);
