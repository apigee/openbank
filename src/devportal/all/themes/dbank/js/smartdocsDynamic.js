(function($)
{
  $(document).ready(function()
{
  ORG = "demo-eu07";
  ENV = "test";
  CLIENT_ID_ACCOUNTS = "B0oG1lreGOwyRCSyUw4BAGHOTELkuPNH";
  CLIENT_SECRET_ACCOUNTS = "1tyzWsFPLjZ5dzl2";
  CLIENT_ID_PAYMENTS = "pXxKFZPebpwCFlNl1rNjp9TdnbbmuRtt";
  CLIENT_SECRET_PAYMENTS = "AK1HHoBtJSeQnDDZ";  
  ACCOUNTS_SMARTDOC_NAME = "accounts-apis-v1-0";
  ACCOUNTS_OAUTH_NAME = "PSUOAuth2Security";

  PAYMENTS_SMARTDOC_NAME = "payments-apis-v1-0";
  PAYMENTS_OAUTH_NAME = "PSUOAuth2Security";

  BASE_URL = "https://demo-eu07-test.apigee.net";

  BASIC_HEADER_ACCOUNTS = Base64.encode(CLIENT_ID_ACCOUNTS + ":" + CLIENT_SECRET_ACCOUNTS);
  BASIC_HEADER_PAYMENTS = Base64.encode(CLIENT_ID_PAYMENTS + ":" + CLIENT_SECRET_PAYMENTS);

  TEMPLATE_CALLBACK_ACCOUNTS = "https://api.enterprise.apigee.com/v1/o/"+ORG+"/apimodels/"+ACCOUNTS_SMARTDOC_NAME+"/templateauths/"+ACCOUNTS_OAUTH_NAME+"/callback";
  TEMPLATE_CALLBACK_PAYMENTS = "https://api.enterprise.apigee.com/v1/o/"+ORG+"/apimodels/"+PAYMENTS_SMARTDOC_NAME+"/templateauths/"+PAYMENTS_OAUTH_NAME+"/callback";
  JOSE_HEADER = {
            "alg": "RS256",
            "kid": "90210ABAD",
            "b64": false,
            "http://openbanking.org.uk/iat": "2017-06-12T20:05:50+00:00",
            "http://openbanking.org.uk/iss": "C=UK, ST=England, L=London, O=Acme Ltd.",
            "crit": ["b64", "http://openbanking.org.uk/iat", "http://openbanking.org.uk/iss"]

          };
    

showclientCredPage();
showJWSButton();


function showclientCredPage()
{
  $("div[data-role=oauth2_modal] a.button_save_modal").remove();
  $("div[data-role=oauth2_modal] a.button_close_modal").remove();
  $("div[data-role=oauth2_modal] button.button_close_modal").addClass("button_closenew_modal");
  $("div[data-role=oauth2_modal] button.button_closenew_modal").removeClass("button_close_modal");

  var $aOK = $('<a class="btn btn-primary button_savenew_modal" href="javascript:void(0)">OK</a>');
  var $aCancel = $('<a class="btn btn-primary button_closenew_modal" href="javascript:void(0)">Cancel</a>');

  $aOK.appendTo("div[data-role=oauth2_modal] div.modal-footer");
  $aCancel.appendTo("div[data-role=oauth2_modal] div.modal-footer");



  $("div[data-role=oauth2_modal] a.button_closenew_modal").on("click", ResetAndCancel);
  $("div[data-role=oauth2_modal] button.button_closenew_modal").on("click", ResetAndCancel);

  $('div[data-role=oauth2_modal] div.modal-header h3.modal-title').text("Step 1: Get Client Credential Access Token");

  $('div[data-role=oauth2_modal] div.modal-body div.content').hide();
  $('div[data-role=oauth2_modal] div.modal-footer p').hide();

  $("div[data-role=oauth2_modal] a.button_savenew_modal").unbind("click");
  $("div[data-role=oauth2_modal] a.button_savenew_modal").on("click", getClient_credentialAccessToken);
  
  var $clientCredentialBody = $('<div id="clientCredentialBody" style="background:#FFFFFF;"> <table> <tr> <td><label>Authorization</label></td> <td><input type="text" name="base64Authinput"></input></td> </tr> <tr> <td><label>Grant Type</label></td> <td><input type="text" name="grantTypeInput" value="client_credentials" readonly="readonly"></input></td> </tr> <tr> <td><label>Scope</label></td> <td>&nbsp &nbsp <select name="scopeSelector"> <option value="accounts">accounts</option> <option value="payments">payments</option> </select> </td> </tr> </table></div>');
  $clientCredentialBody.appendTo($('div[data-role=oauth2_modal] div.modal-body'));

  $('input[name=base64Authinput]').val(BASIC_HEADER_ACCOUNTS);

}



function getClient_credentialAccessToken()
{
  localStorage.ccScope = $('select[name=scopeSelector]').find(":selected").text();

  var oauthURL = BASE_URL+"/apis/v1.0/oauth/token";
  
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", oauthURL, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var params = "grant_type=client_credentials&scope="+ localStorage.ccScope;

  if(localStorage.ccScope == "accounts")
  {
    xhttp.setRequestHeader("Authorization", BASIC_HEADER_ACCOUNTS);
  }
  else
  {
    xhttp.setRequestHeader("Authorization", BASIC_HEADER_PAYMENTS);
  } 

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) 
    {
      var responseText = JSON.parse(this.responseText);
      localStorage.clientCredentialToken = "Bearer " + responseText.access_token;
    
      showCreateRequestPage();
    }
    else if(this.readyState == 4 )
    {
    ResetAndCancel();
    showError("Error getting access token");
    }
  };
  
  xhttp.send(params);

  
}



function showCreateRequestPage()
{

  $('div[data-role=oauth2_modal] div.modal-body #clientCredentialBody').hide();
  //alert($('select[name=scopeSelector]').find(":selected").text());
  var $authoriseInput = "";
  var ReqContent = "";
  if(localStorage.ccScope == "accounts")
  {
    $('div[data-role=oauth2_modal] div.modal-header h3.modal-title').text("Step 2: Create Account Request");
    
    $authoriseInput = $('<div id="showRequest" style="background:#FFFFFF;"> <table> <tr> <td><label>Authorization</label></td> <td><input type="text" name="BearerAuthInput" value="qwerty"></input></td> </tr> <tr> <td><label>x-fapi-financial-id</label></td> <td><input type="text" name="financialIdInput" value="34"></input></td> </tr> <tr> <td><label>x-jws-signature</label></td> <td><input type="text" name="jwsInput"></input></td> </tr> <tr> <td><label>body</label></td> <td> &nbsp &nbsp<textarea cols="26" rows="6" style="oveflow:scroll" name="reqPayloadInput"></textarea></td> </tr> </table></div>');
    ReqContent = JSON.stringify({"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}});

  }
  else
  {
    $('div[data-role=oauth2_modal] div.modal-header h3.modal-title').text("Step 2: Create Payment Request");
    
    $authoriseInput = $('<div id="showRequest" style="background:#FFFFFF;"> <table> <tr> <td><label>Authorization</label></td> <td><input type="text" name="BearerAuthInput" value="qwerty"></input></td> </tr> <tr> <td><label>x-fapi-financial-id</label></td> <td><input type="text" name="financialIdInput" value="34"></input></td> </tr> <tr> <td><label>x-jws-signature</label></td> <td><input type="text" name="jwsInput"></input></td> </tr><tr> <td><label>x-idempotency-key</label></td> <td><input type="text" name="idempotencyInput"></input></td> </tr> <tr> <td><label>Payload</label></td> <td> &nbsp &nbsp <textarea rows="6" cols="26" style="oveflow:scroll" name="reqPayloadInput"></textarea></td> </tr> </table></div>');
    ReqContent = JSON.stringify({"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACME Inc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internal ops code 5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat 7","Acacia Lodge"],"StreetName":"Acacia Avenue","BuildingNumber":"27","PostCode":"GU31 2ZZ","TownName":"Sparsholt","CountySubDivision":["Wessex"],"Country":"UK"}}});
    $("input[name=idempotencyInput]").val(Date.parse(new Date()));
  }
  
  $authoriseInput.appendTo($('div[data-role=oauth2_modal] > div.modal-dialog > div.modal-content > div.modal-body'));

  $('div#showRequest textarea[name=reqPayloadInput]').val(ReqContent);
  var jws = getJWS($('div#showRequest textarea[name=reqPayloadInput]').val());
  $("input[name=financialIdInput]").val($("ul.headerParamSection input[name=x-fapi-financial-id]").val());
  $('div#showRequest input[name=jwsInput]').val(jws);
  $('div#showRequest input[name=BearerAuthInput]').val(localStorage.clientCredentialToken);
  $("div[data-role=oauth2_modal] a.button_savenew_modal").unbind("click");
  $("div[data-role=oauth2_modal] a.button_savenew_modal").on("click", createRequest);
}



function createRequest()
{
    var postRequestURL = "";
    if(localStorage.ccScope == "accounts")
    {
      postRequestURL = BASE_URL+"/ais/open-banking/v1.0/account-requests";
    }

    else
    {
      postRequestURL = BASE_URL+"/pis/open-banking/v1.0/payments";

    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", postRequestURL, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    var body = $('div#showRequest textarea[name=reqPayloadInput]').val();
    xhttp.setRequestHeader("Authorization", localStorage.clientCredentialToken);
    xhttp.setRequestHeader("x-fapi-financial-id", $('input[name=financialIdInput]').val());
    xhttp.setRequestHeader("x-jws-signature", $('div#showRequest input[name=jwsInput]').val());
    xhttp.setRequestHeader("x-fapi-customer-ip-address", "123456");
    xhttp.setRequestHeader("Accept", "application/json");

    if(localStorage.ccScope == "payments")
    {

      xhttp.setRequestHeader("x-idempotency-key", $('div#showRequest input[name=idempotencyInput]').val());

    }

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 201) 
      {
        var responseText = JSON.parse(this.responseText);
        if(localStorage.ccScope == "accounts")
        {
          localStorage.RequestId = responseText.Data.AccountRequestId;

        }
        else
        {

          localStorage.RequestId = responseText.Data.PaymentId;
        
          var json = JSON.parse(window.apiModelEditor.getRequestPayLoad());
          if(json.Data && json.Data.PaymentId)
          {
            
            json.Data.PaymentId = localStorage.RequestId;
            window.apiModelEditor.setRequestPayLoad(JSON.stringify(json));
            
          }
        }

        showAccessTokenPage();
      }
      else if(this.readyState == 4 )
      {
        ResetAndCancel();
        showError("Error creating Request");
        
      }
    };
    
    xhttp.send(body);

    
}


