#!/usr/bin/env bash

cd $1
cp ./config.orig ./config.json
sed -i "" "s/__APPORG__/psubrahmanyam/g" ./config.json
sed -i "" "s/__APPAPP__/apisbank/g" ./config.json
mvn clean install -Dusername=$2 -Dpassword=$3 -Dorg=apis-bank -P$4
cd ..