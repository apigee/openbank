Feature:
  Auth Features

  Scenario: TPP create a clientAssertion JWT
    Given TPP create a client Assertion JWT and stores in the global variable

#TPP fetching the access token with the client_credentials
  Scenario Outline: TPP making a client credential call for access token
    Given TPP sets the request formBody
      | parameter             | value                                                            |
      | grant_type            | <type>                                                           |
      | scope                 | <scope>                                                          |
      | client_assertion_type | urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer |
      | client_assertion      | <jwtCredentials>                                                 |
    And Tpp sets Content-Type header to application/x-www-form-urlencoded
    When the TPP makes the POST /apis/v1.0.1/oauth/token
    Then response code should be <responseCode>

    Examples:
      | type               | scope             | jwtCredentials     | responseCode |

      | client_credentials | accounts payments | `clientAssertion`  | 200          |
      | client_credentials | accounts          | `clientAssertion`  | 200          |
      | client_credentials | payments          | `clientAssertion`  | 200          |
      | client_credentials | accounts payments | invalidCredentials | 401          |
      | wrongGrantType     | accounts payments | `clientAssertion`  | 400          |
      | client_credentials | other             | `clientAssertion`  | 200          |

#TPP creates the requests
Scenario: Tpp obtains an access token and stores in global scope
    Given Tpp obtains client credential accesstoken for accounts claim and store in scenario scope
    #create account request
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    And TPP creates x-jws-signature for accounts with default headers for the body {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    And TPP sets the request headers
      | name                | value                               |
      | Content-Type        | application/json                    |
      | Authorization       | Bearer `accounts_accesstoken_cc`             |
      | Accept              | application/json                    |
      | x-idempotency-key   | 93bac547-d2de-4546-b106-880a50184a0 |
      | x-fapi-financial-id | OB/2017/001                         |
      | x-jws-signature     | `accounts-x-jws-signature`                   |
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    And response code should be 201
    And TPP stores the value of body path $.Data.AccountRequestId as GlobalAccountRequestId1 in global scope
    
    Given Tpp obtains client credential accesstoken for accounts claim and store in scenario scope
    #create account request
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    And TPP creates x-jws-signature for accounts with default headers for the body {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    And TPP sets the request headers
      | name                | value                               |
      | Content-Type        | application/json                    |
      | Authorization       | Bearer `accounts_accesstoken_cc`             |
      | Accept              | application/json                    |
      | x-idempotency-key   | 93bac547-d2de-4546-b106-880a50184a0 |
      | x-fapi-financial-id | OB/2017/001                         |
      | x-jws-signature     | `accounts-x-jws-signature`                   |
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    And response code should be 201
    And TPP stores the value of body path $.Data.AccountRequestId as GlobalAccountRequestId5 in global scope
    Given Tpp obtains client credential accesstoken for accounts claim and store in scenario scope
    #create account request
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    And TPP creates x-jws-signature for accounts with default headers for the body {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    And TPP sets the request headers
      | name                | value                               |
      | Content-Type        | application/json                    |
      | Authorization       | Bearer `accounts_accesstoken_cc`             |
      | Accept              | application/json                    |
      | x-idempotency-key   | 93bac547-d2de-4546-b106-880a50184a0 |
      | x-fapi-financial-id | OB/2017/001                         |
      | x-jws-signature     | `accounts-x-jws-signature`                   |
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    And response code should be 201
    And TPP stores the value of body path $.Data.AccountRequestId as GlobalAccountRequestId6 in global scope
    Given Tpp obtains client credential accesstoken for accounts claim and store in scenario scope
    #create account request
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    And TPP creates x-jws-signature for accounts with default headers for the body {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    And TPP sets the request headers
      | name                | value                               |
      | Content-Type        | application/json                    |
      | Authorization       | Bearer `accounts_accesstoken_cc`             |
      | Accept              | application/json                    |
      | x-idempotency-key   | 93bac547-d2de-4546-b106-880a50184a0 |
      | x-fapi-financial-id | OB/2017/001                         |
      | x-jws-signature     | `accounts-x-jws-signature`                   |
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    And response code should be 201
    And TPP stores the value of body path $.Data.AccountRequestId as GlobalAccountRequestId7 in global scope

    Given Tpp obtains client credential accesstoken for payments claim and store in scenario scope
    #create payment request
    And TPP set body to {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP creates x-jws-signature with default headers for the body {"Data":{"Initiation":{"InstructionIdentification":"ACME412","EndToEndIdentification":"FRESCO.21302.GFX.20","InstructedAmount":{"Amount":"165.88","Currency":"GBP"},"CreditorAccount":{"SchemeName":"SortCodeAccountNumber","Identification":"08080021325698","Name":"ACMEInc","SecondaryIdentification":"0002"},"RemittanceInformation":{"Reference":"FRESCO-101","Unstructured":"Internalopscode5120101"}}},"Risk":{"PaymentContextCode":"EcommerceGoods","MerchantCategoryCode":"5967","MerchantCustomerIdentification":"053598653254","DeliveryAddress":{"AddressLine":["Flat7","AcaciaLodge"],"StreetName":"AcaciaAvenue","BuildingNumber":"27","PostCode":"GU312ZZ","TownName":"Sparsholt","Country":"UK"}}}
    And TPP sets the request headers
      | name                | value                               |
      | Content-Type        | application/json                    |
      | Authorization       | Bearer `accesstoken_cc`             |
      | Accept              | application/json                    |
      | x-idempotency-key   | 93bac547-d2de-4546-b106-880a50184a4 |
      | x-fapi-financial-id | OB/2017/001                         |
      | x-jws-signature     | `x-jws-signature`                   |
    When the TPP makes the POST /pis/open-banking/v1.0.1/payments
    And response code should be 201
    And TPP stores the value of body path $.Data.PaymentId as paymentRequestId in global scope


#TPP redirects the /authorize call to the user
  Scenario Outline: TPP creates the request object
    Given TPP sets the request queryParams and creates the request Object
      | parameter     | value          |
      | client_id     | <clientId>     |
      | redirect_uri  | <redirectUri>  |
      | state         | <state>        |
      | scope         | <scope>        |
      | response_type | <responseType> |
      | urns          | <urns>         |
      | nonce         | <nonce>        |
    When the TPP makes the GET /apis/v1.0.1/oauth/authorize
    Then response code should be <responseCode>

    Examples:
      | clientId         | redirectUri                          | state    | nonce | scope                    | responseType  | description                         | responseCode | urns                                                                |

      | invalidClientId  | http://localhost/                    | abcd1234 | 1     | openid accounts payments | code id_token |                                     | 401          | urn:openbank:intent:accounts:1001                                   |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 2     | openid invalidScope      | code id_token | urn:openbank:intent:accounts:1001   | 400          | urn:openbank:intent:accounts:1001                                   |
      | `TPPAppClientId` | http://localhost/notValidRedirectUri | abcd1234 | 3     | openid accounts          | code id_token | urn:openbank:intent:accounts:1001   | 400          | urn:openbank:intent:accounts:1001                                   |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 4     | openid accounts          | code id_token | invalidURN                          | 400          | invalidURN                                                          |

      #| `validClientId` | http://localhost/                    | abcd1234 | 6 | openid accounts          | code id_token | onlyPaymentClaimURN                 | 400          |                                                                     |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 7     | openid payments          | code id_token | onlyAccountClaimURN                 | 400          | urn:openbank:intent:accounts:1001                                   |
      
      #| `validClientId` | http://localhost/                    | abcd1234 | 10 | openid accounts          | code id_token | multipleClaimWithoutAccountClaimURN | 400          | |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 12    | openid payments          | code id_token | multipleClaimWithoutPaymentClaimURN | 400          | urn:openbank:intent:accounts:1001,urn:openbank:intent:accounts:1001 |
      
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 18    | openid accounts payments | code id_token | noClaimURN                          | 400          |                                                                     |

  Scenario: Redirect to log in page 1 accountclaim urn
    Given TPP sets the request queryParams and creates the request Object And User makes authorize call and redirected to login
      | parameter     | value             |
      | client_id     | `TPPAppClientId`  |
      | redirect_uri  | http://localhost/ |
      | state         | abcd1234          |
      | scope         | openid accounts   |
      | response_type | code id_token     |
      | urns          | urn:openbank:intent:accounts:`GlobalAccountRequestId1`             |
      | nonce         | n1           |
    When the TPP makes the GET /apis/v1.0.1/oauth/authorize
    Then response code should be 302