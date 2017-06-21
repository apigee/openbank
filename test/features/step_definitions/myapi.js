/* jslint node: true */
'use strict';

var apickli = require('apickli');

module.exports = function() {
	// cleanup before every scenario
	this.Before(function(scenario, callback) {
		this.apickli = new apickli.Apickli('https', '{{ edgePath }}');
    this.apickli.sessionId = "";
    this.apickli.accessToken = "";
		callback();
	});
  this.Then(/^I set sessionId from (.*) header$/, function (header, callback) 
  {
        var location = this.apickli.getResponseObject().headers[header.toLowerCase()];
        

        if(location)
        {
          var sessionId = location.split("?")[1].split("=")[1];
          

        if (sessionId)
        {
          this.apickli.sessionId = sessionId;
          
        }
        callback();
      }
    });

  this.When(/^I POST openbank request to (.*)$/, function (resource, callback) 
    {
      var resource1 = resource + "/" + this.apickli.sessionId;

        this.apickli.post(resource1, function (error, response) {
            if (error) {
                callback(new Error(error));
            }

            callback();
        });
    });
  this.Then(/^I set accessToken from (.*)$/, function (responseparam, callback) 
  {
        var response = JSON.parse(this.apickli.getResponseObject().body);
        response = response[responseparam];
    

        if(response)
        {
          var response = response.split("&");

        
          for(var i=0; i<response.length; i++)
          {

            if(response[i].indexOf("access_token") >= 0)
            {
              var token = response[i].split("=")[1];
              this.apickli.accessToken = token;

            }
          }

        
        callback();
      }
    });
  this.Given(/^I set openbank Authorization header$/, function ( callback) 
  {
        var headerValue = "Bearer" + " " + this.apickli.accessToken;
        this.apickli.addRequestHeader("Authorization", headerValue);
        callback();
    });

  this.Given(/^I set payment submission body$/, function ( callback) 
  {
        var requestbody = '{"PaymentId":"firstpaymentrequest","CreditorAccount": {"Identification": "1287432455","SchemeName": "HJKI","Name": "uiy"},"CreditorAgent": {"Identification": "EX1","SchemeName": "TYI"},"DebtorAccount": {"Identification": "2139531801","SchemeName": "TYCV","Name": "GHIL"},"DebtorAgent": {"Identification": "906745","SchemeName": "EW"},"EndToEndIdentification": "ACME6712","InstructedAmount": {"Amount": "678","Currency": "INR"},"InstructionIdentification": "kjhnbvcxsderthg","MerchantCategoryCode": "RET56","RemittanceInformation": {"Unstructured": "lkjhertyuv","CreditorReferenceInformation": "nghhahebghas"}}'
        this.apickli.setRequestBody(requestbody);
        callback();
    });


	/*this.Given(/^I set User\-Agent header to apickli$/, function (callback) {
         // Write code here that turns the phrase above into concrete actions
         callback(null, 'pending');
       });
	this.When(/^I GET \/get$/, function (callback) {
         // Write code here that turns the phrase above into concrete actions
         callback(null, 'pending');
       });
	this.Then(/^response body path \$\.headers\.User\-Agent should be apickli$/, function (callback) {
         // Write code here that turns the phrase above into concrete actions
         callback(null, 'pending');
       });*/
};
