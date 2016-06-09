#!/usr/bin/env bash

### products
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X PUT "${URI}/v1/o/${ORG}/apiproducts/open_data_apis" -H "Content-Type: application/json" -d '{"approvalType":"auto", "displayName":"Open Data APIs","name":"open_data_apis","environments":["test","prod"],"scopes":["openid", "atms", "branches"], "proxies":["oauth", "locations"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X PUT "${URI}/v1/o/${ORG}/apiproducts/payment_transfer_apis" -H "Content-Type: application/json" -d '{"approvalType":"auto", "displayName":"Payment Transfer APIs","name":"payment_transfer_apis","environments":["test","prod"],"scopes":["openid", "accounts", "transfer", "payment"], "proxies":["oauth", "transfers", "accounts"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X PUT "${URI}/v1/o/${ORG}/apiproducts/account_access_apis" -H "Content-Type: application/json" -d '{"approvalType":"auto", "displayName":"Account Access APIs","name":"account_access_apis","environments":["test","prod"],"scopes":["openid", "accounts", "accounts-info", "accounts-balance", "accounts-transactions"], "proxies":["oauth", "accounts"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X PUT "${URI}/v1/o/${ORG}/apiproducts/internal_consent_apis" -H "Content-Type: application/json" -d '{"approvalType":"manual", "displayName":"Internal Consent APIs","name":"internal_consent_apis","environments":["test","prod"],"scopes":[], "proxies":["session", "sms-token", "authentication-connector"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""
