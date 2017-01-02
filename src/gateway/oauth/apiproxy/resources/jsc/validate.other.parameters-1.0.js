/* 
 * validate.other.parameters-1.0.js script validates the following: 
 * 		1.	scopes in /authorize request against scopes defined in API Products
 *		2.	redirect_uri in /authorize request against callback_uri defined in developer application configuration
 *
 * validate.other.parameters-1.0.js (c) 2015 @Apigee
*/
var verb = context.getVariable("request.verb");

var scope = context.getVariable("scope");
var client_id = context.getVariable("client_id");
var redirect_uri = context.getVariable("redirect_uri");

var state = null;
var nonce = null;
var login_hint = null;
var display = null;
var prompt = null;
var offline = null;
var id_token_hint = null;
var ui_locales = null;

var scopesXML = context.getVariable("AccessEntity.Get-API-Product-Scopes.ApiProduct.Scopes") // scope from API Products
var applictionRedirectionUri = context.getVariable("verifyapikey.Authorize-Client-Application.redirection_uris").toLowerCase().trim().split(','); // callback_uri defined in developer application configuration
var applicationname = context.getVariable("verifyapikey.Authorize-Client-Application.app.name");
var applicationdesc = context.getVariable("verifyapikey.Authorize-Client-Application.app.applicationdesc");
var tandcs = context.getVariable("verifyapikey.Authorize-Client-Application.tandcs");
var applicationid = context.getVariable("verifyapikey.Authorize-Client-Application.app.id");

if (verb == "POST") {
	state = context.getVariable("request.formparam.state");
	nonce = context.getVariable("request.formparam.nonce");
	display = context.getVariable("request.formparam.display");
	login_hint = context.getVariable("request.formparam.login_hint");
  	display = context.getVariable("request.formparam.display");
  	prompt = context.getVariable("request.formparam.prompt");
  	offline = context.getVariable("request.formparam.offline");  
  	id_token_hint = context.getVariable("request.formparam.id_token_hint");    
	ui_locales = context.getVariable("request.formparam.ui-locales");      
}

if (verb == "GET") {
	state = context.getVariable("request.queryparam.state");
	nonce = context.getVariable("request.queryparam.nonce");
	display = context.getVariable("request.queryparam.display");
	login_hint = context.getVariable("request.queryparam.login_hint");
    display = context.getVariable("request.queryparam.display");
  	prompt = context.getVariable("request.queryparam.prompt");
  	offline = context.getVariable("request.queryparam.offline");  
  	id_token_hint = context.getVariable("request.queryparam.id_token_hint");   
	ui_locales = context.getVariable("request.queryparam.ui-locales");    
}


if(applictionRedirectionUri.indexOf(redirect_uri) === -1){
 	 context.setVariable("error_type", "invalid_redirect_uri");
     context.setVariable("error_variable", "This value must match a URL registered with the Application."); 
  	 context.setVariable("status_code", "400"); 
  
}
else if(!validateScopes(scopesXML, scope)){
 	 context.setVariable("error_type", "invalid_scope");
     context.setVariable("error_variable", "The requested scope is invalid, unknown, or malformed");  	
 }
else {
	context.setVariable("state", state);
	context.setVariable("req_state", state);
	context.setVariable("nonce", nonce);
	context.setVariable("display", display);
	context.setVariable("login_hint", login_hint);
    context.setVariable("display", display);
    context.setVariable("prompt", prompt);
    context.setVariable("offline", offline);
    context.setVariable("id_token_hint", id_token_hint);
    context.setVariable("offline", offline);  
    context.setVariable("ui_locales", ui_locales);    
    context.setVariable("tandcs", tandcs);
    context.setVariable("applicationname", applicationname); 
    context.setVariable("applicationid", applicationid);
    context.setVariable("applicationdesc", applicationdesc);
}
/**
 * Check if a given element is null/empty 
 * 
 * @param {String} element
 * @return {boolean}
 */

function isEmptyOrNull(element){
	
if ((element == null) ||(element ==""))	
	return true;
else 
	return false;
}

/**
 * 
 * @param {String} scopesXML
 * @param {String} applicationScope
 * 
 * @return boolean
 */
function validateScopes(scopesXML, applicationScope){
 // Convert the scope from application request to Array
   var receivedScopes = applicationScope.split(" "); 
   
   if(scopesXML == null){
       return false;
     	
   }
   else{
  
    // Workaround for e4x 
     scopesXML = scopesXML.replace(/^<\?xml\s+version\s*=\s*(["'])[^\1]+\1[^?]*\?>/, "");
    // Create a new xml object from scope xml string
     var Scopes = new XML(scopesXML);
     
     var lookup = {};
     var scope = Scopes.Scope;
     // Iterate, parse and validate the application scopes against the API Products scopes
     for (var j=0; j<scope.length(); j++){
        lookup[scope[j].toString()]=scope[j].toString();
     }
    
     for (var i in receivedScopes) {
        if (typeof lookup[receivedScopes[i]]!='undefined') {
        } 
        else{
            return false;     	
        }
     }
     return true;
   }
}
