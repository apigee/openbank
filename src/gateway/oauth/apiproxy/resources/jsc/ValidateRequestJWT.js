var jws = new KJUR.jws.JWS();

var isValid = false;
var alg = ['RS256']; // algorithm to sign - if unsecured jwt then use 'none'

var jwt = context.getVariable("request.queryparam.request");
var scope = context.getVariable("scope");
var state = context.getVariable("requestState");
var nonce = context.getVariable("nonce");
var clientId = context.getVariable("clientId");
var redirectUri = context.getVariable("redirectUri");
var responseType = context.getVariable("responseType");

var scopesXML = context.getVariable("AccessEntity.Get-API-Product-Scopes.ApiProduct.Scopes"); // scope from API Products
var applicationRedirectionUris = context.getVariable("verifyapikey.Authorize-Client-Application.redirection_uris"); // callback_uri defined in developer application configuration
var applicationName = context.getVariable("verifyapikey.Authorize-Client-Application.app.name");
var applicationDesc = context.getVariable("verifyapikey.Authorize-Client-Application.app.applicationdesc");
var tandcs = context.getVariable("verifyapikey.Authorize-Client-Application.tandcs");
var applicationId = context.getVariable("verifyapikey.Authorize-Client-Application.app.id");
var applicationPublicKey = context.getVariable("verifyapikey.Authorize-Client-Application.publicKey");
var tppId = context.getVariable("verifyapikey.Authorize-Client-Application.tppId");

var key = applicationPublicKey;

jws.parseJWS(jwt);
//key = rstrtohex(key);
isValid = KJUR.jws.JWS.verifyJWT(jwt, key, {
    alg: alg,
    responseType: responseType,
    clientId: clientId,
    state: state,
    scope: scope,
    nonce: nonce,
    //aud: ['http://foo.com'], // aud: 'http://foo.com' is fine too.
    //jti: 'id123456',
    gracePeriod: 0  // accept 1 hour slow or fast
});
var errorJson = {};
errorJson.isError = true;
errorJson.errorResponseCode = 400;
errorJson.errorDescription = "The request JWT is invalid, unknown, or malformed";
if (!validateScopes(scopesXML, scope)) {
    isValid = false;
    errorJson.errorDescription = "Application doesnt have access to requested scope";
}
var payload = JSON.parse(jws.parsedJWS.payloadS);
if (payload.redirectUri != redirectUri || applicationRedirectionUris.indexOf(redirectUri) === -1) {
    isValid = false;
    errorJson.errorDescription = "RedirectUri queryparam doesnt match Request Token";
}
if (!validateClaims(payload.claims, scope)) {
    isValid = false;
    errorJson.errorDescription = "The request JWT has invalid claims";
}

if (!isValid) {
    context.setVariable("isError", errorJson.isError);
    context.setVariable("errorResponseCode", errorJson.errorResponseCode);
    context.setVariable("errorDescription", errorJson.errorDescription);
} else {
    context.setVariable("tandcs", tandcs);
    context.setVariable("applicationName", applicationName);
    context.setVariable("applicationId", applicationId);
    context.setVariable("applicationDesc", applicationDesc);
    context.setVariable("tppId", tppId);
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


function validateClaims(claims, scope) {

    var intent;
    print(claims);
    if (claims && claims.id_token) {
        if (claims.id_token.openbanking_intent_id) {
            intent = claims.id_token.openbanking_intent_id;
        }
        else if (claims.id_token[0].openbanking_intent_id) {
            intent = claims.id_token[0].openbanking_intent_id;
        }
    }
    var scopeAvailable = false;
    if (intent) {
        var intentId = intent.value;
        var intentURN = intentId.split(":");
        var neededScope = intentURN[3];
        var requestId = intentURN[4];
        var receivedScopes = scope.split(" ");


        for (var i in receivedScopes) {
            if (receivedScopes[i] == neededScope) {
                scopeAvailable = true;
            }
        }
        if (receivedScopes.length == 1 && receivedScopes[0] == "openid") {
            scopeAvailable = true;
        }
        context.setVariable("requestId", requestId);
        context.setVariable("type", neededScope);
    }

    return scopeAvailable;

}