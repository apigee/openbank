#!/usr/bin/env bash

### products
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X PUT "${URI}/v1/o/${ORG}/apiproducts/open_data_apis" -H "Content-Type: application/json" -d '{"proxies" : ["oauth, "locations"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X PUT "${URI}/v1/o/${ORG}/apiproducts/payment_transfer_apis" -H "Content-Type: application/json" -d '{"proxies" : ["oauth, "transfers", "accounts"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X PUT "${URI}/v1/o/${ORG}/apiproducts/account_access_apis" -H "Content-Type: application/json" -d '{"proxies" : ["oauth", "accounts"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X PUT "${URI}/v1/o/${ORG}/apiproducts/internal_consent_apis" -H "Content-Type: application/json" -d '{"approvalType":"manual", "proxies" : ["session, "sms-token", "authentication-connector"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""