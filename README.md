## Overview
This repository contains the necessary artifacts that will allow one to pull up a complete set of **Banking APIs** that comply with _Openbanking_ and _PSD2_ regulations. In addition this will also allow one to build a _sandbox_ complete with a **Developer Portal**, mock backend and a sample app.

## Prerequisite
+ Apigee API Management Developer Account
+ Apigee API BaaS Account

## Setup
To deploy the APIs and its dependencies on your own org please run the following script

```bash
$ cd src\gateway
$ sh setup\setup.sh
```

This will interactively prompt you for your Edge and BaaS credentials, and will then create / deploy all relevants bundles and artifacts and will provision the **OpenBank Sandbox** on your own Org.

## Design
The APIs provided are configurable to connect to your own Banking backend and / or provide your own consent apps. The following sections will help you understand this solution so that you can go about this on your own.

### Architecture

### Sequence Diagram
#### OAuth API Flow
![OAuth API Interaction] (http://www.websequencediagrams.com/files/render?link=R39gE_mlfbXyVC0IS1Z8)
####

### Consent App

