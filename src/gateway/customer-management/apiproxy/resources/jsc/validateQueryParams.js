var reqQuery = context.getVariable("request.querystring");
var query = unescape(reqQuery).split("&");
var queryParamList = ["x-apikey","UserId","ql"];
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
// Mandatory query params for Get Customers.


context.setVariable("isError", isError);
context.setVariable("errorDescription", errorDescription);
