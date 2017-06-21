/* 
 * Validate the authorize request from query or body parameter
 * 		1.	Check for empty client_id
 *		2.	Validate response_type parameter - http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html
 *		3.	Validate scope
 *		4.	Check for empty redirect_uri parameter
 *		5.	Check for empty state parameter
 * validate-request-1.0.js (c) 2010-2015 @Apigee
 */

var verb = context.getVariable("request.verb");

var response_type = null;
var scope = null;
var client_id = null;
var redirect_uri = null;
var state = null;
var nonce = null;
var request_id = null;
var acr_values = null;


if (verb == "POST") {
    response_type = context.getVariable("request.formparam.response_type");
    scope = context.getVariable("request.formparam.scope");
    client_id = context.getVariable("request.formparam.client_id");
    redirect_uri = context.getVariable("request.formparam.redirect_uri");
    state = context.getVariable("request.formparam.state");
    nonce = context.getVariable("request.formparam.nonce");
    request_id  = context.getVariable("request.formparam.request_id");
    acr_values = context.getVariable("request.formparam.acr_values");

}

if (verb == "GET") {
    response_type = context.getVariable("request.queryparam.response_type");
    scope = context.getVariable("request.queryparam.scope");
    client_id = context.getVariable("request.queryparam.client_id");
    redirect_uri = context.getVariable("request.queryparam.redirect_uri");
    state = context.getVariable("request.queryparam.state");
    nonce = context.getVariable("request.queryparam.nonce");
    request_id = context.getVariable("request.queryparam.request_id");
    acr_values = context.getVariable("request.queryparam.acr_values");
    
}

if (isEmptyOrNull(client_id)) {
    context.setVariable("error_type", "invalid_client");
    context.setVariable("error_variable", "Unknown client_id.");
    context.setVariable("status_code", "401");

}
if (isEmptyOrNull(response_type)) {
    context.setVariable("error_type", "invalid_request");
    context.setVariable("error_variable", "The request is missing a required parameter: response_type");
    context.setVariable("status_code", "400");

} else if (isEmptyOrNull(redirect_uri)) {
    context.setVariable("error_type", "invalid_request");
    context.setVariable("error_variable", "The request is missing a required parameter: redirect_uri");
    context.setVariable("status_code", "400");

} else if (isEmptyOrNull(state)) {
    context.setVariable("error_type", "invalid_request");
    context.setVariable("error_variable", "The request is missing a required parameter: state");
    context.setVariable("status_code", "400");

} else if (isEmptyOrNull(acr_values)) {
    context.setVariable("error_type", "invalid_request");
    context.setVariable("error_variable", "The request is missing a required parameter: acr_values");
    context.setVariable("status_code", "400");

} else if (isEmptyOrNull(scope)) {
    context.setVariable("error_type", "invalid_request");
    context.setVariable("error_variable", "The request is missing a required parameter: scope");
    context.setVariable("status_code", "400");
    
} else if (isEmptyOrNull(request_id) && scope.indexOf("openid")==-1) {
    context.setVariable("error_type", "invalid_request");
    context.setVariable("error_variable", "The request is missing a required parameter: request_id");
    context.setVariable("status_code", "400");

}
else {
    context.setVariable("redirect_uri", redirect_uri);
    context.setVariable("scope", scope);
    context.setVariable("response_type", response_type);
    context.setVariable("client_id", client_id);
    context.setVariable("state", state);
    context.setVariable("req_state", state);
    context.setVariable("nonce", nonce);
    context.setVariable("request_id", request_id);
    context.setVariable("acr_values", acr_values);
    
    if (!parseResponseType(response_type)) {
        context.setVariable("error_type", "unsupported_response_type");
        context.setVariable("error_variable", "The authorization server does not support: response_type");
        context.setVariable("status_code", "400");
    }
}


/**
 * Check if a given element is null/empty
 *
 * @param {String} element
 * @return {boolean}
 */

function isEmptyOrNull(element) {

    if ((element == null) || (element == ""))
        return true;
    else
        return false;
}


/**
 * Parse response_type. OpenId connect can support multiple response_type
 * for more information - http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html
 * for e.g. a combination of code, token and id_token.
 * This will be used to conditionally execute GenerateIDToken, AuthorizationCode & AccessToken policies
 * @param {String} responseType - Space separated string e.g."code id_token token"
 *
 * @return void
 */
function parseResponseType(responseType) {
    var responseTypes = responseType.split(" ");
    var response_type_code = false;
    var response_type_token = false;
    var bStatus = false;
    var errorResponseSymbol = "?";

    for (var j = 0; j < responseTypes.length; j++) {
        if (responseTypes[j] == "code") {
            response_type_code = true;
            bStatus = true;
        }
        else if (responseTypes[j] == "token") {
            response_type_token = true;
            bStatus = true;
        }
    }
    if (response_type_token == true) {
        errorResponseSymbol = "#";
    }

    context.setVariable("error_response_symbol", errorResponseSymbol);
    context.setVariable("response_type_token", response_type_token);
    context.setVariable("response_type_code", response_type_code);
    return bStatus;
}