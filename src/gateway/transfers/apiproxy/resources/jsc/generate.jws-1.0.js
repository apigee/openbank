/* 
 * JSON Web Tokens are an open, industry standard RFC 7519 method for representing 
 * claims securely between two parties
 * generate.jws-1.0.js uses jsrsasign 4.8.0 (kjur.github.com/jsrsasign/license) library to generate JWS
 * generate.jws-1.0.js allows you to generate JWS (ID Token)
*/


var claims={}; // JWT claims object
var jwt; 
var key;
var alg = 'HS256'; // algorithm to sign - if unsecured jwt then use 'none'
// JOSE header: if unsecured jwt then use 'none' for 'typ'
var header = {
      alg: alg,
      typ: 'JWT'
    };

var secret = context.getVariable("secret");
var scope = context.getVariable("scope");
var grant_type = context.getVariable("grant_type");
var expires_in = context.getVariable("exp");
var issued_at = context.getVariable("iat");
var acr_values = context.getVariable("acr_values");
var azp = context.getVariable("azp");
var amr = context.getVariable("amr");
var authentication_time = context.getVariable("auth_time");


var response_type_token = context.getVariable("response_type_token");
var response_type_code = context.getVariable("response_type_code");
var response_type_id_token = context.getVariable("response_type_id_token");

 // check if response_type_id_token is true. If so start building the standard claims.
 // The JWT claims object contains security information about the message	
 // for more information please visit https://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#rfc.section.4
if(response_type_id_token=="true" || (grant_type!=null && grant_type!="" && grant_type=="authorization_code")){
  
  // Milliseconds to seconds
  iat = parseInt(issued_at);
  exp = iat + (parseInt(expires_in) * 1000);
  iat = Math.round(iat/1000);
  exp = Math.round(exp/1000);
  auth_time = parseInt(authentication_time);
  auth_time = Math.round(auth_time/1000);
  
  var iss = context.getVariable("iss");
  var sub = context.getVariable("sub");
  var aud = context.getVariable("aud");
  var nonce = context.getVariable("nonce");
  
  buildClaimsObject("iss", iss);
  buildClaimsObject("sub", sub);
  buildClaimsObject("aud", aud);
  buildClaimsObject("exp", exp);
  buildClaimsObject("iat", iat);
  buildClaimsObject("nonce", nonce);
  buildClaimsObject("acr", acr_values);
  buildClaimsObject("amr", amr);
  buildClaimsObject("azp", azp);
  buildClaimsObject("auth_time", auth_time);
  
  // check if response_type_token is true. 
  // If so start building the claims based on application scopes.
  if(response_type_id_token=="true" && response_type_code=="false" && response_type_token=="false"){
    
    if(scope!= null || scope != ""){
      
      var scopes = scope.split(" ");
      print(scopes);
      
      for each (var j = 0; j < scopes.length; j++){
        if(scopes[j] == "profile"){
          var given_name = context.getVariable("given_name");
          var family_name = context.getVariable("family_name");
          var name = context.getVariable("name");
          var gender = context.getVariable("gender");
          var picture = context.getVariable("picture");
          var preferred_username = context.getVariable("preferred_username");
          
          
          buildClaimsObject("preferred_username", preferred_username);
          buildClaimsObject("given_name", given_name);
          buildClaimsObject("family_name", family_name);
          buildClaimsObject("name", name);
          buildClaimsObject("gender", gender);
          buildClaimsObject("picture", picture);
        }
        else if(scopes[j] == "email"){
          var email = context.getVariable("email");
          
          buildClaimsObject("email", email);
          claims["email_verified"] = "true";
        }
      } 
    }
  }
 
  // convert to header and claims as JSON string to be used in http://kjur.github.io/jsjws/api/symbols/KJUR.jws.JWS.html#.sign 
  header = JSON.stringify(header);
  claims = JSON.stringify(claims);
  // convert a raw string including non printable characters to hexadecimal encoded string
  // for more information please visit http://dbis.rwth-aachen.de/~renzel/mobsos/lib/js/jsrsasign/api/symbols/global__.html#rstrtohex
  key = rstrtohex(secret);
  // generate JWS signature by specified key
  // for more information please visit http://kjur.github.io/jsjws/api/symbols/KJUR.jws.JWS.html#.sign 
  jwt = KJUR.jws.JWS.sign(alg, header, claims, key);
  
  context.setVariable("id_token", jwt)
}

function buildClaimsObject(attribute, claim){
	if(claim!= null &&  claim!= "" ){
		claims[attribute]=claim;
	}
} 