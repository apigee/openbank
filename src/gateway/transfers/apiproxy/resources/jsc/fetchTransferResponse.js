var transferResponse=context.getVariable('CompleteTransferResponse.content');
transferResponse = JSON.parse(transferResponse);
var redirectUri=transferResponse.application_tx_response;
var requestHeaderAccept = context.getVariable('requestHeaderAccept');

if(redirectUri!="" && redirectUri !=null)
{
    context.setVariable('status_code',"200");
    if(requestHeaderAccept.toLowerCase()=="application/javascript")
        {var res="function transfer(){ return { application_tx_response:"+redirectUri+"} }";
    context.setVariable('resData',res);
}
else
{

    var res = "{ application_tx_response:"+redirectUri+"}";
    context.setVariable('resData',res);

}
}
else
{
    context.setVariable('status_code',"400");
    if(requestHeaderAccept.toLowerCase()=="application/javascript")
        {var res="function transfer(){ return { error:"+transferResponse.error+", error_description:"+transferResponse.error_description+"} }";
    context.setVariable('resData',res);
}
    else
    {
        var res = "{error:"+transferResponse.error+", error_description:"+transferResponse.error_description+"}";
        context.setVariable('resData',res);
    }
}
