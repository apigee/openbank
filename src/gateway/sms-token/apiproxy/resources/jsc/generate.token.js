
var hash = Token();
var payload = "APIGEE";
var challenge = hash.random({length: payload.length, type: "numeric"});


context.setVariable('token_text', challenge);
context.setVariable('token_challenge', challenge);
context.setVariable('token_expiry', payload.expiry);