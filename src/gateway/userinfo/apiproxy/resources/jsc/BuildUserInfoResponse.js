var scope = context.getVariable("accesstoken.scope");
var scopes;
var userInfo = {};
var address = {};

var sub = context.getVariable("accesstoken.sub");
var customer_id = context.getVariable("customer_id");

var full_name = context.getVariable("full_name");
var given_name = context.getVariable("given_name");
var family_name = context.getVariable("family_name");
var middle_name = context.getVariable("middle_name");
var nickname = context.getVariable("nickname");
var preferred_username = context.getVariable("preferred_username");

var picture = context.getVariable("picture");
var profile = context.getVariable("profile");
var website = context.getVariable("website");

var gender = context.getVariable("gender");
var birthdate = context.getVariable("birthdate");
var zoneinfo = context.getVariable("zoneinfo");
var locale = context.getVariable("locale");

var updated_at = context.getVariable("updated_at");

var email = context.getVariable("email");
var email_verified = context.getVariable("email_verified");

var phone_number = context.getVariable("phone_number");
var phone_number_verified = context.getVariable("phone_number_verified");

var formatted = context.getVariable("formatted") || "";
var street_address = context.getVariable("street_address") || "";
var locality = context.getVariable("locality") || "";
var region = context.getVariable("region") || "";
var postal_code = context.getVariable("postal_code") || "";
var country = context.getVariable("country") || "";

if (scope != null) {
    scopes = scope.split(" ");

    if (scopes.indexOf("profile") !== -1 || scopes.indexOf("accounts") !== -1) {
        buildUserInfoObject("sub", sub);
        buildUserInfoObject("customer_id", sub);
        buildUserInfoObject("name", full_name);
        buildUserInfoObject("given_name", given_name);
        buildUserInfoObject("family_name", family_name);
        buildUserInfoObject("middle_name", middle_name);
        buildUserInfoObject("nickname", nickname);
        buildUserInfoObject("preferred_username", preferred_username);

        buildUserInfoObject("profile", profile);
        buildUserInfoObject("picture", picture);
        buildUserInfoObject("website", website);

        buildUserInfoObject("gender", gender);
        buildUserInfoObject("birthdate", birthdate);
        buildUserInfoObject("zoneinfo", zoneinfo);
        buildUserInfoObject("locale", locale);

        buildUserInfoObject("updated_at", updated_at);
    }

    if (scopes.indexOf("email") !== -1 || scopes.indexOf("accounts") !== -1) {
        buildUserInfoObject("email", email);
        buildUserInfoObject("email_verified", email_verified);
    }

    if (scopes.indexOf("phone") !== -1 || scopes.indexOf("accounts") !== -1) {
        buildUserInfoObject("phone_number", phone_number);
        buildUserInfoObject("phone_number_verified", phone_number_verified);
    }

    if (scopes.indexOf("address") !== -1 || scopes.indexOf("accounts") !== -1) {
        userInfo.address = {};
        buildAddressObject("formatted", formatted);
        buildAddressObject("street_address", street_address);
        buildAddressObject("locality", locality);
        buildAddressObject("region", region);
        buildAddressObject("postal_code", postal_code);
        buildAddressObject("country", country);
    }
}

context.setVariable("userInfoResponse", JSON.stringify(userInfo));

function buildUserInfoObject(attribute, claim) {
    if (claim != null && claim != "") {
        userInfo[attribute] = claim;
    }
}

function buildAddressObject(attribute, claim) {
    if (claim != null && claim != "") {
        userInfo.address[attribute] = claim;
        print(userInfo.address[attribute]);
    }
} 