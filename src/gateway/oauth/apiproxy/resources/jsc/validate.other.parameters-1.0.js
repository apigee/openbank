/* 
 * validate.other.parameters-1.0.js script validates the following: 
 * 		1.	scopes in /authorize request against scopes defined in API Products
 *		2.	redirect_uri in /authorize request against callback_uri defined in developer application configuration
 *
 * validate.other.parameters-1.0.js (c) 2015 @Apigee
 */

var jws = new KJUR.jws.JWS();

var isValid = false;
var alg = 'HS256'; // algorithm to sign - if unsecured jwt then use 'none'
var key = null;
var payload = null;
var head = null;
var parsedPayload = null;
var parsedHead = null;
// other parameters - JWT from request, redirect_uri from request, consumer_secret and registered application callback_uri
var jwt = context.getVariable("request_jws");
var password = context.getVariable("oauthv2client.Security-AuthorizeGet-Client-Attributes.client_secret");

var verb = context.getVariable("request.verb");
var scope = context.getVariable("scope");
var client_id = context.getVariable("client_id");
var redirect_uri = context.getVariable("redirect_uri");

var state = null;
var nonce = null;
var display = null;
var login_hint = null;
var prompt = null;
var offline = null;
var id_token_hint = null;
var ui_locales = null;

var scopesXML = context.getVariable("AccessEntity.Get-API-Product-Scopes.ApiProduct.Scopes"); // scope from API Products
var applicationRedirectionUris = context.getVariable("verifyapikey.Authorize-Client-Application.redirection_uris").split(','); // callback_uri defined in developer application configuration
var applicationname = context.getVariable("verifyapikey.Authorize-Client-Application.app.name");
var applicationdesc = context.getVariable("verifyapikey.Authorize-Client-Application.app.applicationdesc");
var tandcs = context.getVariable("verifyapikey.Authorize-Client-Application.tandcs");
var applicationid = context.getVariable("verifyapikey.Authorize-Client-Application.app.id");

context.setVariable("jwt-error", "");
context.setVariable("jwt-is-valid", isValid);
context.setVariable("jwt-payload", "{}");
context.setVariable("jwt-head", "{}");
context.setVariable("jwt-is-active", "n/a");
context.setVariable("jwt-is-expired", "n/a");

if (verb == "POST") {
    state = context.getVariable("request.formparam.state");
    nonce = context.getVariable("request.formparam.nonce");
    display = context.getVariable("request.formparam.display");
    login_hint = context.getVariable("request.formparam.login_hint");
    display = context.getVariable("request.formparam.display");
    prompt = context.getVariable("request.formparam.prompt");
    offline = context.getVariable("request.formparam.offline");
    id_token_hint = context.getVariable("request.formparam.id_token_hint");
    ui_locales = context.getVariable("request.formparam.ui-locales");
}

if (verb == "GET") {
    state = context.getVariable("request.queryparam.state");
    nonce = context.getVariable("request.queryparam.nonce");
    display = context.getVariable("request.queryparam.display");
    login_hint = context.getVariable("request.queryparam.login_hint");
    display = context.getVariable("request.queryparam.display");
    prompt = context.getVariable("request.queryparam.prompt");
    offline = context.getVariable("request.queryparam.offline");
    id_token_hint = context.getVariable("request.queryparam.id_token_hint");
    ui_locales = context.getVariable("request.queryparam.ui-locales");
}


