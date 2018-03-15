var reqQuery = context.getVariable("request.querystring");
var query = unescape(reqQuery).split("&");
var queryParamList = ["x-apikey","wheelchair","currency","isWithdrawalCharged","status","openingDay","openAt"];
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
var ql = "WHERE Atm = true";
var wheelchair = context.getVariable("request.queryparams.wheelchair");
if(wheelchair)
{
    ql += " and Wheelchair="+ wheelchair;
}

var currency = context.getVariable("request.queryparams.currency");
if(currency)
{
    ql += " and Currency='"+ currency + "'";
}
var isWithdrawalCharged = context.getVariable("request.queryparams.isWithdrawalCharged");
if(isWithdrawalCharged)
{
    ql += " and IsWithdrawalCharged="+ isWithdrawalCharged;
}
var atmStatus = context.getVariable("request.queryparams.status");
if(atmStatus)
{
    ql += " and Status='"+ atmStatus + "'";
}

context.setVariable("request.queryparams.ql",ql);

context.setVariable("isError", isError);
context.setVariable("errorDescription", errorDescription);

context.setVariable("atm",true);