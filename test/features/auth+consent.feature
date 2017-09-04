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
    When the TPP makes the POST /apis/v2/oauth/token
    Then response code should be <responseCode>

    Examples:
      | type               | scope             | jwtCredentials     | responseCode |

      | client_credentials | accounts payments | `clientAssertion`  | 200          |
      | client_credentials | accounts          | `clientAssertion`  | 200          |
      | client_credentials | payments          | `clientAssertion`  | 200          |
      | client_credentials | accounts payments | invalidCredentials | 401          |
      | wrongGrantType     | accounts payments | `clientAssertion`  | 400          |
      | client_credentials | other             | `clientAssertion`  | 200          |


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
    When the TPP makes the GET /apis/v2/oauth/authorize
    Then response code should be <responseCode>

    Examples:
      | clientId         | redirectUri                          | state    | nonce | scope                    | responseType  | description                         | responseCode | urns                                                                |

      | invalidClientId  | http://localhost/                    | abcd1234 | 1     | openid accounts payments | code id_token |                                     | 401          | urn:openbank:intent:accounts:1000                                   |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 2     | openid invalidScope      | code id_token | urn:openbank:intent:accounts:1000   | 400          | urn:openbank:intent:accounts:1000                                   |
      | `TPPAppClientId` | http://localhost/notValidRedirectUri | abcd1234 | 3     | openid accounts          | code id_token | urn:openbank:intent:accounts:1000   | 400          | urn:openbank:intent:accounts:1000                                   |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 4     | openid accounts          | code id_token | invalidURN                          | 400          | invalidURN                                                          |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 5     | openid accounts          | code id_token | urn:openbank:intent:accounts:1000   | 302          | urn:openbank:intent:accounts:1000                                   |
#nonce error returned with 302
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 5     | openid accounts          | code id_token | urn:openbank:intent:accounts:1000   | 302          | urn:openbank:intent:accounts:1000                                   |

      #| `validClientId` | http://localhost/                    | abcd1234 | 6 | openid accounts          | code id_token | onlyPaymentClaimURN                 | 400          |                                                                     |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 7     | openid payments          | code id_token | onlyAccountClaimURN                 | 400          | urn:openbank:intent:accounts:1000                                   |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 8     | openid accounts          | code id_token | onlyAccountClaimURN                 | 302          | urn:openbank:intent:accounts:1000                                   |
      #| `validClientId` | http://localhost/                    | abcd1234 | 9 | openid payments          | code id_token | onlyPaymentClaimURN                 | 302          | |
      #| `validClientId` | http://localhost/                    | abcd1234 | 10 | openid accounts          | code id_token | multipleClaimWithoutAccountClaimURN | 400          | |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 12    | openid payments          | code id_token | multipleClaimWithoutPaymentClaimURN | 400          | urn:openbank:intent:accounts:1000,urn:openbank:intent:accounts:1001 |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 13    | openid accounts          | code id_token | multipleClaimWithAccountClaimURN    | 302          | urn:openbank:intent:accounts:1000,urn:openbank:intent:accounts:1001 |
      #| `validClientId` | http://localhost/                    | abcd1234 | 14 | openid payments          | code id_token | multipleClaimWithPaymentClaimURN    | 302          | |
      #| `validClientId` | http://localhost/                    | abcd1234 | 15 | openid accounts payments | code id_token | multipleClaimURN                    | 302          | |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 16    | openid                   | code id_token | onlyAccountClaimURN                 | 302          | urn:openbank:intent:accounts:1000                                   |
      #| `validClientId` | http://localhost/                    | abcd1234 | 17 | openid                   | code id_token | onlyPaymentClaimURN                 | 302          | |
      | `TPPAppClientId` | http://localhost/                    | abcd1234 | 18    | openid accounts payments | code id_token | noClaimURN                          | 400          |                                                                     |
#need to add scenarios for different responseTypes

#UI FLOWS
  Scenario Outline: When the user is redirect to login page
    Given TPP sets the request queryParams and creates the request Object And User makes authorize call and redirected to login
      | parameter     | value             |
      | client_id     | `TPPAppClientId`  |
      | redirect_uri  | http://localhost/ |
      | state         | abcd1234          |
      | scope         | openid accounts   |
      | response_type | code id_token     |
      | urns          | <urn>             |
      | nonce         | <nonce>           |
    When User enters <username> and <password> and submits the form
    Given Login Succeeds
    When User selects the <accounts> on consent page and submits the form
    Given Consent Succeeds
    When User enter the otp <otp> on sms verification page and submits the form
    Then OTP verification Succeeds and User is redirected with auth code with <status>

    Examples:
      | username | password  | otp  | accounts                      | nonce | status  | urn                               |
      | rohan    | Qwerty123 | 4567 | 111111111                     | 12    | success | urn:openbank:intent:accounts:1005 |
      | rohan    | Qwerty123 | 4567 | 111111111,123459876           | 122   | success | urn:openbank:intent:accounts:1006 |
      | rohan    | Qwerty123 | 4567 | 111111111,123459876,987654321 | 321   | success | urn:openbank:intent:accounts:1007 |
    #need to handle negative test cases
      #| wrongusernameorpass | wrongusernameorpass | 4567 | 111111111                     |   412    | failure |
      #| rohan               | Qwerty123           | 4567 |                              | | success |

  Scenario: TPP create a auth code
    Given TPP create a auth code and stores in the global variable
#TPP fetching the access token with the authcode
  Scenario Outline: TPP Fetching access token from authcode
    Given TPP sets the request formBody
      | parameter             | value                                                            |
      | grant_type            | <type>                                                           |
      | code                  | <authCode>                                                       |
      | redirect_uri          | <redirectUri>                                                    |
      | client_assertion_type | urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer |
      | client_assertion      | <jwtCredentials>                                                 |
    When the TPP makes the POST /apis/v2/oauth/token
    Then response code should be <responseCode>

    Examples:
      | authCode   | type               | redirectUri                          | clientIdSecret64 | responseCode | jwtCredentials         |

      | `authCode` | authorization_code | http://localhost/                    | validCredentials | 200          | `clientAssertion`      |
     #| authorization_code | authorization_code | http://localhost/                    | validCredentials | 200          | `clientAssertion`      |
      | wrongType  | authorization_code | http://localhost/                    | validCredentials | 400          | `clientAssertion`      |
      | `authCode` | authorization_code | http://localhost/                    | validCredentials | 400          | `clientAssertion`      |
      | `authCode` | authorization_code | http://localhost/notValidRedirectUri | validCredentials | 400          | `clientAssertion`      |
      | `authCode` | authorization_code | http://localhost/                    | validCredentials | 401          | invalidClientAssertion |



		
		
	