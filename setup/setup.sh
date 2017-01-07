#!/bin/bash

### setup.sh

URI="https://api.enterprise.apigee.com"
UGURI="https://apibaas-trial.apigee.net"
LOGFILE="deploy.log"

if [ -f "setup/config.sh" ];
then
  . setup/config.sh
fi

usage() {
  echo "Usage: $(basename $0) [-o <org name>] [-e <env name>] [-u <admin email>] [-p <admin password>]"
  echo "  -h | --help :                        Display usage information"
  echo "  -o | --org <orgname> :               Organisation Name"
  echo "  -e | --env <envname> :               Environment Name"
  echo "  -u | --username <adminusername> :    Admin Email"
  echo "  -p | --password <password> :         Admin Password"
  echo "  -b | --baas <baasorg> :              BaaS Organisation"
  echo "  -a | --app <baasapp> :               BaaS Application"
  echo "  -c | --clientid <clientid> :         BaaS Org Client Id"
  echo "  -s | --clientsecret <clientsecret> : BaaS Org Client Secret"
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
  -b|--baas)
    if [ -n "$2" ]; then
      UGORG=$2
      shift
      shift
    else
      usage
    fi
    ;;
  -a|--app)
    if [ -n "$2" ]; then
      UGAPP=$2
      shift
      shift
    else
      usage
    fi
    ;;
  -c|--clientid)
    if [ -n "$2" ]; then
      UGCLIENTID=$2
      shift
      shift
    else
      usage
    fi
    ;;
  -s|--clientsecret)
    if [ -n "$2" ]; then
      UGCLIENTSECRET=$2
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

if [ -z "${UGORG}" ]; then
    echo "Enter Apigee BaaS Org, followed by [ENTER]:"
    read UGORG
fi

if [ -z "${UGAPP}" ]; then
    echo "Enter BaaS Application Name, followed by [ENTER]:"
    read UGAPP
fi

if [ -z "${UGCLIENTID}" ]; then
    echo "Enter Org Client ID, followed by [ENTER]:"
    read UGCLIENTID
fi

if [ -z "${UGCLIENTSECRET}" ]; then
    echo "Enter Org Client Secret, followed by [ENTER]:"
    read UGCLIENTSECRET
fi

echo ""
HOST=$ORG-$ENV.apigee.net
echo $HOST


### Create edge and baas resources ###
. setup/cache.sh
. setup/usergrid.sh
. setup/apis.sh
. setup/api-products.sh
. setup/app-products.sh
. setup/apps.sh

echo "Finally, the setup is complete. Have fun using the APIs"