if (applicationRedirectionUris.indexOf(redirect_uri) === -1) {
    context.setVariable("error_type", "invalid_redirect_uri");
    context.setVariable("error_variable", "This value must match a URL registered with the Application.");
    context.setVariable("status_code", "400");

}
else if (!validateScopes(scopesXML, scope)) {
    context.setVariable("error_type", "invalid_scope");
    context.setVariable("error_variable", "The requested scope is invalid, unknown, or malformed");
}
else {
    context.setVariable("state", state);
    context.setVariable("req_state", state);
    context.setVariable("nonce", nonce);
    context.setVariable("display", display);
    context.setVariable("login_hint", login_hint);
    context.setVariable("display", display);
    context.setVariable("prompt", prompt);
    context.setVariable("offline", offline);
    context.setVariable("id_token_hint", id_token_hint);
    context.setVariable("offline", offline);
    context.setVariable("ui_locales", ui_locales);
    context.setVariable("tandcs", tandcs);
    context.setVariable("applicationname", applicationname);
    context.setVariable("applicationid", applicationid);
    context.setVariable("applicationdesc", applicationdesc);

    // validate and check for jwt only in payment scenario, not accounts info
    if (scope.split(' ').indexOf('payment') !== -1) {
        if (jwt) {
            jws.parseJWS(jwt);
            key = rstrtohex(password);
            isValid = KJUR.jws.JWS.verify(jwt, key, [alg]);

            // payment token expires in a short time
            context.setVariable('token_timeout', 5 * 60 * 1000);
        } else {
            isValid = false;
        }

        if (isValid) {
            parsedPayload = jws.parsedJWS.payloadS;
            parsedHead = jws.parsedJWS.headS;
            validateJWTPayload(parsedPayload);
            context.setVariable('jwt-is-valid', isValid);
            context.setVariable('jwt-payload', parsedPayload);
            context.setVariable('jwt-head', parsedHead);
        }
        else {
            context.setVariable("error_type", "Invalid_request");
            context.setVariable("error_variable", "Invalid signature");
            context.setVariable("status_code", "500");
        }
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
 *
 * @param {String} scopesXML
 * @param {String} applicationScope
 *
 * @return boolean
 */
function validateScopes(scopesXML, applicationScope) {
    // Convert the scope from application request to Array
    var receivedScopes = applicationScope.split(" ");

    if (scopesXML == null) {
        return false;

    } else {

        // Workaround for e4x
        scopesXML = scopesXML.replace(/^<\?xml\s+version\s*=\s*(["'])[^\1]+\1[^?]*\?>/, "");
        // Create a new xml object from scope xml string
        var Scopes = new XML(scopesXML);

        var lookup = {};
        var scope = Scopes.Scope;
        // Iterate, parse and validate the application scopes against the API Products scopes
        for (var j = 0; j < scope.length(); j++) {
            lookup[scope[j].toString()] = scope[j].toString();
        }

        for (var i in receivedScopes) {
            if (typeof lookup[receivedScopes[i]] != 'undefined') {
            }
            else {
                return false;
            }
        }
        return true;
    }
}

/**
 *
 * @param {String} parsedPayload
 *
 */
function validateJWTPayload(parsedPayload) {
    print("entering");

    if (parsedPayload != null) {
        // JSON string to JSON object for easy manipulation of jwt data
        var jwt = JSON.parse(parsedPayload);
        var client_id = context.getVariable("client_id");
        var state = context.getVariable("req_state");
        var scope = context.getVariable("scope");
        var response_type = context.getVariable("response_type");
        var nonce = context.getVariable("nonce");
        var acr_values = context.getVariable("acr_values");

        if (!verifyJWTData(jwt.client_id, client_id)) {
            context.setVariable("error_type", "invalid_client");
            context.setVariable("error_variable", "This value must match the client_id in request parameter");
            context.setVariable("status_code", "401");
        }
        else if (!verifyJWTData(jwt.state, state)) {
            context.setVariable("error_type", "invalid_state");
            context.setVariable("error_variable", "This value must match the state in request parameter");

        }
        else if (!verifyJWTData(jwt.scope, scope)) {
            context.setVariable("error_type", "invalid_request");
            context.setVariable("status_code", "400");
            context.setVariable("error_variable", "This value must match the scope in request parameter");

        }
        else if (!verifyJWTData(jwt.response_type, response_type)) {
            context.setVariable("error_type", "unsupported_response_type");
            context.setVariable("status_code", "400");
            context.setVariable("error_variable", "This value must match the response_type in request parameter");

        }
        else if (!verifyJWTData(jwt.nonce, nonce)) {
            context.setVariable("error_type", "invalid_request");
            context.setVariable("error_variable", "This value must match the nonce in request parameter");

        }
        else if (!verifyJWTData(jwt.acr_values, acr_values)) {
            context.setVariable("error_type", "invalid_request");
            context.setVariable("error_variable", "This value must match the acr_values in request parameter");
        }
        else if (jwt.hasOwnProperty('claims') && jwt.claims.hasOwnProperty('paymentinfo')) {
            if (jwt.claims.paymentinfo.to.account_number == null || jwt.claims.paymentinfo.to.account_number == "") {
                context.setVariable("error_type", "invalid_request");
                context.setVariable("error_variable", "The request is missing a required parameter: to account number");
                context.setVariable("status_code", "400");
            }
            else if (jwt.claims.paymentinfo.value.amount == null || jwt.claims.paymentinfo.value.amount == "") {
                context.setVariable("error_type", "invalid_request");
                context.setVariable("error_variable", "The request is missing a required parameter: amount");
                context.setVariable("status_code", "400");
            }
            else if (jwt.claims.paymentinfo.value.currency == null || jwt.claims.paymentinfo.value.currency == "") {
                context.setVariable("error_type", "invalid_request");
                context.setVariable("error_variable", "The request is missing a required parameter: currency");
                context.setVariable("status_code", "400");
            }
            else if (jwt.claims.paymentinfo.to.sort_code == null || jwt.claims.paymentinfo.to.sort_code == "") {
                context.setVariable("error_type", "invalid_request");
                context.setVariable("error_variable", "The request is missing a required parameter: sort_code");
                context.setVariable("status_code", "400");
            }
            else if (jwt.claims.paymentinfo.to.IBAN == null || jwt.claims.paymentinfo.to.IBAN == "") {
                context.setVariable("error_type", "invalid_request");
                context.setVariable("error_variable", "The request is missing a required parameter: IBAN");
                context.setVariable("status_code", "400");
            }
            else {
                print("1 " + jwt.claims.paymentinfo.to);
                print("1 " + jwt.claims.paymentinfo.amount);
                context.setVariable("jwt.claims.paymentinfo.to.account_number", jwt.claims.paymentinfo.to.account_number);
                context.setVariable("jwt.claims.paymentinfo.value.amount", jwt.claims.paymentinfo.value.amount);
                context.setVariable("jwt.claims.paymentinfo.to.sort_code", jwt.claims.paymentinfo.to.sort_code);
                context.setVariable("jwt.claims.paymentinfo.value.currency", jwt.claims.paymentinfo.value.currency);
                context.setVariable("jwt.claims.paymentinfo.to.IBAN", jwt.claims.paymentinfo.to.IBAN);
            }
        }
    }
}

/**
 *
 * @param {String} jwtData
 * @param {String} requestData
 *
 * @return boolean
 */
function verifyJWTData(jwtData, requestData) {
    print(jwtData + " " + requestData);
    if (jwtData != requestData)
        return false;

    return true;
} 
