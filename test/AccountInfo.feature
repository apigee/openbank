Feature:
  As a TPP
  I want to access Account Information APIs
  So that I can view accounts, transactions and balances

@Debug  
  Scenario: Dynamic Registration
    Given I set Content-Type header to application/json
    And I pipe contents of file dynamicRegistration.json to body
    And I provide a valid eidas cert
    When I POST to /identity/v1/connect/register
    Then response code should be 200
    And response body path $.client_id should be (.*)

  Scenario: Client Credentials Access Token
    Given I have basic authentication credentials `clientId` and `clientSecret`
    And I set form parameters to 
      | parameter   | value               |
      | grant_type  | client_credentials  |
    When I POST to /identity/v1/token
    Then response code should be 200
    And I store the value of body path $.access_token as clientToken in global scope

  Scenario: Create Account Access Consent
    Given I set x-fapi-financial-id header to 123
    And I set Authorization header to Bearer `clientToken`
    And I pipe contents of file accountAccessConsent.json to body
    And I set Content-Type header to application/json
    When I POST to /ais-sandbox/open-banking/v3.1/aisp/account-access-consents
    Then response code should be 201
    And response body path $.Data.ConsentId should be (.+)
  
  Scenario: User Authorizes
    Given I navigate to the authorize page
    When I sign in and consent
    Then I am redirected to the TPP
    And I receive an auth code in a query param
    And I store the auth code in global scope

  Scenario: Generate Access Token
    Given I have basic authentication credentials `clientId` and `clientSecret`
    And I set form parameters to 
      | parameter   | value                   |
      | grant_type  | authorization_code      |
      | code        | `authCode`              |
    When I POST to /identity/v1/token
    Then response code should be 200
    And I store the value of body path $.access_token as userToken in global scope

  Scenario: TPP Accesses Account Information
    Given I set Authorization header to Bearer `userToken`
    And I set x-fapi-financial-id header to test
    When I GET /ais-sandbox/open-banking/v3.1/aisp/accounts
    Then response code should be 200
    And response body path $.Data.Account should be of type array
