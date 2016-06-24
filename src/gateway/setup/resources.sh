#!/usr/bin/env bash

### Delete App Resources ###

### delete existing APIs
echo `date`": Deleting oauth API !!"
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/apis/oauth"  1>&2`
echo "${SETUP_RESULT}"
echo ""


### developer
echo `date`": Deleting Developer, Product, App ; Please hang On !!"
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

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/apiproducts/internal_consent_app"  1>&2`
echo "${SETUP_RESULT}"
echo ""

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

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/developers/openbank@apigee.net/apps/Consent_App"  1>&2`
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
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/apiproducts" -H "Content-Type: application/json" -d '{"approvalType":"auto", "displayName":"Open Data APIs","name":"open_data_apis","environments":["test","prod"],"scopes" : ["openid", "atms", "branches"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/apiproducts" -H "Content-Type: application/json" -d '{"approvalType":"auto", "displayName":"Payment Transfer APIs","name":"payment_transfer_apis","environments":["test","prod"],"scopes" : ["openid", "accounts", "transfer", "payment"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/apiproducts" -H "Content-Type: application/json" -d '{"approvalType":"auto", "displayName":"Account Access APIs","name":"account_access_apis","environments":["test","prod"],"scopes" : ["openid", "accounts", "accounts-info", "accounts-balance", "accounts-transactions"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/apiproducts" -H "Content-Type: application/json" -d '{"approvalType":"auto", "displayName":"Internal Consent APIs","name":"internal_consent_apis","environments":["test","prod"],"scopes" : []}' 1>&2`
echo "${SETUP_RESULT}"
echo ""


### apps

#### aisp app
callback_url=http://apigee.com/about
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
callback_url=http://apigee.com/about
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

#sed -i "" "s/__INTKEY__/$apikey/g" ./edge.sh
#sed -i "" "s/__KEY__/$apikey/g" ./edge.sh
#sed -i "" "s/__SECRET__/$apisecret/g" ./edge.sh
#sed -i "" "s/__ORG__/$ORG/g" ./edge.sh
#sed -i "" "s/__ENV__/$ENV/g" ./edge.sh
#sed -i "" "s/__ADMINEMAIL__/$ADMIN_EMAIL/g" ./usergrid.sh
#sed -i "" "s/__APW__/$APW/g" ./usergrid.sh

### End - Create App Resources ###