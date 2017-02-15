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
+ node.js 
+ npm

### Run following commands
Install gulp 
```
npm install --global gulp-cli
```

Pull node modules
```
npm install
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
or provide your own applications to manage end user consent. The following sections will help you
understand this solution so that you can go about this on your own.


### Architecture

![API Architecture](http://imageshack.com/a/img922/3760/tCOiYq.png)

The Banking APIs are designed as Northbound + Southbound APIs.

As shown in the architecture diagram above, the message flows is as follows: 
End user Application <-> _Northbound APIs_ <-> _Southbound APIs_ <-> Backend Systems (Core Banking / Payment etc)


The Northbound API provides a fixed set of interfaces that can be used by
the external consumers. In order to minimize changes to the contract, and there by to applications that connect to it, this API will not be required to change as often.

The Southbound API connects to the actual backend of the bank. We have used a dummy
backend as a default as part of this solution build out. Therefore you may want to modify the southbound interfaces to suite your specific backend needs. 

All **Southbound APIs** end with the suffix _'-connector'_

In addition, there are some internal APIs which are not exposed outside, but
which are used internally from the other APIs and provide common service such as
sending out SMS, storing and fetching session data etc.

Concepts :

Each API deployed in Apigee Edge is encapsulated withing a unit of deployment called a Proxy (http://docs.apigee.com/api-services/content/understanding-apis-and-api-proxies). To Learn more on the basic concepts of how to manage these within Apigee Edge, please refere to : 
http://docs.apigee.com/api-services/content/what-apigee-edge

For instance each of the following entities in the sequence diagram below, such as , , , , , ,  are examples of proxies.  

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

The following categories of API proxies will be deployed as part of this solution

###Security 
These set of proxies enable securing the APIs when they are exposed.

<img src="readme-images/security.png">

**1. Oauth**
Oauth is commonly used as a way for Internet users to authorize websites or applications to access their information on other websites but without giving them the passwords. OAuth 2.0 provides a way for apps to gain limited access to a user's protected resources. This oauth proxy has APIs exposed which helps in generating access token for client Apps which can be further used for making authorized API calls through oauth flow.

**2. Authentication Connector**
This proxy exposes APIs to authenticate the user based on the username and password provided by the user. It communicates with the backend service of the bank to authenticate the user.

**3. Consent-app**
This is used for managing user consent for sharing his/her account information.

**4. Consent-app-transfers**
This is used for managing user consent for initiating secure transactions


###Account 
These proxies will expose all account access APIs eg: GET account balance, GET account transactions etc.

**1. accounts**
Accounts proxy is the northbound proxy which will expose the set of accounts related APIs of a bank securely. Secured with Oauth for authorized API calls.

**2. accounts-connector**
This is the southbound proxy which will communicate with bank's backend service and fetch the required accounts data.

###Transfer 
These proxies will expose APIs for secure initiation of Payments. It Initiates transfer of funds from the consumers account to a recipient account.

**1. transfers**
This is the northbound proxy which will expose the set of APIs securely for initiating secure payments. It is Secured with Oauth for authorised API calls. This will initiate an authentication and consent flow using 2-factor authentication following which it will initiate funds transfer. The payee information is provided to the API as a JWT token. The JWT token is signed with the client secret of the registered app to ensure that it is not tampered with.

**2. transfers-connector**
This is the southbound proxy which connects to the bank backend service for payment initiation.


###OpenData 
These proxies will expose a set of APIs which are open to all, and does not require any level of security for accessing the data. eg: ATM locations data is open to all, and should be made open to all.

**1. locations**
This is the northbound proxy which provides a fixed set of interfaces for locating bank branches and atms that can be relyed on by the external consumers.

**2. locations-connector**
this is the southbound proxy for locations,which connects to the actual backend of the bank (or the mock backend) and provides the data(atms and branch locations) that is exposed by locations. 

**3. products**
This northbound proxy provides APIs for fetching products offered by the bank. Eg: credit cards, loan schemes etc.

**4. products-connector**
It is a southbound proxy which returns the list of product offerings which the bank has.


###Others
These are the proxies which will expose APIs which are internal APIs. They wont be exposed on the developer portal, but will be deployed as part of the openbank solution.

**1. SMS Token** 
sms token proxy exposes APIs to send sms token to users. A simple use case would be, sending otp to the account holder in case of payment initiation when two-factor authentication is enabled.

**2. Session** 
This proxy exposes internally used API for generation and management of user sessions.



## Changelog

#### 2016/11/03

*   Added Products API
*   Changed URL of OpenData APIs (/atms and /branches)
    *   /apis/v1/opendata/locations/atms -> /apis/v1/locations/atms
    *   /apis/v1/opendata/locations/branches -> /apis/v1/locations/branches
