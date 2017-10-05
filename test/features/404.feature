Feature: 
    As an API Consumer
    I want to receive an error when requesting an unknown resource
    So that I can debug my application
    
    Scenario: Fail to request an unknown resource in the accounts proxy
        Given TPP obtains the oauth accesstoken-client credentials with accounts scope and store in global scope
        And I set Authorization header to Bearer `accesstoken_cc`
        When I GET /ais/open-banking/v1.0/unknown
        Then response code should be 404
        And response body should be valid json
        And response body path ErrorResponseCode should be resource_not_found
        And response body path ErrorDescription should be Resource not found

    Scenario: Fail to request an unknown resource in the oauth proxy
        When I GET /apis/v1.0/oauth/unknown
        Then response code should be 404
        And response body should be valid json
        And response body path ErrorResponseCode should be resource_not_found
        And response body path ErrorDescription should be Resource not found

