var reqQuery = context.getVariable("request.querystring");
var query = unescape(reqQuery).split("&");
var queryParamList = ["x-apikey","wheelchair","openingDay","openAt"];
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
var openingDay = context.getVariable("OpeningDay");
var openAt = context.getVariable("OpenAt");
if((!openingDay || openingDay == "") && openAt)
{
    isError = true;
    errorDescription = "Invalid set of query parameters. openAt without openingDay query parameter.";
}

var ql = "WHERE Atm = true";
var wheelchair = context.getVariable("request.queryparams.wheelchair");
if(wheelchair)
{
    ql += " and Wheelchair="+ wheelchair;
}

context.setVariable("request.queryparams.ql",ql);

context.setVariable("isError", isError);
context.setVariable("errorDescription", errorDescription);

context.setVariable("branch",true);