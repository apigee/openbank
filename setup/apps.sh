#!/usr/bin/env bash

#consent-app
cp src/gateway/consent-app/apiproxy/resources/node/config.orig src/gateway/consent-app/apiproxy/resources/node/config.json
sed -i "s/__HOST__/$host/g" src/gateway/consent-app/apiproxy/resources/node/config.json
sed -i "s/__APIINTKEY__/$INTKEY/g" src/gateway/consent-app/apiproxy/resources/node/config.json

#consent-app-transfers
cp src/gateway/consent-app-transfers/apiproxy/resources/node/config.orig src/gateway/consent-app-transfers/apiproxy/resources/node/config.json
sed -i "s/__HOST__/$host/g" src/gateway/consent-app-transfers/apiproxy/resources/node/config.json
sed -i "s/__APIINTKEY__/$INTKEY/g" src/gateway/consent-app-transfers/apiproxy/resources/node/config.json

# deploy the APIs
cd src/gateway/parent-pom-apps/
mvn clean install -Dusername=${ADMIN_EMAIL} -Dpassword=${APW} -Dorg=${ORG} -P${ENV}
cd ../../..