function showAccessTokenPage()
{
  $('div[data-role=oauth2_modal] div.modal-body #showRequest').hide();
  $('div[data-role=oauth2_modal] div.modal-header h3.modal-title').text("Step 3: Set additional Parameters for getting Access Token");
  var $authoriseInput = $('<div id="authoriseInput" style="background:#FFFFFF;"> <table> <tr> <td><label>request</label></td> <td><input type="text" name="requestInput" value="qwerty"></input></td> </tr> </table></div>');
  $authoriseInput.appendTo($('div[data-role=oauth2_modal] > div.modal-dialog > div.modal-content > div.modal-body'));
  localStorage.nonce = Date.parse(new Date());
  var jwtresponse;
  if(localStorage.ccScope == "accounts")
  {
    jwtresponse = createJWT("accounts",localStorage.nonce,CLIENT_ID_ACCOUNTS,TEMPLATE_CALLBACK_ACCOUNTS);
  }
  else
  {
    jwtresponse = createJWT("payments",localStorage.nonce,CLIENT_ID_PAYMENTS,TEMPLATE_CALLBACK_PAYMENTS); 
  }
  $('#authoriseInput input[name=requestInput]').val(jwtresponse);

  $("div[data-role=oauth2_modal] a.button_savenew_modal").unbind("click");
  $("div[data-role=oauth2_modal] a.button_savenew_modal").on("click", showPermissions);

}


