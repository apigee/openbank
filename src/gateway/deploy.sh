#!/usr/bin/env bash

cd $1
cp ./config.orig ./config.json
sed -i "" "s/__APPORG__/psubrahmanyam/g" ./config.json
sed -i "" "s/__APPAPP__/apisbank/g" ./config.json
mvn clean install -Dusername=psubrahmanyam+apisbank@apigee.com -Dpassword=$3 -Dorg=apis-bank -P$2
cd ..