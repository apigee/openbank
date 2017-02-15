var scope = context.getVariable("accesstoken.scope");
var grantType = context.getVariable("grant_type");

if (grantType === 'client_credentials')
    scope = "profile email phone address";

if (scope.indexOf("accounts") !== -1)
    scope = "profile email phone address";

var scopes;
var userInfo = {};
var address = {};

var sub = context.getVariable("accesstoken.sub");
var customer_id = context.getVariable("customer_id");
if (!sub) sub = customer_id;

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
var email_verified = context.getVariable("email_verified") || false;

var phone_number = context.getVariable("phone_number");
var phone_number_verified = context.getVariable("phone_number_verified") || false;

var formatted = context.getVariable("formatted");
var house_name = context.getVariable("house_name");
var street = context.getVariable("street");
var locality = context.getVariable("locality");
var region = context.getVariable("region");
var postal_code = context.getVariable("postal_code");
var country = context.getVariable("country");

if (scope != null) {
    scopes = scope.split(" ");

    if (scopes.indexOf("profile") !== -1) {
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

    if (scopes.indexOf("email") !== -1) {
        buildUserInfoObject("email", email);
        buildUserInfoObject("email_verified", email_verified);
    }

    if (scopes.indexOf("phone") !== -1) {
        buildUserInfoObject("phone_number", phone_number);
        buildUserInfoObject("phone_number_verified", phone_number_verified);
    }

    if (scopes.indexOf("address") !== -1) {
        userInfo.address = {};

        buildAddressObject("formatted", formatted);
        buildAddressObject("house_name", house_name);
        buildAddressObject("street", street);
        buildAddressObject("locality", locality);
        buildAddressObject("region", region);
        buildAddressObject("postal_code", postal_code);
        buildAddressObject("country", country);
    }
}

// context.setVariable("jsonObject", userInfo);
print(JSON.stringify(userInfo));
context.setVariable("userInfoResponse", JSON.stringify(userInfo));

function buildUserInfoObject(attribute, claim) {
    try {
        print(attribute + ' = ' + JSON.stringify(claim) + ' : ' + typeof claim);

        if (typeof claim === 'object')
            claim = "";

        if (claim !== null && claim !== "" && claim !== 0) {
            userInfo[attribute] = claim;
        }
    } catch (e) {
        print('error = ' + e);
    }
}

function buildAddressObject(attribute, claim) {
    try {
        print(attribute + ' = ' + JSON.stringify(claim) + ' : ' + typeof claim);

        if (typeof claim === 'object')
            claim = "";

        if (claim !== null && claim !== "" && claim !== 0) {
            userInfo.address[attribute] = claim;
        }
    } catch (e) {
        print('error = ' + e);
    }
}

function getContext(name) {
    var value = context.getVariable(name);
    try {
        if (value === null || typeof value === 'undefined')
            value = null;
    } catch (e) {
        value = null;
    }
}