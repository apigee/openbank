#!/usr/bin/env bash

host=$ORG-$ENV.apigee.net

#accounts-connector
cp src/gateway/accounts-connector/config.orig src/gateway/accounts-connector/config.json
sed -i "s/__APPORG__/$UGORG/g" src/gateway/accounts-connector/config.json
sed -i "s/__APPAPP__/$UGAPP/g" src/gateway/accounts-connector/config.json

#authentication-connector
cp src/gateway/authentication-connector/config.orig src/gateway/authentication-connector/config.json
sed -i "s/__APPORG__/$UGORG/g" src/gateway/authentication-connector/config.json
sed -i "s/__APPAPP__/$UGAPP/g" src/gateway/authentication-connector/config.json

#userinfo
cp src/gateway/userinfo/config.orig src/gateway/userinfo/config.json
sed -i "s/__APPORG__/$UGORG/g" src/gateway/userinfo/config.json
sed -i "s/__APPAPP__/$UGAPP/g" src/gateway/userinfo/config.json

#locations-connector
cp src/gateway/locations-connector/config.orig src/gateway/locations-connector/config.json
sed -i "s/__APPORG__/$UGORG/g" src/gateway/locations-connector/config.json
sed -i "s/__APPAPP__/$UGAPP/g" src/gateway/locations-connector/config.json

#transfers-connector
cp src/gateway/transfers-connector/config.orig src/gateway/transfers-connector/config.json
sed -i "s/__APPORG__/$UGORG/g" src/gateway/transfers-connector/config.json
sed -i "s/__APPAPP__/$UGAPP/g" src/gateway/transfers-connector/config.json

#products-connector
cp src/gateway/products-connector/config.orig src/gateway/products-connector/config.json
sed -i "s/__APPORG__/$UGORG/g" src/gateway/products-connector/config.json
sed -i "s/__APPAPP__/$UGAPP/g" src/gateway/products-connector/config.json

#oauth
cp src/gateway/oauth/config.orig src/gateway/oauth/config.json
sed -i "s/__HOST__/$host/g" src/gateway/oauth/config.json

#transfers
cp src/gateway/transfers/config.orig src/gateway/transfers/config.json
sed -i "s/__HOST__/$host/g" src/gateway/transfers/config.json
# ticket: APIS-126 
sed -i "s/__APPORG__/$UGORG/g" src/gateway/transfers-connector/apiproxy/policies/Callout.AddTransactionToAccount.xml
sed -i "s/__APPAPP__/$UGAPP/g" src/gateway/transfers-connector/apiproxy/policies/Callout.AddTransactionToAccount.xml

### delete default oauth API
echo `date`": Deleting oauth API !!"
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/apis/oauth"  1>&2`
echo "${SETUP_RESULT}"
echo ""

# deploy the APIs
cd src/gateway/parent-pom/
mvn clean install -Dusername=${ADMIN_EMAIL} -Dpassword=${APW} -Dorg=${ORG} -P${ENV}
cd ../../..
