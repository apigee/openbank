Consent-app-transfers is used for user consent management for client APPs. The consent app transfers is invoked when a banks's customer wishes to initiate a payment.
As part of this consent management,
The User is asked to log in with the registered username and password, send otp on registered phone number(two-factor authentication), select from the list of accounts, and provide consent to share his details and initiate payment.
In order to customize the consent-app-transfers, or in case one or more components delivered along with the sandbox is changed, then the configuration of the consent-app-transfers need to be updated.

The consent-app-transfers has a config.json file available in src/gateway/consent/apiproxy/resources/node/ folder. This json file has to be customized so that right API endpoints are provided to the consent app.

 - To change the logo for this consent-app, goto -> consent-app-transfers -> develop -> Scripts -> views/layout.hbs and provide desired logo.
 - To default the username and password, modify the views/login.hbs and provide "value" for the username and password. 

