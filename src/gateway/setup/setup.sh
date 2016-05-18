
# Revert to original, if we have ever changed these files ...
cp ../accounts/config.orig ../accounts/config.json
cp ../accounts-connector/config.orig ../accounts-connector/config.json

cp ./config.orig ./config.sh
cp ./usergrid.orig ./usergrid.sh

### setup.sh

URI="https://api.enterprise.apigee.com"

usage() {
  echo "Usage: $(basename $0) [-o <org name>] [-e <env name>] [-u <admin email>] [-p <admin password>]"
  echo "  -h | --help :                        Display usage information"
  echo "  -o | --org <orgname> :               Organisation Name"
  echo "  -e | --env <envname> :               Environment Name"
  echo "  -u | --username <adminusername> :    Admin Email"
  echo "  -p | --password <password> :         Admin Password"
  exit 0
}

# if [ $# -eq 0 ]; then
# 	usage
# fi

while [ $# -gt 0 ]; do
  case "$1" in
    -o|--org)
      if [ -n "$2" ]; then
        ORG=$2
        shift
        shift
      else
        usage
      fi
    ;;
    -e|--env)
      if [ -n "$2" ]; then
        ENV=$2
        shift
        shift
      else
        usage
      fi
    ;;
    -u|--username)
      if [ -n "$2" ]; then
        ADMIN_EMAIL=$2
        shift
        shift
      else
        usage
      fi
    ;;
    -p|--password)
      if [ -n "$2" ]; then
        APW=$2
        shift
        shift
      else
        usage
      fi
    ;;
    -h|--help)
      usage
    ;;
    *)
      usage
  esac
done

if [ -z "${ORG}" ]; then
    echo "Enter Apigee Enterprise Organization, followed by [ENTER]:"
    read ORG
fi

if [ -z "${ENV}" ]; then
    echo "Enter Organization's Environment, followed by [ENTER]:"
    read ENV
fi

if [ -z "${ADMIN_EMAIL}" ]; then
    echo "Enter Apigee Enterprise LOGIN EMAIL, followed by [ENTER]:"
    read ADMIN_EMAIL
fi

if [ -z "${APW}" ]; then
    echo "Enter Apigee Enterprise PASSWORD, followed by [ENTER]:"
    read -s -r APW
fi

HOST=$ORG-$ENV.apigee.net
echo $HOST

### Delete Resources First ###

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


### Delete App Resources ###

echo `date`": Deleting Developer, Product, App ; Please hang On !!"
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/developers/user@identity.com"  1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/apiproducts/identityproduct"  1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X DELETE "${URI}/v1/o/${ORG}/developers/user@identity.com/apps/IdentityApp"  1>&2`
echo "${SETUP_RESULT}"
echo ""

### End - Delete App Resources ###


### Create App Resources Now ###
echo `date`": Creating Developer, Product, App ; Please hang On !!"

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers" -H "Content-Type: application/json" -d '{"email":"user@identity.com", "firstName":"Identity","lastName":"User","userName":"iuser"}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/apiproducts" -H "Content-Type: application/json" -d '{"approvalType":"auto", "displayName":"Identity App Product","name":"identityproduct","environments":["test","prod"],"scopes" : [ "openid", "accounts"]}' 1>&2`
echo "${SETUP_RESULT}"
echo ""

callback_url=http://$HOST/identity_app/callback
app_data="{\"name\":\"IdentityApp\", \"callbackUrl\":\"${callback_url}\"}"
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/user@identity.com/apps" -H "Content-Type: application/json" -d "$app_data" `
echo "${SETUP_RESULT}"

apikey=${SETUP_RESULT#*consumerKey*:}
apikey=`echo ${apikey%,*consumerSecret*} | tr -d ' '`
apisecret=${SETUP_RESULT#*consumerSecret*:}
apisecret=`echo ${apisecret%,*expiresAt*} | tr -d ' '`
echo "Generated API Key: ${apikey}"
echo "Generated API Secret: ${apisecret}"
echo ""

ckey=`echo ${apikey} | tr -d '"'`
SETUP_RESULT=`curl -u "${ADMIN_EMAIL}:${APW}" -X POST "${URI}/v1/o/${ORG}/developers/user@identity.com/apps/IdentityApp/keys/${ckey}" -H "Content-Type: application/xml" -d '<CredentialRequest><ApiProducts><ApiProduct>identityproduct</ApiProduct></ApiProducts></CredentialRequest>' `
echo "${SETUP_RESULT}"

sed -i "" "s/__KEY__/$apikey/g" ./config.sh
sed -i "" "s/__SECRET__/$apisecret/g" ./config.sh
sed -i "" "s/__ORG__/$ORG/g" ./config.sh
sed -i "" "s/__ENV__/$ENV/g" ./config.sh
sed -i "" "s/__ADMINEMAIL__/$ADMIN_EMAIL/g" ./usergrid.sh
sed -i "" "s/__APW__/$APW/g" ./usergrid.sh

### End - Create App Resources ###

echo "Calling usergrid.sh ==> for Usergrid dependencies. Hold tight, for some more time."
echo
echo "I promise, we'll have a gala time together ..."

sh ./usergrid.sh

cd ../parent-pom/
mvn clean install -Dusername=${ADMIN_EMAIL} -Dpassword=${APW} -Dorg=${ORG} -P${ENV}

echo "Finally, this setup is complete. Have fun by visiting: http://${ORG}-${ENV}.apigee.net/identity_app/index"


cp config.orig config.sh
cp usergrid.orig usergrid.sh

