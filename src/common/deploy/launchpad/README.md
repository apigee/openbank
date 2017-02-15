# LAUNCHPAD

A deployment tool for apigee solutions. Helps orchestrating the deployement of any solution comprising of apps, products, developer, proxy, baas data etc

----------------

# DOCUMENTATION

### Developer guide
ref : https://docs.google.com/a/apigee.com/document/d/1ptxyDnFRnH4tKGZb2C1QJ2-Qnp8izvxKCi7vZOJbrSQ/edit?usp=sharing


----------------
## Usage

Usage: gulp < deploy / build / clean > [options]

Options: 

    --resource <RESOURCE>                     Pick any resource defined in config file

    --subresource <SUBRESOURCE1,SUBRESOURCE2> Pick any subresources defined under respective resource in config file 

    --item <ITEM1,ITEM2>                      Pick any items defined in respective RESOURCE,SUBRESOURCE in config file.

    --strict                                  Do not ru dependent tasks. eg. deploy will also run clean and build. 

    --env test                                Choose which edge environment for deployment

    --config <path to config file>            Relative to execution directory


Additional parameters can be passed to deploy script to avoid prompt. see eg2.

eg1 : gulp deploy

eg2 : gulp deploy --username gauthamvk@google.com --org bumblebee --env test --resource openbank_apis


-----------------

## sample config

