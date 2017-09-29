Feature:
  Payment Features


  #Happy scenario
  Scenario: Complete Successful payment flow
    Given Tpp obtains client credential accesstoken for payments claim and store in scenario scope
    And TPP set body to {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP creates x-jws-signature with default headers for the body {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP sets the request headers
      | name                | value                               |
      | Content-Type        | application/json                    |
      | Authorization       | Bearer `accesstoken_cc`             |
      | Accept              | application/json                    |
      | x-idempotency-key   | 93bac548-d2de-4546-b106-880a5018460 |
      | x-fapi-financial-id | OB/2017/001                         |
      | x-jws-signature     | `x-jws-signature`                   |
    When the TPP makes the POST /pis/open-banking/v1.0/payments
    And response body should be valid according to openapi description PaymentResponse in file ../openapi/paymentv1-0.json
    And response code should be 201
    And TPP stores the value of body path $.Data.PaymentId as paymentRequestId in scenario scope
    Then TPP verifies the body with the x-jws-signature in the header
    Given TPP sets the request queryParams and creates the request Object And User makes authorize call and redirected to login
      | parameter     | value                                           |
      | client_id     | `TPPAppClientIdPayment`                         |
      | redirect_uri  | http://localhost/                               |
      | state         | state123                                        |
      | scope         | openid payments                                 |
      | response_type | code id_token                                   |
      | urns          | urn:openbank:intent:payments:`paymentRequestId` |
      | nonce         | nonce123                                        |
    When User enters rohan and Qwerty123 and submits the form
    Given Login Succeeds
    And User selects the 111111111 from the dropdown on consent page and submits
    Given Consent Succeeds
    When User enter the otp 4567 on sms verification page and submits the form
    Then OTP verification Succeeds and User is redirected with auth code stored in scenario scope
    Given Tpp obtains accesstoken for payments claim from authcode and stores in scenario scope
    And TPP set body to {"Data":{"PaymentId":"`paymentRequestId`","Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","CountySubDivision":["Wessex"],"Country":"UK"}}}
    And TPP creates x-jws-signature with default headers for the body {"Data":{"PaymentId":"`paymentRequestId`","Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","CountySubDivision":["Wessex"],"Country":"UK"}}}
    And TPP sets the request headers
      | name                | value                                |
      | Content-Type        | application/json                     |
      | Authorization       | Bearer `accesstoken`                 |
      | Accept              | application/json                     |
      | x-idempotency-key   | 93bac548-d2de-4546-b106-880a5018460d |
      | x-fapi-financial-id | OB/2017/001                          |
      | x-jws-signature     | `x-jws-signature`                    |
    When the TPP makes the POST /pis/open-banking/v1.0/payment-submissions
    And response body should be valid according to openapi description PaymentSubmissionResponse in file ../openapi/paymentv1-0.json
    And response code should be 201
    Then TPP verifies the body with the x-jws-signature in the header
