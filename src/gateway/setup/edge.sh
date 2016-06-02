#!/usr/bin/env bash

apikey="vQHksemCkYSVx5ansxljY4ZX0vNkk6hO"
apisecret="5KcWJGtcq9jxdjZa"
auth=`echo ${apikey}:${apisecret} | base64`
org=everydaybank1
env=test
host=$org-$env.apigee.net
appkey="YXA6mDUQ0Bs1Eea1QnHThsndCw"
appsecret="YXA68EDVldrLVmJFfbJx-3MXWAfoKhI"
apporg=psubrahmanyam
appapp=everydaybank1

#accounts-connector
cp ../accounts-connector/apiproxy/resources/node/config.js.orig ../accounts-connector/apiproxy/resources/node/config.js
sed -i "" "s/__APPORG__/$apporg/g" ../accounts-connector/apiproxy/resources/node/config.js
sed -i "" "s/__APPAPP__/$appapp/g" ../accounts-connector/apiproxy/resources/node/config.js

#authentication-connector
cp ../authentication-connector/apiproxy/targets/default.xml.orig ../authentication-connector/apiproxy/targets/default.xml
sed -i "" "s/__APPORG__/$apporg/g" ../authentication-connector/apiproxy/targets/default.xml
sed -i "" "s/__APPAPP__/$appapp/g" ../authentication-connector/apiproxy/targets/default.xml

#transfers-connector
cp ../transfers-connector/apiproxy/targets/default.xml.orig ../transfers-connector/apiproxy/targets/default.xml
sed -i "" "s/__APPORG__/$apporg/g" ../transfers-connector/apiproxy/targets/default.xml
sed -i "" "s/__APPAPP__/$appapp/g" ../transfers-connector/apiproxy/targets/default.xml

#oauth
cp ../oauth/apiproxy/targets/default.xml.orig ../transfers-connector/apiproxy/targets/default.xml
sed -i "" "s/__APPORG__/$apporg/g" ../transfers-connector/apiproxy/targets/default.xml
sed -i "" "s/__APPAPP__/$appapp/g" ../transfers-connector/apiproxy/targets/default.xml

