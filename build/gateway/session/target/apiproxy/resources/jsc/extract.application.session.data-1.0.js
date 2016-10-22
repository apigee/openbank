/* 
 * Parse the application session data (JSON String) from 'application-session-cache'
 * 
 * 
 * extract.application.session.data-1.0.js
*/

var sessionData;
var sessionDataAsJson;
var transactionInfo={};

// Get application session data (string)
sessionData = context.getVariable("transaction.session.Payload");
// JSON string to JSON object for easy manipulation of session data 
sessionDataJson = JSON.parse(sessionData);

// build the transaction info json object
buildTransactionInfoObject("applicationname", sessionDataJson.applicationname);
buildTransactionInfoObject("applicationdesc", sessionDataJson.applicationdesc);
buildTransactionInfoObject("applicationid",sessionDataJson.applicationid);
buildTransactionInfoObject("redirect_uri", sessionDataJson.redirect_uri);
buildTransactionInfoObject("scope",sessionDataJson.scope);
buildTransactionInfoObject("acr_values",sessionDataJson.acr_values);
buildTransactionInfoObject("nonce", sessionDataJson.nonce);
buildTransactionInfoObject("tandcs", sessionDataJson.tandcs);
buildTransactionInfoObject("state",sessionDataJson.req_state);
buildTransactionInfoObject("display",sessionDataJson.display);
buildTransactionInfoObject("prompt",sessionDataJson.prompt);
buildTransactionInfoObject("offline",sessionDataJson.offline);
buildTransactionInfoObject("id_token_hint",sessionDataJson.id_token_hint);
buildTransactionInfoObject("login_hint",sessionDataJson.login_hint);
buildTransactionInfoObject("ui_locales",sessionDataJson.ui_locales);
buildTransactionInfoObject("to",sessionDataJson.account_number);
buildTransactionInfoObject("amount",sessionDataJson.amount);
buildTransactionInfoObject("currency",sessionDataJson.currency);


// create a flow variable
context.setVariable("transactionInfoResponse", JSON.stringify(transactionInfo));

function buildTransactionInfoObject(attribute, claim){
	if (claim!=null && claim!=""){
		transactionInfo[attribute]=claim;
	}

} 