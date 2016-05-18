apikey=__KEY__
apisecret=__SECRET__
auth=`echo ${apikey}:${apisecret} | base64`
org=__ORG__
env=__ENV__
host=$org-$env.apigee.net
appkey=__UGKEY__
appsecret=__UGSECRET__
apporg=__UGORG__
appapp=__UGAPP__

#accounts-connector config.js
cp ../accounts-connector/apiproxy/resources/node/config.js.orig ../accounts-connector/apiproxy/resources/node/config.js
sed -i "" "s/__APPORG__/$apporg/g" ../accounts-connector/apiproxy/resources/node/config.js
sed -i "" "s/__APPAPP__/$appapp/g" ../accounts-connector/apiproxy/resources/node/config.js

#authentication-connector default.xml
cp ../authentication-connector/apiproxy/targets/default.xml.orig ../authentication-connector/apiproxy/targets/default.xml
sed -i "" "s/__APPORG__/$apporg/g" ../authentication-connector/apiproxy/targets/default.xml
sed -i "" "s/__APPAPP__/$appapp/g" ../authentication-connector/apiproxy/targets/default.xml

#transfers-connector default.xml
cp ../transfers-connector/apiproxy/targets/default.xml.orig ../transfers-connector/apiproxy/targets/default.xml
sed -i "" "s/__APPORG__/$apporg/g" ../transfers-connector/apiproxy/targets/default.xml
sed -i "" "s/__APPAPP__/$appapp/g" ../transfers-connector/apiproxy/targets/default.xml

