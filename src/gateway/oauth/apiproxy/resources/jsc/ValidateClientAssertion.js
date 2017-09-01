var jws = new KJUR.jws.JWS();


var isValid = false;
var alg = ['RS256']; // algorithm to sign - if unsecured jwt then use 'none'

var applicationPublicKey = context.getVariable("verifyapikey.Authorize-Client-Application.publicKey");

var clientId = context.getVariable("clientId");
var jwt = context.getVariable("jwt");

isValid = KJUR.jws.JWS.verifyJWT(jwt, applicationPublicKey, {alg: alg, gracePeriod: 0, client_id: clientId});

var errorJson = {};
errorJson.isError = true;
errorJson.errorResponseCode = 400;
errorJson.errorDescription = "The request JWT is invalid, unknown, or malformed";

if (!isValid) {
    context.setVariable("isError", errorJson.isError);
    context.setVariable("errorResponseCode", errorJson.errorResponseCode);
    context.setVariable("errorDescription", errorJson.errorDescription);
}
else {
    var clientSecret = context.getVariable("verifyapikey.Authorize-Client-Application.client_secret");
    context.setVariable("clientIdSecret", Base64.encode(clientId + ":" + clientSecret));
}
