Feature: 
  As a TPP
  I want to access Open Data
  So that I can compare products and display locations

  Scenario: Get ATM Data
    When I GET /atm-sandbox/open-banking/v2.3/atms
    Then response code should be 200
    And response body path $.data[0].Brand[0].ATM should be of type array

