var transferResponse = context.getVariable('CompleteTransferResponse.content');
transferResponse = JSON.parse(transferResponse);
var redirectUri = transferResponse.application_tx_response;
var requestHeaderAccept = context.getVariable('requestHeaderAccept');

var res;

if (redirectUri != "" && redirectUri != null) {
  context.setVariable('status_code', "200");
  if (requestHeaderAccept.toLowerCase() == "application/javascript") {
    res = "function transfer(){ return { \"application_tx_response\":\"" + redirectUri + "\"} }";
    context.setVariable('resData', res);
  } else {
    res = "{ \"application_tx_response\":\"" + redirectUri + "\"}";
    context.setVariable('resData', res);

  }
} else {
  context.setVariable('status_code', "400");
  if (requestHeaderAccept.toLowerCase() == "application/javascript") {
    res = "function transfer(){ return { \"error\":\"" + transferResponse.error + "\", \"error_description\":\"" + transferResponse.error_description + "\"} }";
    context.setVariable('resData', res);
  } else {
    res = "{\"error\":\"" + transferResponse.error + "\", \"error_description\":\"" + transferResponse.error_description + "\"}";
    context.setVariable('resData', res);
  }
}
