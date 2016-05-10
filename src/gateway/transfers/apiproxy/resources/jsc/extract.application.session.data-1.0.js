/* 
 * Parse the application session data (JSON String) from 'application-session-cache'
 * 
 * 
 * extract.application.session.data-1.0.js
*/

var sessionData;
var sessionDataAsJson;

// Get application session data (string)
sessionData = context.getVariable("session.Payload");
// JSON string to JSON object for easy manipulation of session data 
sessionDataJson = JSON.parse(sessionData);

var requestPayload = context.getVariable("request.content");
requestPayload = JSON.parse(requestPayload);

// Set flow variables 
// context.setVariable("response_type_token",sessionDataJson.response_type_token);
// context.setVariable("response_type_code",sessionDataJson.response_type_code);
// context.setVariable("response_type_id_token",sessionDataJson.response_type_id_token);
context.setVariable("nonce",sessionDataJson.nonce);
context.setVariable("redirect_uri",sessionDataJson.redirect_uri);
context.setVariable("client_id",sessionDataJson.client_id);
context.setVariable("apigee.client_id",sessionDataJson.client_id);
context.setVariable("req_state",sessionDataJson.req_state);
context.setVariable("scope",sessionDataJson.scope);
context.setVariable("acr_values",sessionDataJson.acr_values);

context.setVariable("customer_id",requestPayload.customerId);
context.setVariable("account_number",requestPayload.account_number);

context.setVariable("type",sessionDataJson.type);
// context.setVariable("account_number",sessionDataJson.account_number);
context.setVariable("remote_bic",sessionDataJson.remote_bic);
context.setVariable("remote_IBAN",sessionDataJson.remote_IBAN);
context.setVariable("remote_name",sessionDataJson.remote_name);
context.setVariable("amount",sessionDataJson.amount);
context.setVariable("currency",sessionDataJson.currency);
context.setVariable("subject",sessionDataJson.subject);
context.setVariable("booking_code",sessionDataJson.booking_code);
context.setVariable("booking_date",sessionDataJson.booking_date);
context.setVariable("value_date",sessionDataJson.value_date);

