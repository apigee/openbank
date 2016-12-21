#!/usr/bin/env bash

host=$ORG-$ENV.apigee.net

#accounts-connector
cp ../accounts-connector/config.orig ../accounts-connector/config.json
sed -i "" "s/__APPORG__/$UGORG/g" ../accounts-connector/config.json
sed -i "" "s/__APPAPP__/$UGAPP/g" ../accounts-connector/config.json

#authentication-connector
cp ../authentication-connector/config.orig ../authentication-connector/config.json
sed -i "" "s/__APPORG__/$UGORG/g" ../authentication-connector/config.json
sed -i "" "s/__APPAPP__/$UGAPP/g" ../authentication-connector/config.json

#userinfo
cp ../userinfo/config.orig ../userinfo/config.json
sed -i "" "s/__APPORG__/$UGORG/g" ../userinfo/config.json
sed -i "" "s/__APPAPP__/$UGAPP/g" ../userinfo/config.json

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
# ticket: APIS-126 
sed -i "" "s/__APPORG__/$UGORG/g" ../transfers-connector/apiproxy/policies/Callout.AddTransactionToAccount.xml
sed -i "" "s/__APPAPP__/$UGAPP/g" ../transfers-connector/apiproxy/policies/Callout.AddTransactionToAccount.xml

### delete default oauth API
echo `date`": Deleting oauth API !!"
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/apis/oauth"  1>&2`
echo "${SETUP_RESULT}"
echo ""

# deploy the APIs
cd ../parent-pom/
mvn clean install -Dusername=${ADMIN_EMAIL} -Dpassword=${APW} -Dorg=${ORG} -P${ENV}
cd ../setup