#!/usr/bin/env bash

### Delete Resources First ###

echo curl -u \"${ADMIN_EMAIL}:${APW}\" -X DELETE \"${URI}/v1/o/${ORG}/environments/${ENV}/caches/consent-session-cache\"

echo `date`": Deleting Cache Resources, Please hang On !!"
echo ""
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/environments/${ENV}/caches/consent-session-cache" 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/environments/${ENV}/caches/application-session-cache" 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/environments/${ENV}/caches/nonce-cache" 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/environments/${ENV}/caches/sms-token-cache" 1>&2`
echo "${SETUP_RESULT}"
echo ""

### End - Delete Resources ###


### Create Cache Resources Now ###

echo `date`": Creating Cache Resources, Please hang On !!"
echo ""
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/environments/${ENV}/caches" -T ./resources/consent-session-cache.xml -H "Content-Type: application/xml" -H "Accept: application/xml" 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/environments/${ENV}/caches" -T ./resources/application-session-cache.xml -H "Content-Type: application/xml" -H "Accept: application/xml" 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/environments/${ENV}/caches" -T ./resources/nonce-cache.xml -H "Content-Type: application/xml" -H "Accept: application/xml" 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/environments/${ENV}/caches" -T ./resources/sms-token-cache.xml -H "Content-Type: application/xml" -H "Accept: application/xml" 1>&2`
echo "${SETUP_RESULT}"
echo ""

### End - Create Cache Resources ###