#!/usr/bin/env bash

#apikey=__KEY__
#apisecret=__SECRET__
auth=`echo ${apikey}:${apisecret} | base64`
host=$ORG-$ENV.apigee.net
#appkey=__UGKEY__
#appsecret=__UGSECRET__
#apporg=apisdeploytest
#appapp=__UGAPP__
#apiintkey=__INTKEY__

#accounts-connector
cp ../accounts-connector/config.orig ../accounts-connector/config.json
sed -i "" "s/__APPORG__/$UGORG/g" ../accounts-connector/config.json
sed -i "" "s/__APPAPP__/$UGAPP/g" ../accounts-connector/config.json

#authentication-connector
cp ../authentication-connector/config.orig ../authentication-connector/config.json
sed -i "" "s/__APPORG__/$UGORG/g" ../authentication-connector/config.json
sed -i "" "s/__APPAPP__/$UGAPP/g" ../authentication-connector/config.json

#locations-connector
cp ../locations-connector/config.orig ../locations-connector/config.json
sed -i "" "s/__APPORG__/$UGORG/g" ../locations-connector/config.json
sed -i "" "s/__APPAPP__/$UGAPP/g" ../locations-connector/config.json

#transfers-connector
cp ../transfers-connector/config.orig ../transfers-connector/config.json
sed -i "" "s/__APPORG__/$UGORG/g" ../transfers-connector/config.json
sed -i "" "s/__APPAPP__/$UGAPP/g" ../transfers-connector/config.json

#oauth
cp ../oauth/config.orig ../oauth/config.json
sed -i "" "s/__HOST__/$host/g" ../oauth/config.json

#transfers
cp ../transfers/config.orig ../transfers/config.json
sed -i "" "s/__HOST__/$host/g" ../transfers/config.json

#consent-app
cp ../consent-app/apiproxy/resources/node/config.orig ../consent-app/apiproxy/resources/node/config.json
sed -i "" "s/__HOST__/$host/g" ../consent-app/apiproxy/resources/node/config.json
sed -i "" "s/__APIINTKEY__/$INTKEY/g" ../consent-app/apiproxy/resources/node/config.json

#consent-app-transfers
cp ../consent-app-transfers/apiproxy/resources/node/config.orig ../consent-app-transfers/apiproxy/resources/node/config.json
sed -i "" "s/__HOST__/$host/g" ../consent-app-transfers/apiproxy/resources/node/config.json
sed -i "" "s/__APIINTKEY__/$INTKEY/g" ../consent-app-transfers/apiproxy/resources/node/config.json
