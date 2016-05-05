/* 
 * Construct response based on /authorize response_type parameter
 * 
 * construct.response-1.0.js
*/

var application_uri;
var state;
var id_token
var access_token;
var code;
var expires;
var token_type;
var response_type_token;
var response_type_code;
var response_type_id_token;

application_uri = context.getVariable("redirect_uri");
state = context.getVariable("req_state");
id_token = context.getVariable("id_token");
access_token = context.getVariable("apigee.access_token");
code = context.getVariable("oauthv2authcode.Generate-Authorization-Code.code");
expires = context.getVariable("oauthv2accesstoken.Security-Generate-Access-Token-Implicit.expires_in");
token_type = context.getVariable("token_type");

response_type_token = context.getVariable("response_type_token");
response_type_code = context.getVariable("response_type_code");
response_type_id_token = context.getVariable("response_type_id_token");

// Based on the response_type construct the application response
// if the response_type contains id_token or token then add a "#" else add a "?"
// if((response_type_id_token=="true") || (response_type_token=="true"))
// 	application_uri = application_uri + "#";    
// else
application_uri = application_uri + "?";
application_uri = application_uri + "state=" + state;


if(response_type_id_token=="true"){
  application_uri = application_uri + "&id_token=" + id_token;
}

if(response_type_token=="true"){
  application_uri = application_uri + "&access_token=" + access_token;
  application_uri = application_uri + "&expires=" + expires;
  application_uri = application_uri + "&token_type=" + token_type;
}

if(response_type_code=="true"){
  application_uri = application_uri + "&code=" + code;
}

context.setVariable("application_uri", application_uri);
