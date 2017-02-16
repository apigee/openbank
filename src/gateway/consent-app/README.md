Consent-app is used for user consent management for client APPs.

The consent app  is invoked when a banks's customer wishes to make Account Information API calls.

In order to customize the consent-app, or in case one or more components delivered along with the sandbox is changed, then the configuration of the consent-app need to be updated.The consent-app has a config.json file available in src/gateway/consent-app/apiproxy/resources/node/ folder. This json file has to be customized so that right API endpoints are provided to the consent app.

 - To change the logo for this consent-app, goto -> consent-app-transfers -> develop -> Scripts -> views/layout.hbs and provide desired logo.
 - To default the username and password, modify the views/login.hbs and provide "value" for the username and password. 

