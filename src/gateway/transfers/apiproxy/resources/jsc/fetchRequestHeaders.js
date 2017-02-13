var verb = context.getVariable("request.verb");

var requestHeadersAccept = context.getVariable("request.header.Accept");
var request_account_number;
if (verb === 'GET') 
    request_account_number = context.getVariable("request.queryparam.account_number");
else if (verb === 'POST')
    request_account_number = context.getVariable("request.queryparam.account_number");  
    
var request_grant_type = context.getVariable("request.queryparam.grant_type");
context.setVariable("requestHeaderAccept",requestHeadersAccept);
context.setVariable("requestGrantType",request_grant_type);

if(request_account_number==null || request_account_number=="")
{
    context.setVariable("requestAccNum","");
}
else
{
context.setVariable("requestAccNum",request_account_number);
}

