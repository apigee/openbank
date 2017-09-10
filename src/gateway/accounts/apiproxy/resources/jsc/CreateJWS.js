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

var jwt = KJUR.jws.JWS.sign(joseHeader.alg, joseHeader, responsePayload, privateKey);
detachedJWT = jwt.split(".");
var detachedJws = detachedJWT[0] + ".." + detachedJWT[2];
context.setVariable("detachedJws", detachedJws);