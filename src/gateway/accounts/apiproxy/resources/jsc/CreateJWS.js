var responsePayload = JSON.parse(context.getVariable("response.content"));
responsePayload = JSON.stringify(responsePayload);
var privateKey = context.getVariable("private.privateKey");
var joseHeader =
    {
        "alg": "RS256",
        "kid": "90210ABAD",
        "b64": false,
        "http://openbanking.org.uk/iat": "2017-06-12T20:05:50+00:00",
        "http://openbanking.org.uk/iss": "C=UK, ST=England, L=London, O=Acme Ltd.",
        "crit": ["b64", "http://openbanking.org.uk/iat", "http://openbanking.org.uk/iss"]

    };
var jws = new KJUR.jws.JWS();
var payload = Base64.encode(JSON.stringify(joseHeader)) + "." + Base64.encode(responsePayload);

var signature = KJUR.jws.JWS.sign(joseHeader.alg, joseHeader, payload, privateKey);

var detachedJws = Base64.encode(JSON.stringify(joseHeader)) + ".." + Base64.encode(signature);
context.setVariable("detachedJws", detachedJws);