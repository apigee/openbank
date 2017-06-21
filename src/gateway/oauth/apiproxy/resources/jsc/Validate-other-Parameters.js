var nonce = null;
var verb = context.getVariable("request.verb");
var scope = context.getVariable("scope");
var client_id = context.getVariable("client_id");
var redirect_uri = context.getVariable("redirect_uri");
 
 
var scopesXML = context.getVariable("AccessEntity.Get-API-Product-Scopes.ApiProduct.Scopes"); // scope from API Products
var applicationRedirectionUris = context.getVariable("verifyapikey.Authorize-Client-Application.redirection_uris").split(','); // callback_uri defined in developer application configuration
var applicationname = context.getVariable("verifyapikey.Authorize-Client-Application.app.name");
var applicationdesc = context.getVariable("verifyapikey.Authorize-Client-Application.app.applicationdesc");
var applicationid = context.getVariable("verifyapikey.Authorize-Client-Application.app.id");



if (applicationRedirectionUris.indexOf(redirect_uri) === -1) {
    context.setVariable("error_type", "invalid_redirect_uri");
    context.setVariable("error_variable", "This value must match a URL registered with the Application.");
    context.setVariable("status_code", "400");

}
else if (!validateScopes(scopesXML, scope)) {
    context.setVariable("error_type", "invalid_scope");
    context.setVariable("error_variable", "The requested scope is invalid, unknown, or malformed");
}
else{
    context.setVariable("applicationname", applicationname);
    context.setVariable("applicationid", applicationid);
    context.setVariable("applicationdesc", applicationdesc);
}

/**
 *
 * @param {String} scopesXML
 * @param {String} applicationScope
 *
 * @return boolean
 */
function validateScopes(scopesXML, applicationScope) {
    // Convert the scope from application request to Array
    var receivedScopes = applicationScope.split(" ");
    print('received scopes = ' + JSON.stringify(receivedScopes));

    print('XML = ' + scopesXML);
    
    if (scopesXML == null) {
        return false;

    }
    else {

        // Workaround for e4x
        scopesXML = scopesXML.replace(/^<\?xml\s+version\s*=\s*(["'])[^\1]+\1[^?]*\?>/, "");
        // Create a new xml object from scope xml string
        var Scopes = new XML(scopesXML);

        var lookup = {};
        var scope = Scopes.Scope;
        print('scopes = ' + scope);
        
        // Iterate, parse and validate the application scopes against the API Products scopes
        for (var j = 0; j < scope.length(); j++) {
            lookup[scope[j].toString()] = scope[j].toString();
        }

        for (var i in receivedScopes) {
            if (typeof lookup[receivedScopes[i]] != 'undefined') {
            }
            else {
                return false;
            }
        }
        return true;
    }
}