function showPermissions()
{
  $('div[data-role=oauth2_modal] div.modal-header h3.modal-title').text("Request Permissions");
  $('div[data-role=oauth2_modal] div.modal-body #authoriseInput').hide();
  $('div[data-role=oauth2_modal] div.modal-body div.content').show();
  $('div[data-role=oauth2_modal] div.modal-footer p').show();

  $("div[data-role=oauth2_modal] a.button_savenew_modal").unbind("click");
  $("div[data-role=oauth2_modal] a.button_savenew_modal").on("click", OpenAuthURL);

}

function OpenAuthURL(event)
 {

  populateDefaults();
    ResetAndCancel();
    event.preventDefault();
    var authUrl = "";
    if(localStorage.ccScope == "accounts")
     {
      authUrl = BASE_URL+"/apis/v1.0/oauth/authorize?response_type=code&client_id="+CLIENT_ID_ACCOUNTS+"&state=abcd1234&scope=openid accounts&redirect_uri="+TEMPLATE_CALLBACK_ACCOUNTS;
     }

     else
     {
      authUrl = BASE_URL+"/apis/v1.0/oauth/authorize?response_type=code&client_id="+CLIENT_ID_PAYMENTS+"&state=abcd1234&scope=openid payments&redirect_uri="+TEMPLATE_CALLBACK_PAYMENTS;

     }
      authUrl+="&request="+ $('#authoriseInput input[name=requestInput]').val();
      authUrl+="&nonce="+ localStorage.nonce;
      var oauth2Window =  window.open(authUrl, "oauth2Window", "resizable=yes,scrollbars=yes,status=1,toolbar=1,height=500,width=500");
   
 }


 function populateDefaults()
{

$("ul.headerParamSection input[name=x-fapi-financial-id]").val($("input[name=financialIdInput]").val());
$("ul.headerParamSection input[name=x-fapi-customer-ip-address]").val("123456");
$("ul.headerParamSection input[name=x-idempotency-key]").val($("input[name=idempotencyInput]").val());

}

