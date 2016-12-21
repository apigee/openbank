#!/usr/bin/env bash

### Delete App Resources ###

### apps
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps/Consent_App"  1>&2`
echo "${SETUP_RESULT}"
echo ""

### products
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/apiproducts/internal_consent_app"  1>&2`
echo "${SETUP_RESULT}"
echo ""

### End - Delete App Resources ###


### Create App Resources Now ###

### products
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/apiproducts" -H "Content-Type: application/json" -d '{"approvalType":"auto", "attributes":[{"name":"access","value":"private"}], "displayName":"Internal Consent APIs","name":"internal_consent_apis","environments":["test","prod"],"scopes":[], "proxies":["session", "sms-token", "authentication-connector", "oauth"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

### apps

#### consent app
callback_url=http://apigee.com/about
app_data="{\"name\":\"internal_consent_app\", \"callbackUrl\":\"${callback_url}\"}"
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps" -H "Content-Type: application/json" -d "$app_data" `
echo "${SETUP_RESULT}"

apikey=${SETUP_RESULT#*consumerKey*:}
apikey=`echo ${apikey%,*consumerSecret*} | tr -d ' '`
apisecret=${SETUP_RESULT#*consumerSecret*:}
apisecret=`echo ${apisecret%,*expiresAt*} | tr -d ' '`
echo "Generated API Key: ${apikey}"
echo "Generated API Secret: ${apisecret}"
echo ""

INTKEY=${apikey%\"}
INTKEY=${INTKEY#\"}

ckey=`echo ${apikey} | tr -d '"'`
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps/internal_consent_app/keys/${ckey}" -H "Content-Type: application/xml" -d '<CredentialRequest><ApiProducts><ApiProduct>internal_consent_apis</ApiProduct></ApiProducts></CredentialRequest>' `
echo "${SETUP_RESULT}"

### End - Create App Resources ###