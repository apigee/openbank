@Registration
Feature:
  As a client with an eIDAS cert
  I want to obtain credentials programmatically
  So that I can use the API

  Scenario: Dynamic Registration
    Given I set Content-Type header to application/json
    And I pipe contents of file dynamicRegistration.json to body
    And I provide a valid eidas cert
    When I POST to /identity/v1/connect/register
    Then response code should be 200
    And response body path $.client_id should be (.*)
