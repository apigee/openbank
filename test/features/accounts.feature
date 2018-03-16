Feature:
  Accounts Features

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
    And TPP stores the value of body path $.Data.AccountRequestId as GlobalAccountRequestId in global scope
    Given TPP sets the request queryParams and creates the request Object And User makes authorize call and redirected to login
      | parameter     | value                                           |
      | client_id     | `TPPAppClientId`                         |
      | redirect_uri  | http://localhost/                               |
      | state         | state123                                        |
      | scope         | openid accounts                                 |
      | response_type | code id_token                                   |
      | urns          | urn:openbank:intent:accounts:`GlobalAccountRequestId` |
      | nonce         | nonce90901                                        |
    When User enters user123 and Qwerty123 and submits the form
    Given Login Succeeds
    And User selects the 987654321 on consent page and submits the form
    Given Consent Succeeds
    When User enter the otp 8976 on sms verification page and submits the form
    Then OTP verification Succeeds and User is redirected with auth code stored in scenario scope
    Given Tpp obtains accesstoken for accounts claim from authcode and stores in global scope

    
  Scenario: Tpp obtains an access token for account with no data and stores in global scope
    Given Tpp obtains client credential accesstoken for accounts claim and store in scenario scope
    #create account request
    And TPP set body to {"Data":{"TransactionToDateTime":"2017-05-08T00:00:00-00:00","ExpirationDateTime":"2025-05-02T00:00:00-00:00","Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"TransactionFromDateTime":"2017-05-03T00:00:00-00:00"},"Risk":{}}
    And TPP creates x-jws-signature for accounts with default headers for the body {"Data":{"TransactionToDateTime":"2017-05-08T00:00:00-00:00","ExpirationDateTime":"2025-05-02T00:00:00-00:00","Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"TransactionFromDateTime":"2017-05-03T00:00:00-00:00"},"Risk":{}}
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
    And TPP stores the value of body path $.Data.AccountRequestId as AccountRequestId in scenario scope
    Given TPP sets the request queryParams and creates the request Object And User makes authorize call and redirected to login
      | parameter     | value                                           |
      | client_id     | `TPPAppClientId`                         |
      | redirect_uri  | http://localhost/                               |
      | state         | state123                                        |
      | scope         | openid accounts                                 |
      | response_type | code id_token                                   |
      | urns          | urn:openbank:intent:accounts:`AccountRequestId` |
      | nonce         | nonce90911                                         |
    When User enters user123 and Qwerty123 and submits the form
    Given Login Succeeds
    And User selects the 111111111 on consent page and submits the form
    Given Consent Succeeds
    When User enter the otp 8976 on sms verification page and submits the form
    Then OTP verification Succeeds and User is redirected with auth code stored in scenario scope
    Given Tpp obtains accesstoken for accounts claim with no associated data and stores in global scope

  Scenario: Tpp obtains an access token for single permission ReadAccountsDetail for accessing resource and stores in global scope
    Given Tpp obtains client credential accesstoken for accounts claim and store in scenario scope
    #create account request
    And TPP set body to {"Data":{"TransactionToDateTime":"2017-05-08T00:00:00-00:00","ExpirationDateTime":"2025-05-02T00:00:00-00:00","Permissions":["ReadAccountsDetail"],"TransactionFromDateTime":"2017-05-03T00:00:00-00:00"},"Risk":{}}
    And TPP creates x-jws-signature for accounts with default headers for the body {"Data":{"TransactionToDateTime":"2017-05-08T00:00:00-00:00","ExpirationDateTime":"2025-05-02T00:00:00-00:00","Permissions":["ReadAccountsDetail"],"TransactionFromDateTime":"2017-05-03T00:00:00-00:00"},"Risk":{}}
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
    And TPP stores the value of body path $.Data.AccountRequestId as AccountRequestId in scenario scope
    Given TPP sets the request queryParams and creates the request Object And User makes authorize call and redirected to login
      | parameter     | value                                           |
      | client_id     | `TPPAppClientId`                         |
      | redirect_uri  | http://localhost/                               |
      | state         | state123                                        |
      | scope         | openid accounts                                 |
      | response_type | code id_token                                   |
      | urns          | urn:openbank:intent:accounts:`AccountRequestId` |
      | nonce         | nonce90921                                        |
    When User enters user123 and Qwerty123 and submits the form
    Given Login Succeeds
    And User selects the 987654321 on consent page and submits the form
    Given Consent Succeeds
    When User enter the otp 8976 on sms verification page and submits the form
    Then OTP verification Succeeds and User is redirected with auth code stored in scenario scope
    Given Tpp obtains accesstoken for accounts claim with permissions ReadAccountsDetail and stores in global scope

  Scenario: Tpp obtains an access token for single permission ReadBalances for accessing resource and stores in global scope
    Given Tpp obtains client credential accesstoken for accounts claim and store in scenario scope
    #create account request
    And TPP set body to {"Data":{"TransactionToDateTime":"2017-05-08T00:00:00-00:00","ExpirationDateTime":"2025-05-02T00:00:00-00:00","Permissions":["ReadBalances"],"TransactionFromDateTime":"2017-05-03T00:00:00-00:00"},"Risk":{}}
    And TPP creates x-jws-signature for accounts with default headers for the body {"Data":{"TransactionToDateTime":"2017-05-08T00:00:00-00:00","ExpirationDateTime":"2025-05-02T00:00:00-00:00","Permissions":["ReadBalances"],"TransactionFromDateTime":"2017-05-03T00:00:00-00:00"},"Risk":{}}
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
    And TPP stores the value of body path $.Data.AccountRequestId as AccountRequestId in scenario scope
    Given TPP sets the request queryParams and creates the request Object And User makes authorize call and redirected to login
      | parameter     | value                                           |
      | client_id     | `TPPAppClientId`                         |
      | redirect_uri  | http://localhost/                               |
      | state         | state123                                        |
      | scope         | openid accounts                                 |
      | response_type | code id_token                                   |
      | urns          | urn:openbank:intent:accounts:`AccountRequestId` |
      | nonce         | nonce90931                                        |
    When User enters user123 and Qwerty123 and submits the form
    Given Login Succeeds
    And User selects the 987654321 on consent page and submits the form
    Given Consent Succeeds
    When User enter the otp 8976 on sms verification page and submits the form
    Then OTP verification Succeeds and User is redirected with auth code stored in scenario scope
    Given Tpp obtains accesstoken for accounts claim with permissions ReadBalances and store in global scope

  Scenario: Tpp obtains an client credentials access token and stores in global scope
    Given TPP obtains the oauth accesstoken-client credentials with accounts scope and store in global scope

  Scenario: Tpp obtains an invalid client credentials access token and stores in global scope
    Given TPP obtains the oauth accesstoken-client credentials with invalid scope and store in global scope

  Scenario: Tpp obtains an account Request JWS token and stores in global scope
    Given TPP obtains the account request JWS token and store in global scope

  Scenario Outline: TPP makes GET Accounts API call with missing Authorization header
    Given TPP sets the request headers
      | name                       | value          |
      | x-fapi-financial-id        | ABCDSOMEIDABCD |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR |

    When the TPP makes the GET <api>
    Then response code should be 401

    Examples:

      | api                                             |
      | /ais/open-banking/v1.0.1/accounts                           |
      | /ais/open-banking/v1.0.1/balances                           |
      | /ais/open-banking/v1.0.1/transactions                       |
      | /ais/open-banking/v1.0.1/beneficiaries                      |
      | /ais/open-banking/v1.0.1/standing-orders                    |
      | /ais/open-banking/v1.0.1/direct-debits                      |
      | /ais/open-banking/v1.0.1/accounts/987654321                 |
      | /ais/open-banking/v1.0.1/accounts/987654321/balances        |
      | /ais/open-banking/v1.0.1/accounts/987654321/transactions    |
      | /ais/open-banking/v1.0.1/accounts/987654321/beneficiaries   |
      | /ais/open-banking/v1.0.1/accounts/987654321/standing-orders |
      | /ais/open-banking/v1.0.1/accounts/987654321/direct-debits   |
      | /ais/open-banking/v1.0.1/accounts/987654321/product         |


  Scenario Outline: TPP makes GET Accounts API call with invalid access token
    Given TPP sets the request headers
      | name                       | value             |
      | Authorization              | Bearer WRONGTOKEN |
      | x-fapi-financial-id        | ABCDSOMEIDABCD    |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR    |
    When the TPP makes the GET <api>
    Then response code should be 401

    Examples:

      | api                                             |
      | /ais/open-banking/v1.0.1/accounts                           |
      | /ais/open-banking/v1.0.1/balances                           |
      | /ais/open-banking/v1.0.1/transactions                       |
      | /ais/open-banking/v1.0.1/beneficiaries                      |
      | /ais/open-banking/v1.0.1/standing-orders                    |
      | /ais/open-banking/v1.0.1/direct-debits                      |
      | /ais/open-banking/v1.0.1/accounts/987654321/                |
      | /ais/open-banking/v1.0.1/accounts/987654321/balances        |
      | /ais/open-banking/v1.0.1/accounts/987654321/transactions    |
      | /ais/open-banking/v1.0.1/accounts/987654321/beneficiaries   |
      | /ais/open-banking/v1.0.1/accounts/987654321/standing-orders |
      | /ais/open-banking/v1.0.1/accounts/987654321/direct-debits   |
      | /ais/open-banking/v1.0.1/accounts/987654321/product         |

  Scenario Outline: TPP makes GET Accounts API call with missing x-fapi-financial-id header
    Given TPP sets the request headers
      | name                       | value                |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR       |
    When the TPP makes the GET <api>
    Then response code should be 400

    Examples:

      | api                                             |
      | /ais/open-banking/v1.0.1/accounts                           |
      | /ais/open-banking/v1.0.1/balances                           |
      | /ais/open-banking/v1.0.1/transactions                       |
      | /ais/open-banking/v1.0.1/beneficiaries                      |
      | /ais/open-banking/v1.0.1/standing-orders                    |
      | /ais/open-banking/v1.0.1/direct-debits                      |
      | /ais/open-banking/v1.0.1/accounts/987654321/                |
      | /ais/open-banking/v1.0.1/accounts/987654321/balances        |
      | /ais/open-banking/v1.0.1/accounts/987654321/transactions    |
      | /ais/open-banking/v1.0.1/accounts/987654321/beneficiaries   |
      | /ais/open-banking/v1.0.1/accounts/987654321/standing-orders |
      | /ais/open-banking/v1.0.1/accounts/987654321/direct-debits   |
      | /ais/open-banking/v1.0.1/accounts/987654321/product         |

  Scenario Outline: TPP makes GET Accounts API call with all mandatory headers, the request is successfull
    Given TPP sets the request headers
      | name                       | value                |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD       |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR       |
    When the TPP makes the GET <api>
    Then response code should be 200
    And response header Content-Type should exist
    And response header x-jws-signature should exist
    And response header Content-Type should be application/json
    And response body path $.Links should not be null
    And response body path $.Meta should not be null

    Examples:

      | api                                             |
      | /ais/open-banking/v1.0.1/accounts                           |
      | /ais/open-banking/v1.0.1/balances                           |
      | /ais/open-banking/v1.0.1/transactions                       |
      | /ais/open-banking/v1.0.1/beneficiaries                      |
      | /ais/open-banking/v1.0.1/standing-orders                    |
      | /ais/open-banking/v1.0.1/direct-debits                      |
      | /ais/open-banking/v1.0.1/accounts/987654321                 |
      | /ais/open-banking/v1.0.1/accounts/987654321/balances        |
      | /ais/open-banking/v1.0.1/accounts/987654321/transactions    |
      | /ais/open-banking/v1.0.1/accounts/987654321/beneficiaries   |
      | /ais/open-banking/v1.0.1/accounts/987654321/standing-orders |
      | /ais/open-banking/v1.0.1/accounts/987654321/direct-debits   |
      | /ais/open-banking/v1.0.1/accounts/987654321/product         |

  Scenario Outline: TPP makes GET Accounts API call with invalid Accept header
    Given TPP sets the request headers
      | name                       | value                |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD       |
      | Accept                     | application/xml      |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR       |
    When the TPP makes the GET <api>
    Then response code should be 406

    Examples:

      | api                                             |
      | /ais/open-banking/v1.0.1/accounts                           |
      | /ais/open-banking/v1.0.1/balances                           |
      | /ais/open-banking/v1.0.1/transactions                       |
      | /ais/open-banking/v1.0.1/beneficiaries                      |
      | /ais/open-banking/v1.0.1/standing-orders                    |
      | /ais/open-banking/v1.0.1/direct-debits                      |
      | /ais/open-banking/v1.0.1/accounts/987654321                 |
      | /ais/open-banking/v1.0.1/accounts/987654321/balances        |
      | /ais/open-banking/v1.0.1/accounts/987654321/transactions    |
      | /ais/open-banking/v1.0.1/accounts/987654321/beneficiaries   |
      | /ais/open-banking/v1.0.1/accounts/987654321/standing-orders |
      | /ais/open-banking/v1.0.1/accounts/987654321/direct-debits   |
      | /ais/open-banking/v1.0.1/accounts/987654321/product         |


  Scenario Outline: TPP makes GET or DELETE /ais/open-banking/v1.0.1/account-requests call with missing Authorization header
    Given TPP sets the request headers
      | name                | value          |
      | x-fapi-financial-id | ABCDSOMEIDABCD |
    When the TPP makes the <verb> /ais/open-banking/v1.0.1/account-requests/`GlobalAccountRequestId`
    Then response code should be 401

    Examples:
      | verb   |
      | GET    |
      | DELETE |

  Scenario Outline: TPP makes GET or DELETE /ais/open-banking/v1.0.1/account-requests call with invalid access token
    Given TPP sets the request headers
      | name                | value             |
      | Authorization       | Bearer WRONGTOKEN |
      | x-fapi-financial-id | ABCDSOMEIDABCD    |
    When the TPP makes the <verb> /ais/open-banking/v1.0.1/account-requests/`GlobalAccountRequestId`
    Then response code should be 401

    Examples:
      | verb   |
      | GET    |
      | DELETE |

  Scenario Outline: TPP makes GET or DELETE /ais/open-banking/v1.0.1/account-requests call with access token having invalid scope
    Given TPP sets the request headers
      | name                | value                           |
      | Authorization       | Bearer `accesstoken_cc_invalid` |
      | x-fapi-financial-id | ABCDSOMEIDABCD                  |
    When the TPP makes the <verb> /ais/open-banking/v1.0.1/account-requests/`GlobalAccountRequestId`
    Then response code should be 403

    Examples:
      | verb   |
      | GET    |
      | DELETE |

  Scenario Outline: TPP makes GET or DELETE /ais/open-banking/v1.0.1/account-requests call with missing x-fapi-financial-id header
    Given TPP sets the request headers
      | name          | value                   |
      | Authorization | Bearer `accesstoken_cc` |
    When the TPP makes the <verb> /ais/open-banking/v1.0.1/account-requests/`GlobalAccountRequestId`
    Then response code should be 400

    Examples:
      | verb   |
      | GET    |
      | DELETE |

  Scenario Outline: TPP makes  GET /ais/open-banking/v1.0.1/account-requests call with all mandatory headers, the request is successfull
    Given TPP sets the request headers
      | name                | value                   |
      | Authorization       | Bearer `accesstoken_cc` |
      | x-fapi-financial-id | ABCDSOMEIDABCD          |
    When the TPP makes the <verb> /ais/open-banking/v1.0.1/account-requests/`GlobalAccountRequestId`
    Then response code should be 200

    Examples:
      | verb |
      | GET  |


  Scenario Outline: TPP makes  GET or DELETE /ais/open-banking/v1.0.1/account-requests call with invalid Accept header
    Given TPP sets the request headers
      | name                | value                   |
      | Authorization       | Bearer `accesstoken_cc` |
      | x-fapi-financial-id | ABCDSOMEIDABCD          |
      | Accept              | application/xml         |
    When the TPP makes the <verb> /ais/open-banking/v1.0.1/account-requests/`GlobalAccountRequestId`
    Then response code should be 406

    Examples:
      | verb   |
      | GET    |
      | DELETE |



 # for a valid signature , JOSE header http://openbanking.org.uk/iat should be less that current date time, http://openbanking.org.uk/iss should match dn of cert etc

  Scenario Outline:JWS Signature Check for POST requests <description>
    Given TPP creates x-jws-signature for accounts with default headers for the body {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    Given TPP sets the request headers
      | name                | value                   |
      | Content-Type        | application/json        |
      | Authorization       | Bearer `accesstoken_cc` |
      | x-fapi-financial-id | abcdsomeidabcd          |
      | x-jws-signature     | <signature>             |
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    Then response code should be <responseCode>

    Examples:
      | signature                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | responseCode | description       |
      | `accounts-x-jws-signature`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 201          | valid signature   |
      | eyJhbGciOiJSUzI1NiIsImtpZCI6IjkwMjEwQUJBRCIsImI2NCI6ZmFsc2UsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaWF0IjoiMjAxNy0wNi0xMlQyMDowNTo1MCswMDowMCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaXNzIjoiQz1VSywgU1Q9RW5nbGFuZCwgTD1Mb25kb24sIE89QWNtZSBMdGQuIiwiY3JpdCI6WyJiNjQiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lhdCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvaXNzIl19..ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNklqa3dNakV3UVVKQlJDSXNJbUkyTkNJNlptRnNjMlVzSW1oMGRIQTZMeTl2Y0dWdVltRnVhMmx1Wnk1dmNtY3VkV3N2YVdGMElqb2lNakF4Tnkwd05pMHhNbFF5TURvd05UbzFNQ3N3TURvd01DSXNJbWgwZEhBNkx5OXZjR1Z1WW1GdWEybHVaeTV2Y21jdWRXc3ZhWE56SWpvaVF6MVZTeXdnVTFROVJXNW5iR0Z1WkN3Z1REMU1iMjVrYjI0c0lFODlRV050WlNCTWRHUXVJaXdpWTNKcGRDSTZXeUppTmpRaUxDSm9kSFJ3T2k4dmIzQmxibUpoYm10cGJtY3ViM0puTG5WckwybGhkQ0lzSW1oMGRIQTZMeTl2Y0dWdVltRnVhMmx1Wnk1dmNtY3VkV3N2YVhOeklsMTkuWlhsS2FHSkhZMmxQYVVwVFZYcEpNVTVwU1hOSmJYUndXa05KTmtscWEzZE5ha1YzVVZWS1FsSkRTWE5KYlVreVRrTkpObHB0Um5Oak1sVnpTVzFvTUdSSVFUWk1lVGwyWTBkV2RWbHRSblZoTW14MVduazFkbU50WTNWa1YzTjJZVmRHTUVscWIybE5ha0Y0VG5rd2QwNXBNSGhOYkZGNVRVUnZkMDVVYnpGTlEzTjNUVVJ2ZDAxRFNYTkpiV2d3WkVoQk5reDVPWFpqUjFaMVdXMUdkV0V5YkhWYWVUVjJZMjFqZFdSWGMzWmhXRTU2U1dwdmFWRjZNVlpUZVhkblZURlJPVkpYTlc1aVIwWjFXa04zWjFSRU1VMWlNalZyWWpJMGMwbEZPRGxSVjA1MFdsTkNUV1JIVVhWSmFYZHBXVE5LY0dSRFNUWlhlVXBwVG1wUmFVeERTbTlrU0ZKM1QyazRkbUl6UW14aWJVcG9ZbTEwY0dKdFkzVmlNMHB1VEc1V2Nrd3liR2hrUTBselNXMW9NR1JJUVRaTWVUbDJZMGRXZFZsdFJuVmhNbXgxV25rMWRtTnRZM1ZrVjNOMllWaE9la2xzTVRrdVpYbEtSVmxZVW1oSmFuQTNTV3hDYkdOdE1YQmpNMDV3WWpJMWVrbHFjR0pKYkVwc1dWZFNRbGt5VG5aa1Z6VXdZekJTYkdSSFJuQmlRMGx6U1d4S2JGbFhVa05aVjNob1ltMU9iR041U1hOSmJFcHNXVmRTUTFwWE5XeGFiV3hxWVZkR2VXRlhWbnBTUjFZd1dWZHNjMGxwZDJsVmJWWm9Xa1ZTY0dOdFZtcGtSVkpzV1cxc01HTjVTWE5KYkVwc1dWZFNVV050T1d0a1YwNHdZM2xKYzBsc1NteFpWMUpVWkVkR2RWcEhiSFZhTURsNVdrZFdlV013VW14a1IwWndZa05KYzBsc1NteFpWMUpWWTIxR2RXTXlSbXBrUjJ4MlltNU9SR050Vm10aFdGSjZTV2wzYVZWdFZtaGFSbEo1V1ZjMWVsbFhUakJoVnpsMVl6QlNiRmx0YkRCamVVbHpTV3hLYkZsWFVsVmpiVVoxWXpKR2FtUkhiSFppYms1RldsaFNhR0ZYZDJsWVUzZHBVbGhvZDJGWVNtaGtSMngyWW10U2FHUkhWbFZoVnpGc1NXcHZhVTFxUVhoT2VUQjNUbE13ZDAxc1VYZE5SRzkzVFVSdmQwMURNSGROUkc5M1RVTkpjMGxzVW5sWlZ6VjZXVmRPTUdGWE9YVlNia3AyWWxWU2FHUkhWbFZoVnpGc1NXcHZhVTFxUVhoT2VUQjNUbE13ZDAweFVYZE5SRzkzVFVSdmQwMURNSGROUkc5M1RVTkpjMGxzVW5sWlZ6VjZXVmRPTUdGWE9YVldSemxGV1ZoU2JGWkhiSFJhVTBrMlNXcEpkMDFVWTNSTlJGVjBUVVJvVlUxRVFUWk5SRUUyVFVSQmRFMUVRVFpOUkVGcFpsTjNhVlZ0YkhwaGVVazJaVE14T1EuVTM1X2pKbWRHV25pcE1lNnZZam44Y2F4dldiU2NLSWNSbXpUZDQxVDA2ZjJXekE4dDNUd240Zk5WRTYwbWN3eGlRVEhPVS1qWHVub0Nkdk9DSi1WRTNsTms5MlVqNU1hZkxNbWdHYjlpaVVUSzdlTDBtMEpONnVmQUh1MzFvV2VieFJIaEpzampQUl81LVRrUGZiYWZDX3ZkR0JVMGN6a2JCaVVoUEdWUnFJNDFkZDJIdGhKUjl3azY5OHdselpRMU1yNW1rdTNHNk9BbWxJSVpuYWlHU0tXTDNncUhLSTdyX1dXeTVoMFR2UFpzWHlJd3pJWXBZWkIwZnhIc21lVlpQaGJERE1YYlYyQjktM3M3aTFmYjlBcUJCMDJtSi1HcHRTbF9hRDM3aElHZVdYa1VOUDl4aF9jb2FURWYxdGRandomSign | 401          | invalid signature |

  Scenario Outline:Check for x-fapi-interaction-id playback For GET Account APIs
    Given TPP sets the request headers
      | name                       | value                |
      | Content-Type               | application/json     |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | abcdsomeidabcd       |
      | x-fapi-interaction-id      | <interactionId>      |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR       |
    When the TPP makes the GET <api>
    Then response code should be 200
    And response header x-fapi-interaction-id should be <interactionId>

    Examples:

      | interactionId | api                                             |
      | 123123123     | /ais/open-banking/v1.0.1/accounts                           |
      |               | /ais/open-banking/v1.0.1/accounts                           |

      | 123123123     | /ais/open-banking/v1.0.1/accounts/987654321                 |
      |               | /ais/open-banking/v1.0.1/accounts/987654321                 |

      | 123123123     | /ais/open-banking/v1.0.1/accounts/987654321/balances        |
      |               | /ais/open-banking/v1.0.1/accounts/987654321/balances        |

      | 123123123     | /ais/open-banking/v1.0.1/accounts/987654321/transactions    |
      |               | /ais/open-banking/v1.0.1/accounts/987654321/transactions    |

      | 123123123     | /ais/open-banking/v1.0.1/accounts/987654321/beneficiaries   |
      |               | /ais/open-banking/v1.0.1/accounts/987654321/beneficiaries   |

      | 123123123     | /ais/open-banking/v1.0.1/accounts/987654321/standing-orders |
      |               | /ais/open-banking/v1.0.1/accounts/987654321/standing-orders |

      | 123123123     | /ais/open-banking/v1.0.1/accounts/987654321/direct-debits   |
      |               | /ais/open-banking/v1.0.1/accounts/987654321/direct-debits   |

      | 123123123     | /ais/open-banking/v1.0.1/accounts/987654321/product         |
      |               | /ais/open-banking/v1.0.1/accounts/987654321/product         |

      | 123123123     | /ais/open-banking/v1.0.1/balances                           |
      |               | /ais/open-banking/v1.0.1/balances                           |

      | 123123123     | /ais/open-banking/v1.0.1/transactions                       |
      |               | /ais/open-banking/v1.0.1/transactions                       |

      | 123123123     | /ais/open-banking/v1.0.1/beneficiaries                      |
      |               | /ais/open-banking/v1.0.1/beneficiaries                      |

      | 123123123     | /ais/open-banking/v1.0.1/standing-orders                    |
      |               | /ais/open-banking/v1.0.1/standing-orders                    |

      | 123123123     | /ais/open-banking/v1.0.1/direct-debits                      |
      |               | /ais/open-banking/v1.0.1/direct-debits                      |


  Scenario Outline:Signature Check for x-fapi-interaction-id playback For POST account-requests
    Given TPP creates x-jws-signature for accounts with default headers for the body {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    And TPP sets the request headers
      | name                  | value                   |
      | Content-Type          | application/json        |
      | Authorization         | Bearer `accesstoken_cc` |
      | x-fapi-financial-id   | abcdsomeidabcd          |
      | x-fapi-interaction-id | <interactionId>         |
      | x-jws-signature       | `accounts-x-jws-signature`   |
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    Then response code should be 201
    And response header x-fapi-interaction-id should be <interactionId>
    And response header Content-Type should exist
    And response header x-jws-signature should exist
    And response header Content-Type should be application/json
    And response body path $.Data.AccountRequestId should not be null
    And response body path $.Risk should not be null
    And response body path $.Links should not be null
    And response body path $.Meta should not be null
    And response body path $.Data.Status should not be null

    Examples:
      | interactionId |
      | 123123123     |
      |               |


  Scenario Outline:Check for x-fapi-interaction-id playback For GET account-requests
    Given TPP sets the request headers
      | name                  | value                   |
      | Authorization         | Bearer `accesstoken_cc` |
      | x-fapi-financial-id   | abcdsomeidabcd          |
      | x-fapi-interaction-id | <interactionId>         |
    When the TPP makes the GET /ais/open-banking/v1.0.1/account-requests/`GlobalAccountRequestId`
    Then response header x-fapi-interaction-id should be <interactionId>
    And response header x-jws-signature should exist
    And response code should be 200
    And response header Content-Type should exist
    And response header x-jws-signature should exist
    And response header Content-Type should be application/json
    And response body path $.Data.AccountRequestId should not be null
    And response body path $.Risk should not be null
    And response body path $.Links should not be null
    And response body path $.Meta should not be null
    And response body path $.Data.Status should not be null
    Examples:

      | interactionId |
      | 123123123     |
      |               |


  Scenario Outline:TPP makes a POST /ais/open-banking/v1.0.1/account-requests call Case: <description>
    Given TPP sets the request headers
      | name                | value                   |
      | Content-Type        | application/json        |
      | Authorization       | Bearer `accesstoken_cc` |
      | x-fapi-financial-id | abcdsomeidabcd          |
      | x-jws-signature     | `account_request_jws`   |
    And TPP set body to {"Data": {"Permissions": <permissionArray>,"ExpirationDateTime": <expDateTime>,"TransactionFromDateTime": <transactionFromDateTime>,"TransactionToDateTime": <transactionToDateTime>},"Risk": {}}
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    Then response code should be <responseCode>

    Examples:
      | permissionArray                                                                                                                                                                                       | expDateTime                                       | transactionFromDateTime                           | transactionToDateTime                             | responseCode | description                                                                                                  |
      | ["WrongPermission","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"] | "2020-05-03T00:00:00-00:00"                       | "2012-05-03T00:00:00-00:00"                       | "2020-05-03T00:00:00-00:00"                       | 400          | one of the permission codes is invalid                                                                       |
      | []                                                                                                                                                                                                    | "2020-05-03T00:00:00-00:00"                       | "2012-05-03T00:00:00-00:00"                       | "2020-05-03T00:00:00-00:00"                       | 400          | permissions array is empty                                                                                   |
      |                                                                                                                                                                                                       | "2020-05-03T00:00:00-00:00"                       | "2012-05-03T00:00:00-00:00"                       | "2020-05-03T00:00:00-00:00"                       | 400          | permissions array missing                                                                                    |
      | "some permissions in string value"                                                                                                                                                                    | "2020-05-03T00:00:00-00:00"                       | "2012-05-03T00:00:00-00:00"                       | "2020-05-03T00:00:00-00:00"                       | 400          | permissions parameter is not an array                                                                        |

      | ["ReadTransactionsDetail"]                                                                                                                                                                            | "2020-05-03T00:00:00-00:00"                       | "2012-05-03T00:00:00-00:00"                       | "2020-05-03T00:00:00-00:00"                       | 400          | neither ReadTransactionsDebits nor ReadTransactionsCredits is present with ReadTransactionsDetail permission |
      | ["ReadTransactionsBasic"]                                                                                                                                                                             | "2020-05-03T00:00:00-00:00"                       | "2012-05-03T00:00:00-00:00"                       | "2020-05-03T00:00:00-00:00"                       | 400          | neither ReadTransactionsDebits nor ReadTransactionsCredits is present with ReadTransactionsBasic permission  |
      | ["ReadTransactionsDebits"]                                                                                                                                                                            | "2020-05-03T00:00:00-00:00"                       | "2012-05-03T00:00:00-00:00"                       | "2020-05-03T00:00:00-00:00"                       | 400          | neither ReadTransactionsBasic nor ReadTransactionsDetail is present with ReadTransactionsDebits permission   |
      | ["ReadTransactionsCredits"]                                                                                                                                                                           | "2020-05-03T00:00:00-00:00"                       | "2012-05-03T00:00:00-00:00"                       | "2020-05-03T00:00:00-00:00"                       | 400          | neither ReadTransactionsBasic nor ReadTransactionsDetail is present with ReadTransactionsCredits permission  |


      | ["ReadTransactionsDetail","ReadTransactionsDebits"]                                                                                                                                                   | ["date inside array","2017-05-03T00:00:00-00:00"] | "2012-05-03T00:00:00-00:00"                       | "2020-05-03T00:00:00-00:00"                       | 400          | Expiration DateTime type is invalid                                                                          |
      | ["ReadTransactionsDetail","ReadTransactionsDebits"]                                                                                                                                                   | "7-5-3T00:00:00-00:00"                            | "2012-05-03T00:00:00-00:00"                       | "2020-05-03T00:00:00-00:00"                       | 400          | Expiration DateTime value is invalid                                                                         |
      | ["ReadTransactionsDetail","ReadTransactionsDebits"]                                                                                                                                                   | "2012-05-03T00:00:00-00:00"                       | "2012-05-03T00:00:00-00:00"                       | "2020-05-03T00:00:00-00:00"                       | 400          | Expiration DateTime value is old                                                                             |

      | ["ReadTransactionsDetail","ReadTransactionsDebits"]                                                                                                                                                   | "2020-05-03T00:00:00-00:00"                       | ["date inside array","2017-05-03T00:00:00-00:00"] | "2020-05-03T00:00:00-00:00"                       | 400          | transaction FromDateTime type is invalid                                                                     |
      | ["ReadTransactionsDetail","ReadTransactionsDebits"]                                                                                                                                                   | "2020-05-03T00:00:00-00:00"                       | "7-5-3T00:00:00-00:00"                            | "2020-05-03T00:00:00-00:00"                       | 400          | transaction FromDateTime value is invalid                                                                    |


      | ["ReadTransactionsDetail","ReadTransactionsDebits"]                                                                                                                                                   | "2020-05-03T00:00:00-00:00"                       | "2012-05-03T00:00:00-00:00"                       | ["date inside array","2017-05-03T00:00:00-00:00"] | 400          | transaction ToDateTime type is invalid                                                                       |
      | ["ReadTransactionsDetail","ReadTransactionsDebits"]                                                                                                                                                   | "2020-05-03T00:00:00-00:00"                       | "2012-05-03T00:00:00-00:00"                       | "7-5-3T00:00:00-00:00"                            | 400          | transaction ToDateTime value is invalid                                                                      |


  Scenario Outline: Not consented account Id or invalid account Id
    Given TPP sets the request headers
      | name                       | value                |
      | Content-Type               | application/json     |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | abcdsomeidabcd       |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR       |
    When the TPP makes the GET <api>
    Then response code should be <responseCode>

    Examples:
      | api                                                  | responseCode |
      | /ais/open-banking/v1.0.1/accounts/wrongAccountId                 | 400          |
      | /ais/open-banking/v1.0.1/accounts/wrongAccountId/balances        | 400          |
      | /ais/open-banking/v1.0.1/accounts/wrongAccountId/transactions    | 400          |
      | /ais/open-banking/v1.0.1/accounts/wrongAccountId/beneficiaries   | 400          |
      | /ais/open-banking/v1.0.1/accounts/wrongAccountId/standing-orders | 400          |
      | /ais/open-banking/v1.0.1/accounts/wrongAccountId/direct-debits   | 400          |
      | /ais/open-banking/v1.0.1/accounts/wrongAccountId/product         | 400          |


  Scenario Outline: No entries found for GET Account APIs <payloadPath>
    Given TPP sets the request headers
      | name                       | value                             |
      | Authorization              | Bearer `accesstoken_emptyaccount` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD                    |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR                    |
    When the TPP makes the GET <api>
    Then response code should be 200
    And response body path <payloadPath> should be of type array with length 0

    Examples:
      | api                                             | payloadPath          |
      | /ais/open-banking/v1.0.1/transactions                       | $.Data.Transaction   |
      | /ais/open-banking/v1.0.1/beneficiaries                      | $.Data.Beneficiary   |
      | /ais/open-banking/v1.0.1/standing-orders                    | $.Data.StandingOrder |
      | /ais/open-banking/v1.0.1/direct-debits                      | $.Data.DirectDebit   |
      | /ais/open-banking/v1.0.1/accounts/111111111/transactions    | $.Data.Transaction   |
      | /ais/open-banking/v1.0.1/accounts/111111111/beneficiaries   | $.Data.Beneficiary   |
      | /ais/open-banking/v1.0.1/accounts/111111111/standing-orders | $.Data.StandingOrder |
      | /ais/open-banking/v1.0.1/accounts/111111111/direct-debits   | $.Data.DirectDebit   |
      | /ais/open-banking/v1.0.1/accounts/111111111/product         | $.Data.Product       |


  Scenario Outline: TPP makes  /ais/open-banking/v1.0.1/account-requests call with missing Authorization header
    Given TPP sets the request headers
      | name                | value            |
      | x-fapi-financial-id | ABCDSOMEIDABCD   |
      | Content-Type        | application/json |
    When the TPP makes the <verb> <api>
    Then response code should be 401

    Examples:
      | verb   | api                                           |
      | GET    | /ais/open-banking/v1.0.1/account-requests/ACOUNTREQUESTID |
      | POST   | /ais/open-banking/v1.0.1/account-requests                 |
      | DELETE | /ais/open-banking/v1.0.1/account-requests/ACOUNTREQUESTID |

### not sure
# scenarios when invalid permissions for accessing a resource
  Scenario Outline: TPP makes GET Account info call with account request having invalid permissions
    Given TPP sets the request headers
      | name                       | value                                       |
      | Authorization              | Bearer `accesstoken_ReadBalancesPermission` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD                              |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR                              |
    When the TPP makes the GET <api>
    Then response code should be 403

    Examples:
      | api                             |
      | /ais/open-banking/v1.0.1/accounts           |
      | /ais/open-banking/v1.0.1/accounts/987654321 |


  Scenario Outline: TPP makes GET Account Balance info call with account request having invalid permissions
    Given TPP sets the request headers
      | name                       | value                                             |
      | Authorization              | Bearer `accesstoken_ReadAccountsDetailPermission` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD                                    |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR                                    |
    When the TPP makes the GET <api>
    Then response code should be 403

    Examples:
      | api                                      |
      | /ais/open-banking/v1.0.1/balances                    |
      | /ais/open-banking/v1.0.1/accounts/987654321/balances |


  Scenario Outline: TPP makes GET Account Beneficiaries info call with account request having invalid permissions
    Given TPP sets the request headers
      | name                       | value                                             |
      | Authorization              | Bearer `accesstoken_ReadAccountsDetailPermission` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD                                    |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR                                    |
    When the TPP makes the GET <api>
    Then response code should be 403

    Examples:
      | api                                           |
      | /ais/open-banking/v1.0.1/beneficiaries                    |
      | /ais/open-banking/v1.0.1/accounts/987654321/beneficiaries |


  Scenario Outline: TPP makes GET Account Direct debits info call with account request having invalid permissions
    Given TPP sets the request headers
      | name                       | value                                             |
      | Authorization              | Bearer `accesstoken_ReadAccountsDetailPermission` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD                                    |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR                                    |
    When the TPP makes the GET <api>
    Then response code should be 403

    Examples:
      | api                                           |
      | /ais/open-banking/v1.0.1/direct-debits                    |
      | /ais/open-banking/v1.0.1/accounts/987654321/direct-debits |

  Scenario: TPP makes GET Account Product info call with account request having invalid permissions
    Given TPP sets the request headers
      | name                       | value                                             |
      | Authorization              | Bearer `accesstoken_ReadAccountsDetailPermission` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD                                    |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR                                    |
    When the TPP makes the GET /ais/open-banking/v1.0.1/accounts/987654321/product
    Then response code should be 403


  Scenario Outline: TPP makes GET Account Standing Orders info call with account request having invalid permissions
    Given TPP sets the request headers
      | name                       | value                                             |
      | Authorization              | Bearer `accesstoken_ReadAccountsDetailPermission` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD                                    |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR                                    |
    When the TPP makes the GET <api>
    Then response code should be 403

    Examples:
      | api                                             |
      | /ais/open-banking/v1.0.1/standing-orders                    |
      | /ais/open-banking/v1.0.1/accounts/987654321/standing-orders |


  Scenario Outline: TPP makes GET Account Transactions info call with account request having invalid permissions
    Given TPP sets the request headers
      | name                       | value                                             |
      | Authorization              | Bearer `accesstoken_ReadAccountsDetailPermission` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD                                    |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR                                    |
    When the TPP makes the GET <api>
    Then response code should be 403

    Examples:
      | api                                          |
      | /ais/open-banking/v1.0.1/transactions                    |
      | /ais/open-banking/v1.0.1/accounts/987654321/transactions |

  Scenario: TPP makes GET Account Products info call with account request having invalid permissions
    Given TPP sets the request headers
      | name                       | value                                             |
      | Authorization              | Bearer `accesstoken_ReadAccountsDetailPermission` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD                                    |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR                                    |
    When the TPP makes the GET /ais/open-banking/v1.0.1/accounts/987654321/product
    Then response code should be 403


 # scenarios for validating individual response from each API

  Scenario Outline:TPP makes GET Accounts info request
    Given TPP sets the request headers
      | name                       | value                |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD       |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR       |
    When the TPP makes the GET <api>
    Then response code should be 200
    And response header x-jws-signature should exist
    And response body path $.Data.Account should not be null
    And response body path $.Meta should not be null
    And response body path $.Links should not be null

    Examples:
      | api                             |
      | /ais/open-banking/v1.0.1/accounts           |
      | /ais/open-banking/v1.0.1/accounts/987654321 |


  Scenario Outline: TPP makes GET Balance info request
    Given TPP sets the request headers
      | name                       | value                |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD       |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR       |
    When the TPP makes the GET <api>
    Then response code should be 200
    And response header x-jws-signature should exist
    And response body path $.Data.Balance should not be null
    And response body path $.Meta should not be null
    And response body path $.Links should not be null

    Examples:
      | api                                      |
      | /ais/open-banking/v1.0.1/balances                    |
      | /ais/open-banking/v1.0.1/accounts/987654321/balances |


  Scenario Outline: TPP makes GET Beneficiaries info request
    Given TPP sets the request headers
      | name                       | value                |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD       |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR       |
    When the TPP makes the GET <api>
    Then response code should be 200
    And response header x-jws-signature should exist
    And response body path $.Data.Beneficiary should not be null
    And response body path $.Meta should not be null
    And response body path $.Links should not be null

    Examples:
      | api                                           |
      | /ais/open-banking/v1.0.1/beneficiaries                    |
      | /ais/open-banking/v1.0.1/accounts/987654321/beneficiaries |


  Scenario Outline: TPP makes GET Direct debits info request
    Given TPP sets the request headers
      | name                       | value                |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD       |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR       |
    When the TPP makes the GET <api>
    Then response code should be 200
    And response header x-jws-signature should exist
    And response body path $.Data.DirectDebit should not be null
    And response body path $.Meta should not be null
    And response body path $.Links should not be null

    Examples:
      | api                                           |
      | /ais/open-banking/v1.0.1/direct-debits                    |
      | /ais/open-banking/v1.0.1/accounts/987654321/direct-debits |


  Scenario Outline: TPP makes GET Standing Orders info request
    Given TPP sets the request headers
      | name                       | value                |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD       |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR       |
    When the TPP makes the GET <api>
    Then response code should be 200
    And response header x-jws-signature should exist
    And response body path $.Data.StandingOrder should not be null
    And response body path $.Meta should not be null
    And response body path $.Links should not be null

    Examples:
      | api                                             |
      | /ais/open-banking/v1.0.1/standing-orders                    |
      | /ais/open-banking/v1.0.1/accounts/987654321/standing-orders |


  Scenario Outline: TPP makes GET Transactions info request
    Given TPP sets the request headers
      | name                       | value                |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD       |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR       |
    When the TPP makes the GET <api>
    Then response code should be 200
    And response header x-jws-signature should exist
    And response body path $.Data.Transaction should not be null
    And response body path $.Meta should not be null
    And response body path $.Links should not be null

    Examples:
      | api                                          |
      | /ais/open-banking/v1.0.1/transactions                    |
      | /ais/open-banking/v1.0.1/accounts/987654321/transactions |

  Scenario: TPP makes GET Product info request
    Given TPP sets the request headers
      | name                       | value                |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | ABCDSOMEIDABCD       |
      | x-fapi-customer-ip-address | CUSTOMERIPADDR       |
    When the TPP makes the GET /ais/open-banking/v1.0.1/accounts/987654321/product
    Then response code should be 200
    And response header x-jws-signature should exist
    And response body path $.Data.Product should not be null
    And response body path $.Meta should not be null
    And response body path $.Links should not be null


  Scenario: TPP makes POST /ais/open-banking/v1.0.1/account-requests call with missing Authorization header
    Given TPP sets the request headers
      | name                | value                 |
      | x-fapi-financial-id | ABCDSOMEIDABCD        |
      | Content-Type        | application/json      |
      | x-jws-signature     | `account_request_jws` |
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    Then response code should be 401


  Scenario: TPP makes POST /ais/open-banking/v1.0.1/account-requests call with invalid access token
    Given TPP sets the request headers
      | name                | value                 |
      | Authorization       | Bearer WRONGTOKEN     |
      | x-fapi-financial-id | ABCDSOMEIDABCD        |
      | Content-Type        | application/json      |
      | x-jws-signature     | `account_request_jws` |
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    Then response code should be 401

  Scenario: TPP makes POST /ais/open-banking/v1.0.1/account-requests call with access token having invalid scope
    Given TPP sets the request headers
      | name                | value                           |
      | Authorization       | Bearer `accesstoken_cc_invalid` |
      | x-fapi-financial-id | ABCDSOMEIDABCD                  |
      | Content-Type        | application/json                |
      | x-jws-signature     | `account_request_jws`           |
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    Then response code should be 403


  Scenario: TPP makes POST /ais/open-banking/v1.0.1/account-requests call with missing x-fapi-financial-id header
    Given TPP sets the request headers
      | name            | value                   |
      | Authorization   | Bearer `accesstoken_cc` |
      | Content-Type    | application/json        |
      | x-jws-signature | `account_request_jws`   |
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    Then response code should be 400

  Scenario: TPP makes POST /ais/open-banking/v1.0.1/account-requests call with missing Content-Type header
    Given TPP sets the request headers
      | name                | value                   |
      | Authorization       | Bearer `accesstoken_cc` |
      | x-fapi-financial-id | ABCDSOMEIDABCD          |
      | x-jws-signature     | `account_request_jws`   |
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    Then response code should be 400

  Scenario: TPP makes POST /ais/open-banking/v1.0.1/account-requests call with invalid Content-Type header
    Given TPP sets the request headers
      | name                | value                   |
      | Authorization       | Bearer `accesstoken_cc` |
      | x-fapi-financial-id | ABCDSOMEIDABCD          |
      | Content-Type        | application/xml         |
      | x-jws-signature     | `account_request_jws`   |
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    Then response code should be 400


  Scenario: TPP makes  POST /ais/open-banking/v1.0.1/account-requests call with invalid Accept header
    Given TPP sets the request headers
      | name                | value                   |
      | Authorization       | Bearer `accesstoken_cc` |
      | x-fapi-financial-id | ABCDSOMEIDABCD          |
      | Content-Type        | application/json        |
      | Accept              | application/xml         |
      | x-jws-signature     | `account_request_jws`   |
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    Then response code should be 406

  Scenario: TPP makes  POST /ais/open-banking/v1.0.1/account-requests call with all mandatory headers, the request is successfull
    Given TPP creates x-jws-signature for accounts with default headers for the body {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    And TPP sets the request headers
      | name                | value                   |
      | Authorization       | Bearer `accesstoken_cc` |
      | x-fapi-financial-id | ABCDSOMEIDABCD          |
      | Content-Type        | application/json        |
      | x-jws-signature     | `accounts-x-jws-signature`   |
    And TPP set body to {"Data":{"Permissions":["ReadAccountsDetail","ReadBalances","ReadBeneficiariesDetail","ReadDirectDebits","ReadProducts","ReadStandingOrdersDetail","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail"],"ExpirationDateTime":"2025-08-02T00:00:00-00:00","TransactionFromDateTime":"2012-05-03T00:00:00-00:00","TransactionToDateTime":"2025-05-08T00:00:00-00:00"},"Risk":{}}
    When the TPP makes the POST /ais/open-banking/v1.0.1/account-requests
    Then response code should be 201


  Scenario: No entries found for GET Account Request
    Given TPP sets the request headers
      | name                | value                   |
      | Authorization       | Bearer `accesstoken_cc` |
      | x-fapi-financial-id | ABCDSOMEIDABCD          |
    When the TPP makes the GET /ais/open-banking/v1.0.1/account-requests/InValidRequestId
    Then response code should be 400



# customer absence check
  Scenario:Check for 4 time access token use with customer presence GET /ais/open-banking/v1.0.1/balances
    Given TPP sets the request headers
      | name                       | value                |
      | Content-Type               | application/json     |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | abcdsomeidabcd       |
      | x-fapi-interaction-id      | INTERACTIONID        |
      | x-fapi-customer-ip-address | 1234567              |
    When the TPP makes the GET /ais/open-banking/v1.0.1/balances
    Then response code should be 200

  Scenario:Check for 4 time access token use without customer presence GET /ais/open-banking/v1.0.1/balances
    Given TPP sets the request headers
      | name                  | value                |
      | Content-Type          | application/json     |
      | Authorization         | Bearer `accesstoken` |
      | x-fapi-financial-id   | abcdsomeidabcd       |
      | x-fapi-interaction-id | INTERACTIONID        |
    When the TPP makes the GET /ais/open-banking/v1.0.1/balances
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/balances
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/balances
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/balances
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/balances
    Then response code should be 403


  Scenario:Check for 4 time access token use with customer presence GET /ais/open-banking/v1.0.1/transactions
    Given TPP sets the request headers
      | name                       | value                |
      | Content-Type               | application/json     |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | abcdsomeidabcd       |
      | x-fapi-interaction-id      | INTERACTIONID        |
      | x-fapi-customer-ip-address | 1234567              |
    When the TPP makes the GET /ais/open-banking/v1.0.1/transactions
    Then response code should be 200

  Scenario:Check for 4 time access token use without customer presence GET /ais/open-banking/v1.0.1/transactions
    Given TPP sets the request headers
      | name                  | value                |
      | Content-Type          | application/json     |
      | Authorization         | Bearer `accesstoken` |
      | x-fapi-financial-id   | abcdsomeidabcd       |
      | x-fapi-interaction-id | INTERACTIONID        |
    When the TPP makes the GET /ais/open-banking/v1.0.1/transactions
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/transactions
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/transactions
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/transactions
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/transactions
    Then response code should be 403

  Scenario:Check for 4 time access token use with customer presence GET /ais/open-banking/v1.0.1/beneficiaries
    Given TPP sets the request headers
      | name                       | value                |
      | Content-Type               | application/json     |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | abcdsomeidabcd       |
      | x-fapi-interaction-id      | INTERACTIONID        |
      | x-fapi-customer-ip-address | 1234567              |
    When the TPP makes the GET /ais/open-banking/v1.0.1/beneficiaries
    Then response code should be 200

  Scenario:Check for 4 time access token use without customer presence GET /ais/open-banking/v1.0.1/beneficiaries
    Given TPP sets the request headers
      | name                  | value                |
      | Content-Type          | application/json     |
      | Authorization         | Bearer `accesstoken` |
      | x-fapi-financial-id   | abcdsomeidabcd       |
      | x-fapi-interaction-id | INTERACTIONID        |
    When the TPP makes the GET /ais/open-banking/v1.0.1/beneficiaries
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/beneficiaries
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/beneficiaries
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/beneficiaries
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/beneficiaries
    Then response code should be 403

  Scenario:Check for 4 time access token use with customer presence GET /ais/open-banking/v1.0.1/standing-orders
    Given TPP sets the request headers
      | name                       | value                |
      | Content-Type               | application/json     |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | abcdsomeidabcd       |
      | x-fapi-interaction-id      | INTERACTIONID        |
      | x-fapi-customer-ip-address | 1234567              |
    When the TPP makes the GET /ais/open-banking/v1.0.1/standing-orders
    Then response code should be 200

  Scenario:Check for 4 time access token use without customer presence /ais/open-banking/v1.0.1/standing-orders
    Given TPP sets the request headers
      | name                  | value                |
      | Content-Type          | application/json     |
      | Authorization         | Bearer `accesstoken` |
      | x-fapi-financial-id   | abcdsomeidabcd       |
      | x-fapi-interaction-id | INTERACTIONID        |
    When the TPP makes the GET /ais/open-banking/v1.0.1/standing-orders
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/standing-orders
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/standing-orders
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/standing-orders
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/standing-orders
    Then response code should be 403


  Scenario:Check for 4 time access token use with customer presence /ais/open-banking/v1.0.1/direct-debits
    Given TPP sets the request headers
      | name                       | value                |
      | Content-Type               | application/json     |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | abcdsomeidabcd       |
      | x-fapi-interaction-id      | INTERACTIONID        |
      | x-fapi-customer-ip-address | 1234567              |
    When the TPP makes the GET /ais/open-banking/v1.0.1/direct-debits
    Then response code should be 200

  Scenario:Check for 4 time access token use without customer presence /ais/open-banking/v1.0.1/direct-debits
    Given TPP sets the request headers
      | name                  | value                |
      | Content-Type          | application/json     |
      | Authorization         | Bearer `accesstoken` |
      | x-fapi-financial-id   | abcdsomeidabcd       |
      | x-fapi-interaction-id | INTERACTIONID        |
    When the TPP makes the GET /ais/open-banking/v1.0.1/direct-debits
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/direct-debits
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/direct-debits
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/direct-debits
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/direct-debits
    Then response code should be 403


  Scenario:Check for 4 time access token use with customer presence GET /ais/open-banking/v1.0.1/accounts/987654321/product
    Given TPP sets the request headers
      | name                       | value                |
      | Content-Type               | application/json     |
      | Authorization              | Bearer `accesstoken` |
      | x-fapi-financial-id        | abcdsomeidabcd       |
      | x-fapi-interaction-id      | INTERACTIONID        |
      | x-fapi-customer-ip-address | 1234567              |
    When the TPP makes the GET /ais/open-banking/v1.0.1/accounts/987654321/product
    Then response code should be 200

  Scenario:Check for 4 time access token use without customer presence GET /ais/open-banking/v1.0.1/accounts/987654321/product
    Given TPP sets the request headers
      | name                  | value                |
      | Content-Type          | application/json     |
      | Authorization         | Bearer `accesstoken` |
      | x-fapi-financial-id   | abcdsomeidabcd       |
      | x-fapi-interaction-id | INTERACTIONID        |
    When the TPP makes the GET /ais/open-banking/v1.0.1/accounts/987654321/product
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/accounts/987654321/product
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/accounts/987654321/product
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/accounts/987654321/product
    Then response code should be 200
    When the TPP makes the GET /ais/open-banking/v1.0.1/accounts/987654321/product
    Then response code should be 403


  