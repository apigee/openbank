@PaymentInit
Feature:
  As a TPP
  I want to access Payment Initiation APIs
  So that I can process payments
  
  Scenario: Client Credentials Access Token
    Given I have basic authentication credentials `clientId` and `clientSecret`
    And I set form parameters to 
      | parameter   | value               |
      | grant_type  | client_credentials  |
    When I POST to /identity/v1/token
    Then response code should be 200
    And I store the value of body path $.access_token as clientToken in global scope

  Scenario: Create Domestic Payment Consent
    Given I set x-fapi-financial-id header to 123
    And I set x-idempotency-key header to 123
    And I set x-jws-signature header to 123
    And I set Authorization header to Bearer `clientToken`
    And I set Content-Type header to application/json
    And I pipe contents of file paymentConsent.json to body
    When I POST to /pis-sandbox/open-banking/v3.1/pisp/domestic-payment-consents
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
    When I GET /pis-sandbox/open-banking/v3.1/pisp/domestic-payments/123
    Then response code should be 200
    And response body path $.Data.DomesticPaymentId should be (.+)
