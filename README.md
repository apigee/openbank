# <a href="http://apigee.com/"><img src="http://apigee.com/about/sites/all/themes/apigee_themes/apigee_mktg/images/logo.png"/></a> OpenBank

## Digital Services in Banking Space

Before we delve into the specifics of the Solution it may be worthwhile to note
the transformation happening currently in the banking space. Digital is positing
itself in many facets and interactions that a consumer has with the Bank.

![enter image description
here](http://openbank.apigee.com/sites/default/files/openbanking_position.png)

## Overview

Apigee OpenBank Solution enables banks to accelerate development of digital
services. OpenBank is built on Apigee Edge API Management Platform, and
features:

> -   Account Information Access APIs.
> -   Payment Transfer APIs
> -   Open Data APIs
> -   OAuth APIs

It also provides an implementation of OpenID and oAuth based authentication,
consent and two-factor authentication using SMS.

These APIs play a critical role in the digital transformation of banking
services as represented below:

![enter image description
here](http://openbank.apigee.com/sites/default/files/openbank_architecture.png)

## Repository Overview

This repository contains the necessary artifacts that will allow one to pull up
a complete set of **Banking APIs** that comply with _Openbanking_ and _PSD2_
regulations. In addition this will also allow one to build a _sandbox_ complete
with a **Developer Portal**, mock backend and a sample app.

## Prerequisite

+   Apigee API Management Developer Account
+   Apigee API BaaS Account
+   Apigee Developer Portal

## Setup

To deploy the APIs and its dependencies on your own org please run the following
script from the root folder of the cloned repo.

### Pre-requisites
node.js 
npm

### Run following commands
Install gulp 
```npm install --global gulp-cli
```

Pull node modules
```npm install
```

Run the deploy command
```gulp deploy
```

#### Run the deploy command
```
gulp deploy --resource openbank_apis
```


This will interactively prompt you for following details, and will then create / deploy all relevants bundles and artifacts and will provision the **OpenBank Sandbox** on your own Org.

+ Edge Org name
+ Edge Username
+ Edge Password
+ Edge Env for deployment
+ Usergrid(BaaS) Org Name
+ Usergrid(BaaS) App Name
+ Usergrid(BaaS) App Client Id
+ Usergrid(BaaS) App Client Secret 


## Design

The APIs provided are configurable to connect to your own Banking backend and /
or provide your own consent apps. The following sections will help you
understand this solution so that you can go about this on your own.

### Architecture

![API Architecture](http://imageshack.com/a/img922/3760/tCOiYq.png)

The Banking APIs are designed as Northbound + Southbound APIs.

The Northbound API provides a fixed set of interfaces that can be relyed on by
the external consumers. In order to minimize changes to the contract, this API
will not need to be changed once deployed.

The Southbound API connects to the actual backend of the bank (or the mock
backend) and provides the data that is exposed by the _Northbound APIs_ When the
API Developer has to make any changes to the APIs (specifically to connect to a
different backend), then these are the APIs that need to be modified.

All **Southbound APIs** end with the suffix _'-connector'_

In addition, there are some internal APIs which are not exposed outside, but
which are used internally from the other APIs and provide common service such as
sending out SMS, storing and fetching session data etc.

### Sequence Diagram

#### OAuth API Flow

![OAuth API
Interaction](http://www.websequencediagrams.com/files/render?link=R39gE_mlfbXyVC0IS1Z8)

#### Transfers API Flow

### Consent App

The consent app is a key part in helping the user securely authenticate with the
bank. The consent app is a trusted app of the bank will allow the user to login
and subsequently provide consent information.

In this sandbox, the consent app will talk to the following APIs in order to
fulfill its functionality + Session API + SMS API + Accounts-connector API +
Authention-connector API

In order to customize the consent app, or in case one or more components
delivered along with the sandbox is changed, then the configuration of the
consent app needs to be updated.

The consent app has a _config.json_ file available in the
`src/gateway/consent-app/apiproxy/resources/node/` folder. This json file has to
be customized so that the right API endpoints are provided to the consent app.

## APIs

The following API proxies will be deployed as part of this solution

#### accounts

#### accounts-connector

#### authentication-connector

#### consent-app

#### consent-app-transfers

#### locations

#### locations-connector

#### oauth

#### transfers

#### transfers-connector

#### Locations API

#### SMS Token API

#### Session API

#### Accounts Connector

#### Transfer Connector

#### Authentication Connector

#### Locations Connector

### Consent Apps

## Changelog

#### 2016/11/03

*   Added Products API
*   Changed URL of OpenData APIs (/atms and /branches)
    *   /apis/v1/opendata/locations/atms -> /apis/v1/locations/atms
    *   /apis/v1/opendata/locations/branches -> /apis/v1/locations/branches
