#!/usr/bin/env bash

### Delete App Resources ###
echo `date`": Deleting Developer, Product, App ; Please hang On !!"

### apps
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps/AISP_App"  1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps/PISP_App"  1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps/Opendata_App"  1>&2`
echo "${SETUP_RESULT}"
echo ""

### developer
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/developers/openbank@apigee.net"  1>&2`
echo "${SETUP_RESULT}"
echo ""

### products
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/apiproducts/open_data_apis"  1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/apiproducts/payment_transfer_apis"  1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/apiproducts/account_access_apis"  1>&2`
echo "${SETUP_RESULT}"
echo ""

### End - Delete App Resources ###


### Create App Resources Now ###
echo `date`": Creating Developer, Product, App ; Please hang On !!"

### developer
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers" -H "Content-Type: application/json" -d '{"email":"openbank@apigee.net", "firstName":"OpenBank","lastName":"Developer","userName":"openbank"}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

### products
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/apiproducts" -H "Content-Type: application/json" -d '{"approvalType":"auto", "displayName":"Open Data APIs","name":"open_data_apis","environments":["test","prod"],"scopes":["openid", "atms", "branches"], "proxies":["oauth", "locations", "products"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/apiproducts" -H "Content-Type: application/json" -d '{"approvalType":"auto", "displayName":"Payment Transfer APIs","name":"payment_transfer_apis","environments":["test","prod"],"scopes":["openid", "accounts", "transfer", "payment"], "proxies":["oauth", "transfers", "accounts", "userinfo"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/apiproducts" -H "Content-Type: application/json" -d '{"approvalType":"auto", "displayName":"Account Access APIs","name":"account_access_apis","environments":["test","prod"],"scopes":["openid", "accounts", "accounts-info", "accounts-balance", "accounts-transactions"], "proxies":["oauth", "accounts", "userinfo"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

### apps

#### aisp app
callback_url=http://apigee.com/about,psd2app://app.com
app_data="{\"name\":\"AISP_App\", \"callbackUrl\":\"${callback_url}\"}"
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps" -H "Content-Type: application/json" -d "$app_data" `
echo "${SETUP_RESULT}"

apikey=${SETUP_RESULT#*consumerKey*:}
apikey=`echo ${apikey%,*consumerSecret*} | tr -d ' '`
apisecret=${SETUP_RESULT#*consumerSecret*:}
apisecret=`echo ${apisecret%,*expiresAt*} | tr -d ' '`
echo "Generated API Key: ${apikey}"
echo "Generated API Secret: ${apisecret}"
echo ""

ckey=`echo ${apikey} | tr -d '"'`
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps/AISP_App/keys/${ckey}" -H "Content-Type: application/xml" -d '<CredentialRequest><ApiProducts><ApiProduct>account_access_apis</ApiProduct></ApiProducts></CredentialRequest>' `
echo "${SETUP_RESULT}"


#### pisp app
callback_url=http://apigee.com/about,psd2app://app.com
app_data="{\"name\":\"PISP_App\", \"callbackUrl\":\"${callback_url}\"}"
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps" -H "Content-Type: application/json" -d "$app_data" `
echo "${SETUP_RESULT}"

apikey=${SETUP_RESULT#*consumerKey*:}
apikey=`echo ${apikey%,*consumerSecret*} | tr -d ' '`
apisecret=${SETUP_RESULT#*consumerSecret*:}
apisecret=`echo ${apisecret%,*expiresAt*} | tr -d ' '`
echo "Generated API Key: ${apikey}"
echo "Generated API Secret: ${apisecret}"
echo ""

ckey=`echo ${apikey} | tr -d '"'`
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps/PISP_App/keys/${ckey}" -H "Content-Type: application/xml" -d '<CredentialRequest><ApiProducts><ApiProduct>payment_transfer_apis</ApiProduct></ApiProducts></CredentialRequest>' `
echo "${SETUP_RESULT}"


#### opendata app
callback_url=http://apigee.com/about
app_data="{\"name\":\"Opendata_App\", \"callbackUrl\":\"${callback_url}\"}"
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps" -H "Content-Type: application/json" -d "$app_data" `
echo "${SETUP_RESULT}"

apikey=${SETUP_RESULT#*consumerKey*:}
apikey=`echo ${apikey%,*consumerSecret*} | tr -d ' '`
apisecret=${SETUP_RESULT#*consumerSecret*:}
apisecret=`echo ${apisecret%,*expiresAt*} | tr -d ' '`
echo "Generated API Key: ${apikey}"
echo "Generated API Secret: ${apisecret}"
echo ""

ckey=`echo ${apikey} | tr -d '"'`
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps/Opendata_App/keys/${ckey}" -H "Content-Type: application/xml" -d '<CredentialRequest><ApiProducts><ApiProduct>open_data_apis</ApiProduct></ApiProducts></CredentialRequest>' `
echo "${SETUP_RESULT}"

### End - Create App Resources ###