var scope= context.getVariable("accesstoken.scope");
var scopes;
var userInfo={};
var address={};

var given_name = context.getVariable("given_name");
var family_name = context.getVariable("family_name");
var name = context.getVariable("name");
var gender = context.getVariable("gender");
var picture = context.getVariable("picture");
var sub = context.getVariable("accesstoken.sub");
var preferred_username = context.getVariable("username");
var email = context.getVariable("email");

var phone_number = context.getVariable("phone_number");

var formatted = context.getVariable("formatted");
var street_address = context.getVariable("street_address");
var locality = context.getVariable("locality");
var region = context.getVariable("region");
var postal_code = context.getVariable("postal_code");
var country = context.getVariable("country");


if (scope != null){
	scopes=scope.split(" ");

  for (var i in scopes){
      if (scopes[i] == "profile"){
          
          buildUserInfoObject("sub", sub);
          buildUserInfoObject("name", name);
          buildUserInfoObject("family_name", family_name);
          buildUserInfoObject("given_name", given_name);
          buildUserInfoObject("picture", picture);
          buildUserInfoObject("gender", gender);
          buildUserInfoObject("preferred_username", preferred_username);
        	
      }
      if (scopes[i] == "email"){
          buildUserInfoObject("email", email);
          userInfo["email_verified"]="true";
  
      }
      if (scopes[i] == "phone"){
          buildUserInfoObject("phone_number", phone_number);
          userInfo["phone_number_verified"]="true";
  
      }
      if (scopes[i] == "address"){
          userInfo.address = {};
          buildAddressObject("formatted",formatted);
          buildAddressObject("street_address",street_address);
          buildAddressObject("locality",locality);
          //buildAddressObject("region",region);
          buildAddressObject("postal_code",postal_code);
          buildAddressObject("country",country);   
      }
  }
  
}

context.setVariable("userInfoResponse", JSON.stringify(userInfo));

function buildUserInfoObject(attribute, claim){
	if (claim!=null && claim!=""){
		userInfo[attribute]=claim;
	}

} 

function buildAddressObject(attribute, claim){
	if (claim!=null && claim!=""){
		userInfo.address[attribute]=claim;
        print(userInfo.address[attribute]);
	}

} 