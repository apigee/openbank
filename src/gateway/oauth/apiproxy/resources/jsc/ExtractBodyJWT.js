var sJWT = context.getVariable("request.formparam.client_assertion");
context.setVariable("jwt", sJWT);
var errorJson = {};
errorJson.isError = true;
errorJson.errorResponseCode = 401;
errorJson.errorDescription = "The request JWT is invalid, unknown, or malformed";
var payloadObj;
if (isProperPayload()) {
    context.setVariable("clientId", payloadObj.iss);
} else {
    context.setVariable("isError", errorJson.isError);
    context.setVariable("errorResponseCode", errorJson.errorResponseCode);
    context.setVariable("errorDescription", errorJson.errorDescription);
    //throw 'request JWT is invalid, unknown, or malformed'
}


function isProperPayload() {
    try {
        payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(sJWT.split(".")[1]));
    } catch (e) {
        return false;
    }
    return true;
}