Feature:
  Payment Features


#Happy scenario
  Scenario: Complete Successful payment flow
    Given Tpp obtains client credential accesstoken for payments claim and store in scenario scope
    #create payment request
    And TPP set body to {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP creates x-jws-signature with default headers for the body {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP sets the request headers
      | name                | value                               |
      | Content-Type        | application/json                    |
      | Authorization       | Bearer `accesstoken_cc`             |
      | Accept              | application/json                    |
      | x-idempotency-key   | 93bac547-d2de-4546-b106-880a50184jq |
      | x-fapi-financial-id | OB/2017/001                         |
      | x-jws-signature     | `x-jws-signature`                   |
    When the TPP makes the POST /pis/open-banking/v1.0.1/payments
    And response code should be 201
    And TPP stores the value of body path $.Data.PaymentId as paymentRequestId in scenario scope

    #Get payment request
    Given TPP sets the request headers
      | name                | value                   |
      | Content-Type        | application/json        |
      | Authorization       | Bearer `accesstoken_cc` |
      | Accept              | application/json        |
      | x-fapi-financial-id | OB/2017/001             |
    And TPP set body to {}
    When the TPP makes the GET /pis/open-banking/v1.0.1/payments/`paymentRequestId`
    And response code should be 200
    Then response body path $.Data.Status should be Pending

    #authorise with the payment request Id
    Given TPP sets the request queryParams and creates the request Object And User makes authorize call and redirected to login
      | parameter     | value                                           |
      | client_id     | `TPPAppClientIdPayment`                         |
      | redirect_uri  | http://localhost/                               |
      | state         | state123                                        |
      | scope         | openid payments                                 |
      | response_type | code id_token                                   |
      | urns          | urn:openbank:intent:payments:`paymentRequestId` |
      | nonce         | nonce31q                                        |
    When User enters user123 and Qwerty123 and submits the form
    Given Login Succeeds
    And User selects the 111111111 from the dropdown on consent page and submits
    Given Consent Succeeds
    When User enter the otp 4567 on sms verification page and submits the form
    Then OTP verification Succeeds and User is redirected with auth code stored in scenario scope
    Given Tpp obtains accesstoken for payments claim from authcode and stores in scenario scope

        #Get payment request
    Given TPP sets the request headers
      | name                | value                   |
      | Content-Type        | application/json        |
      | Authorization       | Bearer `accesstoken_cc` |
      | Accept              | application/json        |
      | x-fapi-financial-id | OB/2017/001             |
    And TPP set body to {}
    When the TPP makes the GET /pis/open-banking/v1.0.1/payments/`paymentRequestId`
    And response code should be 200
    Then response body path $.Data.Status should be AcceptedTechnicalValidation

    #make payment submission
    And TPP set body to {"Data":{"PaymentId":"`paymentRequestId`","Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","CountySubDivision":["Wessex"],"Country":"UK"}}}
    And TPP creates x-jws-signature with default headers for the body {"Data":{"PaymentId":"`paymentRequestId`","Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","CountySubDivision":["Wessex"],"Country":"UK"}}}
    And TPP sets the request headers
      | name                | value                               |
      | Content-Type        | application/json                    |
      | Authorization       | Bearer `accesstoken`                |
      | Accept              | application/json                    |
      | x-idempotency-key   | 93bac547-d2de-4546-b106-880a50184b03 |
      | x-fapi-financial-id | OB/2017/001                         |
      | x-jws-signature     | `x-jws-signature`                   |
    When the TPP makes the POST /pis/open-banking/v1.0.1/payment-submissions
    And response code should be 201
    And TPP stores the value of body path $.Data.PaymentSubmissionId as paymentSubmissionId in scenario scope

    #get payment submission
    Given TPP sets the request headers
      | name                | value                   |
      | Content-Type        | application/json        |
      | Authorization       | Bearer `accesstoken_cc` |
      | Accept              | application/json        |
      | x-fapi-financial-id | OB/2017/001             |
    And TPP set body to {}
    When the TPP makes the GET /pis/open-banking/v1.0.1/payment-submissions/`paymentSubmissionId`
    And response code should be 200
    Then response body path $.Data.Status should be AcceptedSettlementInProcess