function showError(errorMessage)
{
    jQuery("[data-role='error_container']").html(errorMessage).show();
    jQuery("body").scrollTop(0); // Scroll to page's top position.
}

 function createJWT(scope,nonce,client_id,callback_url)
{
    var jwtBody = {
    "iss": "https://api.openbank.com",
    "response_type": "code",
    "client_id": client_id,
    "redirect_uri": callback_url,
    "scope": "openid "+scope,
    "state": "abcd1234",
    "nonce": nonce,
    "claims": {
      "id_token": {
        "openbanking_intent_id": {
          "value": "urn:openbank:intent:"+scope +":"+localStorage.RequestId,
          "essential": true
        },
        "acr": {
          "essential": true
        }
      }
    },
    "iat": 1504521455,
    "exp": 1604525055
  };


//var jws = new KJUR.jws.JWS();

var jwt = getJsonWebToken(JOSE_HEADER, jwtBody);

  return jwt;
}



function getJWS(payload)
{
  var responsePayload = JSON.parse(payload);
  responsePayload = JSON.stringify(responsePayload);
  var jwt = getJsonWebToken(JOSE_HEADER, JSON.parse(responsePayload));
  detachedJWT = jwt.split(".");
  var detachedJws = detachedJWT[0] + ".." + detachedJWT[2];
  return detachedJws; 
}


