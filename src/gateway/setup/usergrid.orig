#!/usr/bin/env bash

### usergrid.sh

UGURI="https://api.usergrid.com"
#ADMIN_EMAIL=__ADMINEMAIL__
#APW=__APW__

echo curl -X POST ${UGURI}/${UGORG}/${UGAPP}/token  -d '{"grant_type":"password", "username": "'${ADMIN_EMAIL}'", "password": "'${APW}'"}'

echo "Fetching App Services Token, to login ..."
token=`curl -X POST ${UGURI}/management/token  -d '{"grant_type":"password", "username": "'${ADMIN_EMAIL}'", "password": "'${APW}'"}' | sed 's/.*access_token\"\:\"\(.*\)\"\,\"expires_in.*/\1/'`

echo "Create App Services Application: ${UGAPP}, with Token: ${token}"
`curl -X POST ${UGURI}/management/orgs/${UGORG}/apps?access_token="${token}" -d '{"name":"'${UGAPP}'"}'`

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
resp=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST ${UGURI}/${UGORG}/${UGAPP}/banks?access_token="${token}"`
echo "Status: Creating Banks Collection: ${resp}"

resp=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST ${UGURI}/${UGORG}/${UGAPP}/accounts?access_token="${token}" -T ./data/accounts.json -H "Content-Type: application/json" -H "Accept: application/json"`
echo "Status: Creating Accounts Collection:${resp}"

resp=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST ${UGURI}/${UGORG}/${UGAPP}/customers?access_token="${token}" -T ./data/customers.json -H "Content-Type: application/json" -H "Accept: application/json"`
echo "Status: Creating Customers Collection:${resp}"

echo "Status: Creating Transactions Collection:${resp}"
resp=`curl -X POST ${UGURI}/${UGORG}/${UGAPP}/transactions?access_token="${token}"`

#sed -i "" "s/__UGKEY__/$c_id/g" ./edge.sh
#sed -i "" "s/__UGSECRET__/$sec/g" ./edge.sh
#sed -i "" "s/__UGAPP__/$UGAPP/g" ./edge.sh
### End - Create Application ###
