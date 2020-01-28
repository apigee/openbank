Id: docs
Analytics Account: UA-145683737-2

# Open Banking with Apigee

## Open Banking APIs

Find the source on [GitHub](https://github.com/apigee/openbank).

TLDR? Here is a great summary from David Andrzejek (Head of Financial Services, Apigee).

![https://www.youtube.com/watch?v=sZRDsRtqtRw](https://youtube.com)


### Evolution of Banking

- *1658* Thomas Smith Opens the UKs first provincial bank branch in Nottingham
- *1983* Bank of Scotland set up the *Homelink* home online banking system
- *1984* Girobank introduces a dedicated Telephone banking service
- *1999* PayBox launch Mobile Banking
- *2019* UK Banks launch Open Banking APIs
- *20XX* Smart Cars that pay for their own petrol?
- *20XX* Smart Houses that pay for their own utilities?

__In future, banks will no longer own the customer experience. Third Party App Developers will.__

### What is an API?

An ['application programming interface'](https://docs.apigee.com/api-platform/get-started/basic-concepts) is an interface that makes it easy for one application to 'consume' capabilities or data from another application.

![https://www.youtube.com/watch?v=TbVtliFXOOY](https://youtube.com)

### API Management

[API Management](https://apigee.com/about/cp/what-api-management) is the set of processes that enables a business to have control over and visibility into the APIs that connect applications and data across the enterprise and across clouds.

Key aspects include:
- Analytics
- Traffic Management
- Developer Engagment
- Monetization
- Security
- Orchestration
- Mediation

### What is a good developer experience?  

A developer has an idea for an app. They open the banks developer portal.

- In 5 seconds, the developer should know what an API does
- In 5 minutes, the developer should have make a successful request
- In 5 days, the developer should have taken their app to production

If they cannot use your APIs, they will look elsewhere.

### Relevant Legislation 

- In the UK, it is typical to stay with one or two banks for your entire life. In general you will select a bank as a child and may only consider switching when buying a house or other major life event. This is in contrast to mobile phone contracts, where roughly every 18 months you have a trigger to look for a better deal.
- Additionally, there are limited options in the UK. When Metro Bank obtained their banking license in 2010, it was the first high-street banking license issued in over 150 years.

#### CMA
Competitions and Markets Authority investigated the following three questions:
- Is there a weak customer response due to lack of engagement or barrier to
  switch and search?
- Are there barriers to entry and expansion for banks?
- Is the level of concentration of banks having an adverse effect?

The following remedies were proposed:

- Nine Largest Retail Banks in the UK to adopt an Open Banking Standard
- Customer prompts to encourage consideration of switching providers
- "Customers who are satisfied about privacy and security safeguards, and are willing to give consent, will be able to share their own transaction data with trusted intermediaries, which can then offer advice tailored to the individual customer" (section 168)
- "Open APIs are central to our package of remedies" (section 169)

#### PSD2
- Second Revision of the Payment Services Directive in the EU.
- Aimed to “increase competition in an already competitive payments industry, bring into scope new types of payment services, enhance customer protection and security”
- All EU Member States must implement the directive by 13 January 2018 (ish..?!)

Looks to better support two new types of payment service that have entered the market:
- Payment Initiation Services
- Account Information Services The directive requires that Account/Payment Service Providers expose certain data through Open APIs to be consumed by AISPs and PISPs In order to establish trust between all parties, a central registry may be created with all AISPs, PISPs and PSPs registered.

#### Worldwide

We are now seeing a growth in Open Banking regulation around the world. Examples of Open Banking APIs can be found in USA, Jordan, Mongolia, India and Australia.  

### Standards 

The two most popular standards within Europe are:
- Open Banking Implementation Entity
  - Initially funded by the 9 biggest banks in the UK
  - More opinionated specifications
  - Redirect-based authentication only
- Berlin Group
  - Formed of ~40 Banks across the Single Euro Payments Area
  - Greater flexibility in payload structure 
  - Redirect, decoupled and embedded authentication supported


### Use Cases 

- Current Account Comparison Services
- Personal Finance Management
- Affordability Check
- Online Accounting
- Fraud Detection
- Switch Service Demo 

### Beyond Compliance 

Whilst initially, banks have been rushing to meet compliance deadlines, many see APIs as a new channel. Three common questions are: 
- How do we attract developers?
- How can we monetize our API program?
- Can we leverage other banks APIs to provide a better customer experience?
- How can we stand out with innovative APIs?

## Apigee and Open Banking

### Apigee's History with Open Banking

- *Oct 2015* EU Publishes PSD2
- *Feb 2016* UK CMA publishes Retail Banking Market Investigation Report
- *Aug 2016* Apigee builds “Confirmation of Payee” pilot for CMA, paving the way for the OBIE and UK implementation of PSD2
- *Aug 2016* CMA issues ruling for CMA9 compliance by Jan 2018
- *Dec 2016* ABN AMRO launch the first Open Banking service with Apigee
- *Sep 2017* Apigee Open Banking Accelerator Launched 
- *Jan 2018* First of the CMA9 are compliant with UK Open Banking, include Apigee Customers
- *March 2018* OBIE v2.1 Published, OBIE V3.1 Published, adding eIDAS and additional payments requirements 
- *Jan 2019* Updated Apigee Accelerator published supporting OBIE v3.1 standards
- *Sep 2019* PSD2 compliance deadline acrosss Europe

### Customers

#### Nationwide Building Society

Nationwide Building Society CTO Simon Hamilton on how PSD2, the European Commission’s directive on payment services, will provide the U.K. retail bank with new opportunities to build trust with customers, add new services, and collaborate with other innovative firms.

![https://www.youtube.com/watch?v=lSY8WGcY5lA](https://youtube.com)

#### Metro Bank

Read about the Metro Bank [launch](https://www.metrobankonline.co.uk/about-us/press-releases/news/metro-bank-welcomes-open-banking-revolution-with-launch-of-developer-portal/) of their [Developer Portal](https://developer.metrobankonline.co.uk/) with Apigee.

#### ABN AMRO

Koen Adolfs, API banking product owner at ABN AMRO explains how API management helps the Amsterdam-based bank build new customer experiences, simplify innovation and interactions with fintechs, and transform the company's business model.

![https://www.youtube.com/watch?v=OPCFEypX_Uc](https://youtube.com)

#### Yorkshire Building Society

Read about how Yorkshire Building Society Group are [Embracing Open Banking with Apigee](https://cloud.google.com/blog/products/api-management/yorkshire-building-society-group-embracing-open-banking-with-apigee).

#### Macquarie Group

Rajay Rai, head of digital engineering and applied innovation at Macquarie's Banking and Financial Services Group, explains the importance of API management in co-creating value with the Australian bank's customers and partners.

![https://www.youtube.com/watch?v=4lqZgpuv1-o](https://youtube.com)

## Getting Started

### Reference Implementation

A great way to kickstart your API Journey is to deploy an example Apigee Banking Reference Implementation. This will give you a real life example against mock backends to learn the different API flows. You can then make informed decisions about your architecture and implementation.

### Deployment

#### Prerequisites

- Install Git, Node JS and curl (or your favourite REST client)
- If you would like to try a Drupal 8 portal, please install Docker
- Obtain an Apigee Free Evaluation Org [here](https://login.apigee.com/sign__up)
- Set the following Environment Variables:

```
export APIGEE_USER=someone@example.com
export APIGEE_PASS=password
export APIGEE_ORG=orgname
export APIGEE_ENV=test
```

#### Environment

- Create an Encrypted Key Value Map with Mgmt API Credentials. This will be used for Dynamic App registration.

|   |  |
|---|---|
|Map Name | apigee-reference-bank |
|Key | mgmtCredentials |
|Value | Basic (base64 encoded username and password) |

This KVM can be created with the following:

```
curl https://api.enterprise.apigee.com/v1/o/$APIGEE_ORG/e/$APIGEE_ENV/keyvaluemaps -u $APIGEE_USER:$APIGEE_PASS -H "Content-Type: application/json" -d "{ \"name\": \"apigee-reference-bank\", \"encrypted\": \"true\", \"entry\": [{ \"name\": \"mgmtCredentials\", \"value\": \"Basic $(echo -n $APIGEE_USER:$APIGEE_PASS | base64)\" }] }"
```

- Create Products for Open Data, Account Information and Payment Initiation APIs.

#### Obtain the Reference Implementation and deploy it

```
git clone https://github.com/apigee/openbank.git
cd openbank
npm install
npm run deployAll
```

### Testing

```
npm test
```

## Try it out

Obtaining some Public Data:
```
curl https://$APIGEE_ORG-$APIGEE_ENV.apigee.net/atm-sandbox/open-banking/v2.3/atms -v
```

Dynamically Registering an API:
```
curl -H "Content-Type: application/json" -H "SSL-CLIENT-CERT: $(cat ./test/fixtures/eidasCert.txt)" -d "@./test/fixtures/dynamicRegistration.json" https://$APIGEE_ORG-$APIGEE_ENV.apigee.net/identity/v1/connect/register -v
```

Make a note of the client id and secret!
```
export CLIENT_ID=xxx
export CLIENT_SECRET=xxx
```

Obtain a client credentials Access Token:
```
curl -u $CLIENT_ID:$CLIENT_SECRET -d "grant_type=client_credentials" https://$APIGEE_ORG-$APIGEE_ENV.apigee.net/identity/v1/token -v
```

Make a note of the token:
```
export CLIENT_TOKEN=xxx
```

Create Account Access Consent:
```
curl -H "x-fapi-financial-id: 123" -H "Authorization: Bearer $CLIENT_TOKEN" -d "@./test/fixtures/accountAccessConsent.json" -H "Content-Type: application/json" https://$APIGEE_ORG-$APIGEE_ENV.apigee.net/ais-sandbox/open-banking/v3.1/aisp/account-access-consents -v
```

User Authorization:
Open your browser to `https://$APIGEE_ORG-$APIGEE_ENV.apigee.net/mock-idp/auth?client_id=$CLIENT_ID&redirect_uri=https://httpbin.org/get&response_type=code&scope=openid&state=123`

Follow the steps and make a note of the auth code:
```
export AUTH_CODE=xxx
```

Obtain a User Access Token:
```
curl -u $CLIENT_ID:$CLIENT_SECRET -F "client_id=$CLIENT_ID" -F "grant_type=authorization_code" -F "code=$AUTH_CODE" -F "redirect_uri=https://httpbin.org/get" https://$APIGEE_ORG-$APIGEE_ENV.apigee.net/identity/v1/token -v
```

Make a note of the token:
```
export USER_TOKEN=xxx
```

Access some Account information:
```
curl -H "Authorization: Bearer $USER_TOKEN" -H "x-fapi-financial-id: 123" https://$APIGEE_ORG-$APIGEE_ENV.apigee.net/ais-sandbox/open-banking/v3.0/aisp/accounts -v
```

## Understanding the Flows

Open Banking specifications are a combination of [OAuth 2.0](https://tools.ietf.org/html/rfc6749), [Open ID Connect](https://openid.net/connect/), [FAPI](https://openid.net/wg/fapi/), [eIDAS](https://en.wikipedia.org/wiki/EIDAS) and specific Open Banking API interfaces. Full documentation for these API Flows can be found in the Open Banking [Specifications](https://www.openbanking.org.uk/providers/standards/).

![Auth Flow](auth.png)]

## Developer Portal

A great way to quickly evaluate a Drupal 8 Developer Portal is to use the [Apigee Kickstart](https://www.drupal.org/project/apigee_devportal_kickstart) module.

Firstly, get the Docker Kickstart Project:
```
git clone https://github.com/apigee/docker-apigee-drupal-kickstart
```

Next, you can build the docker image and start a container:
```
(cd docker-apigee-drupal-kickstart && ./start.sh)
```

Navigate to `localhost:8080` and follow the installation wizard. For demo purposes, SQLite should be selected to remove the need to connect to an external database.

Once installed, you can install the specifications in the `portal` directory. Remember to change the `host` value to your Apigee Host URL + Base path. Please refer to the setup instructions [here](https://docs.apigee.com/api-platform/publish/drupal/open-source-drupal-8).

## Beyond Banking

Now that you have met regulatory requirements, it is time to innovate beyond the standards required by regulations. 

As a starting point, you can understand the Digital Maturity of your organization using the [Apigee Compass](http://compass.apigee.com) tool. The recommendations provided by this short questionnaire will help you focus your efforts.

![https://www.youtube.com/watch?v=iAzH_2pwCxk](https://youtube.com)

With the sandboxes you have built, you may also choose to run a hackathon. [Hackathons](https://community.apigee.com/articles/39527/hermes-hackathon-at-leeds-beckett-university-uk.html) with internal staff, students from a local university or external third parties will give you useful feedback on the quality of your solution and how others will invite with your APIs.

Keep us informed on your journey in the future!

