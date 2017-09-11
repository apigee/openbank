/*
 Copyright 2017 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

var xJwsSignature = context.getVariable("jwsSignature");
var appPublicKey = context.getVariable("appPublicKey");
var requestPayload = JSON.parse(context.getVariable("request.content"));
requestPayload = JSON.stringify(requestPayload);

var validAlgorithms = ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512"];
var isError = false;
var errorDescription = "";
var jws = new KJUR.jws.JWS();
//split the jws header in 2 parts. header and payload
var jwsParts = xJwsSignature.split("..");

if (jwsParts.length == 2) {
    // base64 decode the JOSE Header
    var joseHeader = Base64.decode(jwsParts[0]);
    var ExpectedSignedPayload = jwsParts[0] + "." + Base64.encode(requestPayload); //crypto.base64(crypto.asBytes(requestPayload))
    var signature = Base64.decode(jwsParts[1]);
    jws.parseJWS(signature);

    var isValid = KJUR.jws.JWS.verify(signature, appPublicKey);


    if (isValid) {
        var parsedPayload = jws.parsedJWS.payloadS;

        if (parsedPayload != ExpectedSignedPayload) {
            isError = true;
            errorDescription = "request payload invalid";
        }

        else {
            var parsedHeader = JSON.parse(jws.parsedJWS.headS);
            if ((parsedHeader.b64 !== false)) {
                isError = true;
                errorDescription = "b64 value invalid";
            }
            else if ((!parsedHeader["http://openbanking.org.uk/iat"] ) || Date.parse(parsedHeader["http://openbanking.org.uk/iat"]) > Date.parse(new Date())) {
                isError = true;
                errorDescription = "iat value invalid";

            }
            else if (validAlgorithms.indexOf(parsedHeader.alg) <= -1) {
                isError = true;
                errorDescription = "alg value invalid";

            }
        }


    }
    else {
        isError = true;
        errorDescription = "invalid jws signature";
    }
}
else {
    isError = true;
    errorDescription = "malformed jws signature";
}

if (isError) {
    context.setVariable("isError", isError);
    context.setVariable("errorResponseCode", 400);
    context.setVariable("errorDescription", errorDescription);
}
else {
    context.setVariable("isError", false);
}






