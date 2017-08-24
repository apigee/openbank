# [![apigee.com](http://apigee.com/about/sites/all/themes/apigee_themes/apigee_mktg/images/logo.png)](http://apigee.com) Openbank

The Apigee Open Banking APIx solution simplifies and accelerates the process of delivering open banking by providing secure, ready-to-use APIs along with the computing infrastructure to support internal and external innovation.

## Update!

This repository is organized into the following sections

[Design](#design)
- [Architecture](#architecture)
- [Security](#security)
- [APIs](#functional-apis)  

[Setup](#setup)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Developer Portal](#developer-portal)

[Changelog](#changelog)

## Overview

The OpenBank solution is built on Apigee Edge API Management Platform, and features the following APIs:

**Account Access APIs**
  - Account Request 
  - Account Information 
  - Transactions
  - Balances
  - Direct Debits
  - Standing Orders
  - Products
  
**Security APIs**
  - OAuth
  - UserInfo

![enter image description
here](http://openbank.apigee.com/sites/default/files/openbank_architecture.png)

The Account Access API follows the Open Banking ![Account and Transaction API Specification - v1.0.0](https://www.openbanking.org.uk/read-write-apis/account-transaction-api/v1-0-0/)

It also provides an implementation of ![Open Banking Security Profile v1.0.0](https://www.google.com/url?q=https%3A%2F%2Fopenbanking.atlassian.net%2Fwiki%2Fspaces%2FWOR%2Fpages%2F4297946%2F1.%2BOpen%2BBanking%2BSecurity%2BProfile%2B-%2Bv1.0.0&sa=D&sntz=1&usg=AFQjCNGeP_lI2auSpn6nZi9csdk5Fnidhw). It is  **OpenID** and **oAuth** based authentication, having **consent** and **two-factor authentication** using phone number and PIN based authentication using external SMS API.

### Repository Overview

This repository contains the necessary artifacts that will allow one to pull up
a complete set of **Banking APIs** that comply with CMA 1.0 specification (that in turn comply with _Openbanking_ and _PSD2_ )
regulations. In addition this will also allow one to build a _sandbox_ complete
with a **Developer Portal**, dummy backend and a sample app.

## Design

The APIs provided are configurable to connect to one's own Core Banking systems and 
for the use of ones own applications to manage end user consent. The following sections will help you
understand this solution so that you can go about this on your own.


### Architecture

![API Architecture](http://imageshack.com/a/img922/3760/tCOiYq.png)

The Banking APIs are designed such that each API is chained together as Northbound <-> Southbound APIs.

As shown in the architecture diagram above, the message flow is as follows: 
End user Application <-> _Northbound APIs_ <-> _Southbound APIs_ <-> Backend Systems (Core Banking / Payment etc)


The Northbound API provides a fixed set of interfaces that can be used by
the external consumers. In order to minimize changes to the contract, and there by to applications that connect to it, this API may not be required to change as often.

The Southbound API connects to the actual backend of the bank. We have used a dummy
backend as a default as part of this solution build out. Therefore you may want to modify the southbound interfaces to suite your specific backend needs. 

All **Southbound APIs** end with the suffix _'-connector'_

In addition, there are some internal APIs which are not exposed outside, but
which are used internally from the other APIs and provide common services such as
sending out SMS, storing and fetching session data etc.


Each API deployed in Apigee Edge is encapsulated withing a unit of deployment called a [Proxy](http://docs.apigee.com/api-services/content/understanding-apis-and-api-proxies).
To Learn more on the basic concepts of how to manage these within Apigee Edge, please refer to : 
http://docs.apigee.com/api-services/content/what-apigee-edge

Each of the following entities in the sequence diagram below, such as oAuth, consent-app , session,authentication-connector are examples of proxies.  

There are two broad sets of proxy defenitions in the solution. One set, **Security**,  helps manage the security around the APIs while the other is the set of **Functional APIs** that a bank would like to expose. For example: accounts, payments, branch locations etc.


### Security 
In this solution, access to all APIs are protected via a security mechanism, that requires explicit end user authentication and authorization to make a successful API call. We have broadly used the OAuth 2.0 framework to secure these APIs, with integrated consent management application to manage end user authorization. Therefore, one has to obtain a valid **Access Token** or a one time Token via the Security APIs before making an call to the Functional APIs.
In order to enable **two-factor authentication** for the functional APIs, OTP(one time password) mechanism via SMS has been enabled for each of the APIs, which can be disabled on demand. The sequence diagram below gives an overview on the call flow between various security related proxies to fetch a valid Access Token with two-factor authentication enabled.
#### OAuth API Flow

![OAuth API
Interaction](./images/oauth-consent-flow.png)

#### Login App

The login app provides a basic user authentication funcationality. The banks might want to replace it with their corporate login app

#### Consent App

The consent app plays a key role in helping the user securely authenticate with the bank. The consent app is a trusted app of the bank which will allow the user to login and subsequently provide consent information.

The consent app will talk to the following APIs in order to
fulfill its functionality : Session API, SMS API, Accounts-connector API, Authentication-connector API.
For more details on each of these APIs, refer to the README.md of the respective proxy which exposes these APIs.

### Functional APIs

The Functional APIs deployed and available as part of OpenBank solution are broadly classified as follow:

#### **1. Accounts Information APIS** 
Account information APIs provide information for a single account held by the consumer. Information is categorized into:

 - Information
 - Balance
 - Transactions  

An API end point is provided for each type of information.
These Account Information APIs are secured with **oAuth 2.0** and need a **valid Access token** for making API calls. 
Banking APIs provide developers with the information needed to create innovative fintech apps for consumers.There are a few obvious use cases worth mentioning:

 - Aggregation of financial metrics such as net worth and savings across multiple accounts.
 - Analysis and recommendations for better money management.
 - Reccomendation of products and deals based on monthly statements.


## Apigee Edge Setup

### Getting Started

+   Create an [Apigee API Management Developer Account](https://enterprise.apigee.com)
+   Create an [Apigee BaaS Account](https://apibaas.apigee.com)
+   Request For [Apigee Developer Portal](https://goo.gl/j8Vbew)

To Learn more on the basic concepts of Apigee Edge, please refer to : 
http://docs.apigee.com/api-services/content/what-apigee-edge


To deploy the APIs and its dependencies on your own org please run the following
script from the root folder of the cloned repo.

### Installation 

#### Pre-requisites
+ node.js 
+ npm

#### Instructions

Install gulp 
```
npm install --global gulp-cli
```

Pull node modules
```
npm install
```

Run the deploy command
```
gulp deploy 
```

This will interactively prompt you for following details, and will then create / deploy all relevants bundles and artifacts and will provision the **OpenBank Sandbox** on your own Org.

+ Edge Org name
+ Edge Username
+ Edge Password
+ Edge Env for deployment
+ BaaS Org Name
+ BaaS App Name
+ BaaS Org Client Id
+ BaaS Org Client Secret 
+ Consent Session Key for signing the Session Cookie
+ Login App Key for signing the user details 




#### Test

Once the deploy script is complete, run the following command to do a basic sanity test that the APIs are working

change to test folder
```
cd test
```

install node modules
```
npm install
```

run tests
```
gulp test
```

## Changelog

#### 2017/08/24
* APIs / API Spec
    * APIs are made compliant with OpenBanking v1.0.0
    * Support for Open Bank Security Profile v1.0.0 - hybrid flow


#### 2017/06/20

* APIs / API Spec
    * APIs are made compliant with CMA 0.1 spec 
    * Support for CMA 0.1 consent model for Accounts and Payments APIs


#### 2017/02/20

* APIs / API Spec
    * Refined Products API and added to Developer Portal Smartdocs
    * Updated OpenAPI spec for Products API

* Installation
    * New node-based deployment script
    * New script for easier portal setup
    
* Documentation
    * New video overview of the OpenBank APIs and Installation - http://www.youtube.com/watch?v=8eecvL75B5w 
    * Updated API documenation
    * Updated installation instructions for APIs and Developer Portal


#### 2016/11/03

*   Added Products API
*   Changed URL of OpenData APIs (/atms and /branches)
    *   /apis/v1/opendata/locations/atms -> /apis/v1/locations/atms
    *   /apis/v1/opendata/locations/branches -> /apis/v1/locations/branches
