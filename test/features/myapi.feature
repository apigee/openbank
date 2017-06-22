Feature:
	Httpbin.org exposes various resources for HTTP request testing
	As Httpbin client I want to verify that all API resources are working as they should


	Scenario: Getting ATM details of the bank
		When I GET /apis/v2/locations/atms
		Then response code should be 200

	Scenario: Getting Product details of the bank
		When I GET /apis/v1/products
		Then response code should be 200

	Scenario: Getting Account Information when invalid access Token given 
		Given I set Authorization header to Bearer abcdefghijklmno
		When I GET /apis/v2/accounts/
		Then response code should be 401


	Scenario: Getting Account Information with valid Access Token 
		When I GET /apis/v2/oauth/authorize?client_id={{AISP_key}}&redirect_uri=http://localhost/&response_type=token&state=af0ifjsldkj&scope=account_request&acr_values=2&request_id=firstaccountrequest
		Then response code should be 302
		Then response header Location should exist

		Then I set sessionId from Location header

		Given I set Content-Type header to application/json
		Given I set body to {"customerId":"123456789" , "type":"account_request"}
		Given I set x-apikey header to {{internalKey}}

		When I POST openbank request to /apis/v2/oauth/authorized
		Then response code should be 200
		Then response body should contain application_tx_response

		Then I set accessToken from application_tx_response

		Given I set openbank Authorization header
		When I GET /apis/v2/accounts/
		Then response code should be 200

		When I GET /apis/v2/accounts/balance
		Then response code should be 200

	Scenario: Make Payment submission with invalid access token
		Given I set Authorization header to Bearer abcdefghijklmno
		Given I set payment submission body
		When I POST to /apis/v2/payments/payment-submissions
		Then response code should be 401

	Scenario: Make Payment Submission
		When I GET /apis/v2/oauth/authorize?client_id={{PISP_key}}&redirect_uri=http://localhost/&response_type=token&state=af0ifjsldkj&scope=payment_request&acr_values=2&request_id=firstpaymentrequest
		Then response code should be 302
		Then response header Location should exist

		Then I set sessionId from Location header

		Given I set Content-Type header to application/json
		Given I set body to {"customerId":"123456789" , "type":"payment_request"}
		Given I set x-apikey header to {{internalKey}}

		When I POST openbank request to /apis/v2/oauth/authorized
		Then response code should be 200
		Then response body should contain application_tx_response

		Then I set accessToken from application_tx_response

		Given I set openbank Authorization header
		Given I set payment submission body
		When I POST to /apis/v2/payments/payment-submissions
		Then response code should be 200

		


	
