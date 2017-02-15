#!/usr/bin/env bash

### usergrid.sh

echo "Fetching App Services Token, to login ..."
token=`curl -X POST ${UGURI}/management/token  -d '{"grant_type":"client_credentials", "client_id": "'${UGCLIENTID}'", "client_secret": "'${UGCLIENTSECRET}'"}' | sed 's/.*access_token\"\:\"\(.*\)\"\,\"expires_in.*/\1/'`

echo "Create App Services Application: ${UGAPP}, with Token: ${token}"
curl -X POST ${UGURI}/management/orgs/${UGORG}/apps?access_token=${token} -d '{"name":"'${UGAPP}'"}'

creds=`curl -X POST ${UGURI}/management/orgs/${UGORG}/apps/${UGAPP}/credentials?access_token="${token}" | sed 's/}//'`
echo "Got App Services Credentials for the App, that was created above: ${creds}"
c_id=${creds#*client_id*:}
c_id=`echo ${c_id%,*} | tr -d ' '`
sec=${creds#*client_secret*:}
sec=`echo ${sec%*} | tr -d ' '`
echo "Client ID: ${c_id}"
echo "Client Secret: ${sec}"

UGKEY=c_id
UGSECRET=sec

echo "Creating Collections"
resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/banks?access_token="${token}"`
echo "Status: Creating Banks Collection: ${resp}"

resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/accounts?access_token="${token}" -T setup/data/accounts.json -H "Content-Type: application/json" -H "Accept: application/json"`
echo "Status: Creating Accounts Collection:${resp}"

#-u "${ADMIN_EMAIL}:${APW}"
resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/customers?access_token="${token}" -T setup/data/customers.json -H "Content-Type: application/json" -H "Accept: application/json"`
echo "Status: Creating Customers Collection:${resp}"

echo "Status: Creating Connections"
resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/customers/123456789/accounts/accounts/2139531801?access_token="${token}"`
resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/customers/123456789/accounts/accounts/1039531801?access_token="${token}"`
resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/customers/36254080/accounts/accounts/84675875469?access_token="${token}"`
resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/customers/84487942/accounts/accounts/19321890873?access_token="${token}"`
resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/customers/62936395/accounts/accounts/17109552631?access_token="${token}"`
resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/customers/46582398/accounts/accounts/74379891646?access_token="${token}"`

resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/transactions?access_token="${token}"`
echo "Status: Creating Transactions Collection:${resp}"

resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/locations?access_token="${token}" -T setup/data/locations.json -H "Content-Type: application/json" -H "Accept: application/json"`
echo "Status: Creating Locations Collection:${resp}"

resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/products?access_token="${token}" -T setup/data/products.json -H "Content-Type: application/json" -H "Accept: application/json"`
echo "Status: Creating Products Collection:${resp}"

resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/roles/guest/permissions?access_token="${token}" -H "Content-Type: application/json" -H "Accept: application/json" -d '{"permission":"get,put,post,delete:/**"}'`
echo "Status: Updating Roles:${resp}"
