var sJWT = context.getVariable("request.formparam.clientAssertion");//"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5vcGVuYmFuay5jb20iLCJyZXNwb25zZVR5cGUiOiJjb2RlIGlkX3Rva2VuIiwiY2xpZW50SWQiOiJRYUpCaE9MVHZGalFXVE85NzA0YVZ5MWNwVkswdEs1TCIsInJlZGlyZWN0VXJpIjoiaHR0cDovL2xvY2FsaG9zdC8iLCJzY29wZSI6Im9wZW5pZCBhY2NvdW50Iiwic3RhdGUiOiJhZjBpZmpzbGRraiIsIm5vbmNlIjoibi0wUzZfV3pBMTIzIiwiY2xhaW1zIjp7InVzZXJpbmZvIjp7Im9wZW5iYW5raW5nX2ludGVudF9pZCI6eyJ2YWx1ZSI6InVybjpvcGVuYmFuazppbnRlbnQ6YWNjb3VudDpkNTRmMTk1MC1kNmQ0LTQxOWUtOGZhOS02YTQ3NDljODE1N2QiLCJlc3NlbnRpYWwiOnRydWV9fSwiaWRfdG9rZW4iOnsib3BlbmJhbmtpbmdfaW50ZW50X2lkIjp7InZhbHVlIjoidXJuOm9wZW5iYW5rOmludGVudDphY2NvdW50OmQ1NGYxOTUwLWQ2ZDQtNDE5ZS04ZmE5LTZhNDc0OWM4MTU3ZCIsImVzc2VudGlhbCI6dHJ1ZX0sImFjciI6eyJlc3NlbnRpYWwiOnRydWV9fX19.jjQC53u11XU_HkVZXRDF3TFKGr2CNVRYd5zgTGhS-i67WzdDe2yir3yWWmdmhB_0HX2-TOc0j6dvLC2AwJfAmOSB4SVZoOZH8p4zdGvAS0r_34tHeUoMRZna_6RhIwfLVlzzNc2GfhgTbpL2ekIEeqkuNfmHym9ZYSs29hLScfw";
context.setVariable("jwt", sJWT);
var errorJson = {};
errorJson.isError = true;
errorJson.errorResponseCode = 401;
errorJson.errorDescription = "The request JWT is invalid, unknown, or malformed";
var payloadObj;
if (isProperPayload()) {
    context.setVariable("clientId", payloadObj.clientId);
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