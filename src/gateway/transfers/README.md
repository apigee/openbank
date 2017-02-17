This proxy is the Northbound proxy for the Payment transfer APIs.
It will initiate transfer of funds from the consumers account to a recipient account. The API calls are secured by enabling **two-factor authentication (OTP via SMS)** while initiating the payments. The payee information is provided to the API as a JWT token with the following set of payment claims. The JWT token is signed with the client secret of the registered app to ensure that it is not tampered with.

The two-factor authentication can be disabled by setting the acr_value as 2 while making the API call.

To try the API exposed by this proxy you will need to perform two steps. When you make this call, you will see a HTTP 302 reponse. Copy the value of 'Location' as part of the response and paste it into a browser. This will trigger the Authetication flow. Now complete the consent flow. When the consent flow is completed you will see browser taken to the redirect uri with transaction id and status as query parameters.
