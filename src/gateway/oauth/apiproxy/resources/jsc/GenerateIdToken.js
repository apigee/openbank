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
/**
 * @file
 * GenerateIdToken.js
 * Generate Id token JWS
 */

var jwt;
var key = context.getVariable("private.privateKey");
var alg = 'RS256'; // algorithm to sign - if unsecured jwt then use 'none'
// JOSE header: if unsecured jwt then use 'none' for 'typ'
var header = {
    alg: alg,
    typ: 'JWT'
};

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16).toString(8));
    return bytes;
}
function bytesToBase64(bytes) {
    b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 <= bytes.length * 8)
                base64.push(b64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
            else base64.push("=");
        }
    }
    return base64.join("");
}
var timestamp = parseInt(context.getVariable("system.timestamp"));

var iss = "https://private.api.openbank.com/";
var sub = "urn:openbank:intent:" + context.getVariable("Type") + ":" + context.getVariable("RequestId");
var aud = context.getVariable("ClientId");
var exp = timestamp + (1000 * 60 * 60);
var iat = timestamp;
iat = Math.round(iat / 1000);
exp = Math.round(exp / 1000);
var nonce = context.getVariable("Nonce");


var sHash = context.getVariable("RequestState");
var cHash = context.getVariable("oauthv2authcode.Generate-Authorization-Code.code");

var sha256 = crypto.getSHA256();
sha256.update(sHash);
var sHash = sha256.digest();
var sHash = hexToBytes(sHash);
var sHash = bytesToBase64(sHash.splice(0, sHash.length / 2));

var sha256 = crypto.getSHA256();
sha256.update(cHash);
var cHash = sha256.digest();
var cHash = hexToBytes(cHash);
var cHash = bytesToBase64(cHash.splice(0, cHash.length / 2));

//console.log( CryptoJS.enc.Base64.stringify(ct.ciphertext));


//var customerId = context.getVariable("CustomerId");

var idTokenClaim = {
    "iss": iss,
    "sub": sub,
    "aud": aud,
    "exp": exp,
    "iat": iat,
    "nonce": nonce,
    "s_hash": sHash,
    "c_hash": cHash
};


context.setVariable("jwt-iss","")
context.setVariable("jwt-sub","")
context.setVariable("jwt-aud","")
context.setVariable("jwt-exp","")
context.setVariable("jwt-iat","")
context.setVariable("jwt-nonce","")
context.setVariable("jwt-s_hash","")
context.setVariable("jwt-c_hash","")
    
//var ResponseTypeToken = context.getVariable("ResponseTypeToken");
//var ResponseTypeCode = context.getVariable("ResponseTypeCode");
var ResponseTypeIdToken = context.getVariable("ResponseTypeIdToken");

if (ResponseTypeIdToken == "true") {
    if(idTokenClaim.iss)
    {
        context.setVariable("jwt-iss",idTokenClaim.iss)
    }
    if(idTokenClaim.sub)
    {
        context.setVariable("jwt-sub",idTokenClaim.sub)
    }
    if(idTokenClaim.aud)
    {
        context.setVariable("jwt-aud",idTokenClaim.aud)
    }
    if(idTokenClaim.exp)
    {
        context.setVariable("jwt-exp",idTokenClaim.exp)
    }
    if(idTokenClaim.iat)
    {
        context.setVariable("jwt-iat",idTokenClaim.iat)
    }
    if(idTokenClaim.nonce)
    {
        context.setVariable("jwt-nonce",idTokenClaim.nonce)
    }
    if(idTokenClaim.s_hash)
    {
        context.setVariable("jwt-s_hash",idTokenClaim.s_hash)
    }
    if(idTokenClaim.c_hash)
    {
        context.setVariable("jwt-c_hash",idTokenClaim.c_hash)
    }
    
    header = JSON.stringify(header);
    claims = JSON.stringify(idTokenClaim);
    //jwt = KJUR.jws.JWS.sign(alg, header, claims, key);
    context.setVariable("idTokenClaim", JSON.stringify(idTokenClaim));
    //context.setVariable("id_token", jwt);
}