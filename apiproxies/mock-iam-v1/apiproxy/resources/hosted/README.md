# Apigee OIDC Mock

This repo contains a standalone Open ID Connect Identity Provider, ready to deploy to Apigee using Hosted Targets.

It leverages [oidc-provider](https://github.com/panva/node-oidc-provider)

Why use this?

We can enable many flows including Hybrid, Code, Device, PKCE with a couple of lines of configuration change.

Install dependencies:
``` bash
npm install
```

Populate your env variables:
```bash
export APIGEE_USER=xxx
export APIGEE_PASS=xxx
export APIGEE_ORG=xxx
export APIGEE_ENV=xxx
```

Set the org in `app.js`
``` bash
const org = 'org-name'
```

Deploy the bundle: 
(note: for now, only deploy with basepath "/". we need to inject the basepath into the node app in future)
``` bash
./deploy.sh
```

Check it out in your browser:
``` bash
# Check everything is up
https://(api url)/ping

# Get OIDC Details
https://(api url)/.well-known/openid-configuration

# Start the Authorization Flow
https://(api url)/auth?client_id=foo&redirect_uri=https://httpbin.org/get&response_type=code&scope=openid&state=123

```