function getJWSClientAssertion(payload)
{
  var responsePayload = JSON.parse(payload);
  responsePayload = JSON.stringify(responsePayload);
  var client_assertion_header = { "alg": "RS256", "expiresIn": "1h"}
  var jwt = getJsonWebToken(client_assertion_header, JSON.parse(responsePayload));
  //detachedJWT = jwt.split(".");
  //var detachedJws = detachedJWT[0] + ".." + detachedJWT[2];
  return jwt; 
}

    

 function closeAuthModal() 
 {
    jQuery('[role="dialog"].modal').modal('hide');
    jQuery('[role="dialog"].modal input').removeClass('error'); // Remove error class from the input boxes.
    jQuery('[role="dialog"].modal .error_container').hide().html(''); // Empty the error container and hide it.
    //return false;
  };

 

 function ResetAndCancel()
{
  closeAuthModal();
  $('div[data-role=oauth2_modal] div.modal-header h3.modal-title').val("Step 1: Get Client Credential Access Token");
  $('div[data-role=oauth2_modal] div.modal-body div.content').hide();
  $('div[data-role=oauth2_modal] div.modal-footer p').hide();
  $('div[data-role=oauth2_modal] div.modal-body #showRequest').hide();
  $('div[data-role=oauth2_modal] div.modal-body #authoriseInput').hide();
  $('div[data-role=oauth2_modal] div.modal-body #clientCredentialBody').show();
  $("div[data-role=oauth2_modal] a.button_savenew_modal").unbind("click");
  $("div[data-role=oauth2_modal] a.button_savenew_modal").on("click", getClient_credentialAccessToken);

}


function showJWSButton()
{
  if($("ul.headerParamSection input[name=x-jws-signature]").length >0)
  {
  var $input = $('<button type="button" class="btn btn-primary createjwtButton" value="Create JWT">Create JWT</button>');
    $input.appendTo($("ul.headerParamSection input[name=x-jws-signature]").parent().next());


    $('.createjwtButton').on("click",openJWSDialog);

  }

  if($("div.body-parameters-wrapper input[name=client_assertion]").length >0)
  {
    var $input = $('<button type="button" class="btn btn-primary createjwtButtonClientAssertion" value="Create JWT">Create JWT</button>');
    $input.appendTo($("div.body-parameters-wrapper input[name=client_assertion]").parent().next());


    $('.createjwtButtonClientAssertion').on("click",openJWSDialogClientAssertion);

  }
    var $jwtDialogDiv = $('<div id="myModal" class="modal fade in" role="dialog"><div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <h3 class="modal-title">Create JWT</h3> </div> <span class="close-modal">&times;</span> <table> <tr> <td> <label>Payload<label> </td> <td> <textarea name="jwt_payload" rows="8" cols="50"></textarea> </td> </tr> <table> <p class="modal-footer"><button class="btn btn-primary button_createJWS" type="button">Create</button>&nbsp <button type="button" class="btn btn-primary button_cacelDialog">Cancel</button> </p> </div> </div></div>');
    $jwtDialogDiv.appendTo($('body'));

    $('button.button_createJWS').on("click",createJWTFromPayload);
    $('button.button_cacelDialog').on("click",closeDialog);
    $('span.close-modal').on("click",closeDialog);
  

  
  
}

function openJWSDialog()
{
  localStorage.jwtFor = "x-jws-signature";
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
  $('textarea[name=jwt_payload]').val(window.apiModelEditor.getRequestPayLoad());
}

function openJWSDialogClientAssertion()
{
  localStorage.jwtFor = "clientAssertion";
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
  $('textarea[name=jwt_payload]').val('{ "iss": "' + CLIENT_ID_ACCOUNTS + '" }');
}

function createJWTFromPayload()
{
  var jws = "";
  
  if(localStorage.jwtFor == "x-jws-signature")
  {
    jws = getJWS($('textarea[name=jwt_payload]').val());
    $("ul.headerParamSection input[name=x-jws-signature]").val(jws);
  }

  else if (localStorage.jwtFor == "clientAssertion")
  {
    jws = getJWSClientAssertion($('textarea[name=jwt_payload]').val());
    $("div.body-parameters-wrapper input[name=client_assertion]").val(jws); 
  }
  var modal = document.getElementById('myModal');
  modal.style.display = "none";
  //$("#dialogJWT").dialog("close");
}

function closeDialog()
{
  var modal = document.getElementById('myModal');
  modal.style.display = "none";

}

  });

})(jQuery)
