var jwt;
var key = context.getVariable("private.privateKey");
//TODO:DELETE THIS LINE//"-----BEGIN RSA PRIVATE KEY-----MIICWwIBAAKBgQDdlatRjRjogo3WojgGHFHYLugdUWAY9iR3fy4arWNA1KoS8kVw33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQsHUfQrSDv+MuSUMAe8jzKE4qW+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5Do2kQ+X5xK9cipRgEKwIDAQABAoGAD+onAtVye4ic7VR7V50DF9bOnwRwNXrARcDhq9LWNRrRGElESYYTQ6EbatXS3MCyjjX2eMhu/aF5YhXBwkppwxg+EOmXeh+MzL7Zh284OuPbkglAaGhV9bb6/5CpuGb1esyPbYW+Ty2PC0GSZfIXkXs76jXAu9TOBvD0ybc2YlkCQQDywg2R/7t3Q2OE2+yo382CLJdrlSLVROWKwb4tb2PjhY4XAwV8d1vy0RenxTB+K5Mu57uVSTHtrMK0GAtFr833AkEA6avx20OHo61Yela/4k5kQDtjEf1N0LfI+BcWZtxsS3jDM3i1Hp0KSu5rsCPb8acJo5RO26gGVrfAsDcIXKC+bQJAZZ2XIpsitLyPpuiMOvBbzPavd4gY6Z8KWrfYzJoI/Q9FuBo6rKwl4BFoToD7WIUS+hpkagwWiz+6zLoX1dbOZwJACmH5fSSjAkLRi54PKJ8TFUeOP15h9sQzydI8zJU+upvDEKZsZc/UhT/SySDOxQ4G/523Y0sz/OZtSWcol/UMgQJALesy++GdvoIDLfJX5GBQpuFgFenRiRDabxrE9MNUZ2aPFaFp+DyAe+b4nDwuJaW2LURbr8AEZga7oQj0uYxcYw==  -----END RSA PRIVATE KEY-----  ";
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
var sub = context.getVariable("RequestId");
var aud = context.getVariable("ClientId");
var exp = timestamp + (1000 * 60 * 60);
var iat = timestamp;
iat = Math.round(iat / 1000);
exp = Math.round(exp / 1000);
var nonce = context.getVariable("Nonce");


var s_hash = context.getVariable("RequestState");
var c_hash = context.getVariable("oauthv2authcode.Generate-Authorization-Code.code");

var sha256 = crypto.getSHA256();
sha256.update(s_hash);
var s_hash = sha256.digest();
var s_hash = hexToBytes(s_hash);
var s_hash = bytesToBase64(s_hash.splice(0, s_hash.length / 2));
print(s_hash);

var sha256 = crypto.getSHA256();
sha256.update(c_hash);
var c_hash = sha256.digest();
var c_hash = hexToBytes(c_hash);
var c_hash = bytesToBase64(c_hash.splice(0, c_hash.length / 2));
print(c_hash);

//console.log( CryptoJS.enc.Base64.stringify(ct.ciphertext));


var customerId = context.getVariable("CustomerId");

var idTokenClaim = {
    "iss": iss,
    "sub": sub,
    "aud": aud,
    "exp": exp,
    "iat": iat,
    "nonce": nonce,
    "s_hash": s_hash,
    "c_hash": c_hash,
    "customerId": customerId
};


var ResponseTypeToken = context.getVariable("ResponseTypeToken");
var ResponseTypeCode = context.getVariable("ResponseTypeCode");
var ResponseTypeIdToken = context.getVariable("ResponseTypeIdToken");

if (ResponseTypeIdToken == "true") {
    header = JSON.stringify(header);
    claims = JSON.stringify(idTokenClaim);
    jwt = KJUR.jws.JWS.sign(alg, header, claims, key);
    context.setVariable("idTokenClaim", JSON.stringify(idTokenClaim));
    context.setVariable("id_token", jwt);
}