```
resources:
- name: openbank_apis
  type: solutions.api
  properties:
    inputs:
    - name: org
      prompt: Edge Org name
    - name: username
      prompt: username
      ifNotPresent: token
    - name: password
      prompt: password
      ifNotPresent: token
    - name: env
      prompt: Edge Org Environment
    - name: usergrid_org
      prompt: BaaS services org name
    - name: usergrid_app
      prompt: BaaS services app name
    - name: usergrid_client_id
      prompt: App services App Client Id
    - name: usergrid_secret
      prompt: App services App Client Secret
    configurations:
    - env: test
      baas_host: https://apibaas-trial.apigee.net
      edge_host: https://api.enterprise.apigee.com
    - env : prod
      baas_host: https://apibaas-trial.apigee.net
      edge_host: https://api.enterprise.apigee.com
    script: gulpfile.js
    basePath: .
    dependencies:
    - name: session
      type: proxy
      url: git@revision.aeip.apigee.net:solution-commons/session.git
      version: v1.0.0
    subResources:
    - name: baas_data_load
      type: baasLoadData
      items:
      - name: banks
        permissions: ['get,post,delete:banks','get,post,delete:banks/*','get,post,delete:banks/**']
      - name: transactions
        permissions: ['get,post,delete:transactions','get,post,delete:transactions/*','get,post,delete:transactions/**']
      - name: accounts
        file: setup/data/accounts.json
        permissions: ['get,post,delete:accounts','get,post,delete:accounts/*','get,post,delete:accounts/**']
      - name: customers
        file: setup/data/customers.json
        permissions: ['get,post,delete:customers','get,post,delete:customers/*','get,post,delete:customers/**']
      - name: locations
        file: setup/data/locations.json
        permissions: ['get,post,delete:locations','get,post,delete:locations/*','get,post,delete:locations/**']
      - name: products
        file: setup/data/products.json
        permissions: ['get,post,delete:products','get,post,delete:products/*','get,post,delete:products/**']
    - name: create_connections
      type: baasConnection
      items:
      - name: connections
        file: setup/connections.json
    - name: cacheResources
      type: cache
      items:
      - name: consent-session-cache
        payload: '{ "name": "consent-session-cache"}'
      - name: application-session-cache
        payload: '{ "name": "application-session-cache"}'
      - name: sms-token-cache
        payload: '{ "name": "sms-token-cache"}'
    - name: replaceorgvalues
      type: configSubstitutions
      items:
      - name: baasBasePath
        filePaths: ['src/gateway/accounts-connector/target/apiproxy/policies/Assign.TargetURL.xml','src/gateway/locations-connector/target/apiproxy/policies/Assign.TargetURL.xml','src/gateway/products-connector/target/apiproxy/policies/Assign.TargetURL.xml','src/gateway/transfers-connector/target/apiproxy/policies/Callout.AddTransactionToAccount.xml','src/gateway/transfers-connector/target/apiproxy/targets/default.xml','src/gateway/userinfo/target/apiproxy/policies/Callout.GetUserDetails.xml','src/gateway/authentication-connector/target/apiproxy/targets/default.xml']
        value: '{{ baas_host }}/{{ usergrid_org }}/{{ usergrid_app }}'
      - name: redirectConsentOauth
        filePaths: ['src/gateway/oauth/target/apiproxy/policies/Assign.RedirectConsentApp.xml']
        value: 'https://{{ org }}-{{ env }}.apigee.net/internal/consent?sessionid={messageid}'
      - name: redirectConsentTransfers
        filePaths: ['src/gateway/transfers/target/apiproxy/policies/Assign.RedirectConsentApp.xml']
        value: 'https://{{ org }}-{{ env }}.apigee.net/internal/transfer-consent?sessionid={messageid}'
    - name: bank_apis
      type: proxy
      items:
      - name: accounts
      - name: accounts-connector
      - name: authentication-connector
      - name: locations
      - name: locations-connector
      - name: oauth
      - name: session
      - name: sms-token
      - name: transfers
      - name: transfers-connector
      - name: userinfo

    - name: developers
      type: developer
      items:
      - payload: '{"email":"openbank@apigee.net", "firstName":"OpenBank","lastName":"Developer","userName":"openbank"}'
        email: openbank@apigee.net
    - name: apiProducts
      type: product
      items:
      - payload: '{"approvalType":"auto", "displayName":"Open Data APIs","name":"open_data_apis","environments":["test","prod"],"scopes":["openid", "atms", "branches"], "proxies":["oauth", "locations"]}'
        name: open_data_apis
      - payload: '{"approvalType":"auto", "displayName":"Payment Transfer APIs","name":"payment_transfer_apis","environments":["test","prod"],"scopes":["openid", "accounts", "transfer", "payment"], "proxies":["oauth", "transfers", "accounts"]}'
        name: payment_transfer_apis
      - payload: '{"approvalType":"auto", "displayName":"Account Access APIs","name":"account_access_apis","environments":["test","prod"],"scopes":["openid", "accounts", "accounts-info", "accounts-balance", "accounts-transactions"], "proxies":["oauth", "accounts"]}'
        name: account_access_apis
      - payload: '{"approvalType":"auto", "attributes":[{"name":"access","value":"private"}], "displayName":"Internal Consent APIs","name":"internal_consent_apis","environments":["test","prod"],"scopes":[], "proxies":["session", "sms-token", "authentication-connector", "oauth"]}'
        name: internal_consent_apis
    - name: developerApps
      type: app
      items:
      - name: AISP_App
        payload: '{"name":"AISP_App","callback":"http://apigee.com/about","email":"openbank@apigee.net","apiProducts":"account_access_apis"}'
      - name: PISP_App
        payload: '{"name":"PISP_App","callback":"http://apigee.com/about","email":"openbank@apigee.net","apiProducts":"payment_transfer_apis"}'
      - name: internal_consent_app
        payload: '{"name":"internal_consent_app","callback":"http://apigee.com/about","email":"openbank@apigee.net","apiProducts":"internal_consent_apis"}'
        assignResponse:
        - from: credentials.0.consumerKey
          to: apiKey
      - name: Opendata_App
        payload: '{"name":"Opendata_App","callback":"http://apigee.com/about","email":"openbank@apigee.net","apiProducts":"open_data_apis"}'

    - name: replace_consent_app_key
      type: configSubstitutions
      items:
      - name: consentAppKey
        filePaths: ['src/gateway/consent-app/target/apiproxy/resources/node/config.json','src/gateway/consent-app-transfers/target/apiproxy/resources/node/config.json']
        value: '{{ apiKey }}'
      - name: edgeBasePath
        filePaths: ['src/gateway/consent-app/target/apiproxy/resources/node/config.json','src/gateway/consent-app-transfers/target/apiproxy/resources/node/config.json']
        value: 'https://{{ org }}-{{ env }}.apigee.net'
    - name: consent_apis
      type: proxy
      items:
      - name: consent-app
      - name: consent-app-transfers
```

----------------

## RELEASE

### v1.0.0
- initial release
- basic functionality

### v1.0.1
- multiple items can be deployed
- multiple subresources can be deployed from command line

### v1.0.2
- new subResource localCommand added
- assignResponse subResource is genralized for app, product,proxy,cache, developer subresources

### v1.0.3
- fix dependency pull
- fix localCommand variable replace

### v1.0.4
- fix localCommand

-------------------

## TODO

- p2 data source many

- p2 generate load for generating initial report

- p2 license check

- p2 cache creation with cache properties

- p2 deploy individual dependency from its gulp

- p2 standardize sequential execution of tasks

- p3 constants to diff file eg. baasLoadData.js limit=200