#payment request scenarios
  Scenario Outline: invalid request header values
    Given Tpp obtains client credential accesstoken for payments claim and store in scenario scope
    And TPP set body to {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP creates x-jws-signature with default headers for the body <jwsSignature>
    And TPP sets the request headers
      | name                | value             |
      | Content-Type        | <contentType>     |
      | Authorization       | <authorisation>   |
      | Accept              | <accept>          |
      | x-idempotency-key   | <idempotencyKey>  |
      | x-fapi-financial-id | <financialId>     |
      | x-jws-signature     | `x-jws-signature` |
    When the TPP makes the POST /pis/open-banking/v1.0.1/payments
    And response code should be <statusCode>

    Examples:

      | contentType      | authorisation           | accept           | idempotencyKey                      | financialId | jwsSignature                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | statusCode |
      # valid
      | application/json | Bearer `accesstoken_cc` | application/json | 93bac547-d2de-4546-b106-880a50182c0 | OB/2017/001 | {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}} | 201        |
      # wrong access token
      | application/json | Bearer wrongbearertoken | application/json | 93bac547-d2de-4546-b106-880a50182d1 | OB/2017/001 | {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}} | 401        |
      # wrong content type
      | application/xml  | Bearer `accesstoken_cc` | application/json | 93bac547-d2de-4546-b106-880a50182e2 | OB/2017/001 | {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}} | 401        |
      # wrong accept type
      | application/json | Bearer `accesstoken_cc` | application/xml  | 93bac547-d2de-4546-b106-880a50182f3 | OB/2017/001 | {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}} | 406        |
      # invalid idempotency
      | application/json | Bearer `accesstoken_cc` | application/json |                                     | OB/2017/001 | {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}} | 401        |
      # invalid jws signature
      | application/json | Bearer `accesstoken_cc` | application/json | 93bac547-d2de-4546-b106-880a50182g4 | OB/2017/001 | {"json":"wrongBody"}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 400        |


  Scenario: Idempotency check
    Given Tpp obtains client credential accesstoken for payments claim and store in scenario scope
    And TPP set body to {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP creates x-jws-signature with default headers for the body {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP sets the request headers
      | name                | value                               |
      | Content-Type        | application/json                    |
      | Authorization       | Bearer `accesstoken_cc`             |
      | Accept              | application/json                    |
      | x-idempotency-key   | 93bac547-d2de-4546-b106-880a50184h7 |
      | x-fapi-financial-id | OB/2017/001                         |
      | x-jws-signature     | `x-jws-signature`                   |
    When the TPP makes the POST /pis/open-banking/v1.0.1/payments
    And response code should be 201
    And TPP stores the value of body path $.Data.PaymentId as paymentRequestId in scenario scope
    #second request with same idempotency key
    Given TPP set body to {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP creates x-jws-signature with default headers for the body {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP sets the request headers
      | name                | value                               |
      | Content-Type        | application/json                    |
      | Authorization       | Bearer `accesstoken_cc`             |
      | Accept              | application/json                    |
      | x-idempotency-key   | 93bac547-d2de-4546-b106-880a50184h7 |
      | x-fapi-financial-id | OB/2017/001                         |
      | x-jws-signature     | `x-jws-signature`                   |
    When the TPP makes the POST /pis/open-banking/v1.0.1/payments
    And response code should be 201
    Then TPP asserts the value of body path $.Data.PaymentId with scenario variable paymentRequestId


##payment submission request scenarios
  Scenario Outline: invalid request header values
    Given Tpp obtains client credential accesstoken for payments claim and store in scenario scope
    #create payment request
    And TPP set body to {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP creates x-jws-signature with default headers for the body {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP sets the request headers
      | name                | value                   |
      | Content-Type        | application/json        |
      | Authorization       | Bearer `accesstoken_cc` |
      | Accept              | application/json        |
      | x-idempotency-key   | 9<idempotencyKey>       |
      | x-fapi-financial-id | OB/2017/001             |
      | x-jws-signature     | `x-jws-signature`       |
    When the TPP makes the POST /pis/open-banking/v1.0.1/payments
    And response code should be 201
    And TPP stores the value of body path $.Data.PaymentId as paymentRequestId in scenario scope

    #authorise with the payment request Id
    Given TPP sets the request queryParams and creates the request Object And User makes authorize call and redirected to login
      | parameter     | value                                           |
      | client_id     | `TPPAppClientIdPayment`                         |
      | redirect_uri  | http://localhost/                               |
      | state         | state123                                        |
      | scope         | openid payments                                 |
      | response_type | code id_token                                   |
      | urns          | urn:openbank:intent:payments:`paymentRequestId` |
      | nonce         | n<idempotencyKey>                               |
    When User enters user123 and Qwerty123 and submits the form
    Given Login Succeeds
    And User selects the 111111111 from the dropdown on consent page and submits
    Given Consent Succeeds
    When User enter the otp 4567 on sms verification page and submits the form
    Then OTP verification Succeeds and User is redirected with auth code stored in scenario scope
    Given Tpp obtains accesstoken for payments claim from authcode and stores in scenario scope

    #make payment submission
    And TPP set body to {"Data":{"PaymentId":"`paymentRequestId`","Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","CountySubDivision":["Wessex"],"Country":"UK"}}}
    And TPP creates x-jws-signature with default headers for the body <jwsSignature>
    And TPP sets the request headers
      | name                | value             |
      | Content-Type        | <contentType>     |
      | Authorization       | <authorisation>   |
      | Accept              | <accept>          |
      | x-idempotency-key   | <idempotencyKey>  |
      | x-fapi-financial-id | <financialId>     |
      | x-jws-signature     | `x-jws-signature` |
    When the TPP makes the POST /pis/open-banking/v1.0.1/payment-submissions
    And response code should be <statusCode>

    Examples:
      | contentType      | authorisation           | accept           | idempotencyKey                      | financialId | jwsSignature                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | statusCode |
      # valid
      | application/json | Bearer `accesstoken`    | application/json | 93bac547-d2de-4546-b106-880a50182j0 | OB/2017/001 | {"Data":{"PaymentId":"`paymentRequestId`","Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","CountySubDivision":["Wessex"],"Country":"UK"}}} | 201        |
      # wrong access token
      | application/json | Bearer wrongbearertoken | application/json | 93bac547-d2de-4546-b106-880a50182k1 | OB/2017/001 | {"Data":{"PaymentId":"`paymentRequestId`","Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","CountySubDivision":["Wessex"],"Country":"UK"}}} | 401        |
      # wrong content type
      | application/xml  | Bearer `accesstoken`    | application/json | 93bac547-d2de-4546-b106-880a50182l2 | OB/2017/001 | {"Data":{"PaymentId":"`paymentRequestId`","Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","CountySubDivision":["Wessex"],"Country":"UK"}}} | 400        |
      # wrong accept type
      | application/json | Bearer `accesstoken`    | application/xml  | 93bac547-d2de-4546-b106-880a50182m3 | OB/2017/001 | {"Data":{"PaymentId":"`paymentRequestId`","Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","CountySubDivision":["Wessex"],"Country":"UK"}}} | 406        |
      # invalid idempotency
      | application/json | Bearer `accesstoken`    | application/json |                                     | OB/2017/001 | {"Data":{"PaymentId":"`paymentRequestId`","Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","CountySubDivision":["Wessex"],"Country":"UK"}}} | 400        |
      # invalid jws signature
      | application/json | Bearer `accesstoken`    | application/json | 93bac547-d2de-4546-b106-880a50182n4 | OB/2017/001 | {"json":"wrongBody"}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 400        |
