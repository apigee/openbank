This proxy is the southbound proxy for the Account information APIs, and therefore communicates with the bank's backend system.
By default the backend system to which it communicates is, dummy data on Baas 2.0 for openbank.
The changes can be made to the proxy on apigee edge by opening the proxy in Develop mode.
The backend URL can be easily configured on APIGEE edge, by making URL changes in the Target Endpoints section for the proxy.
Since this is southbound proxy and provides required data to respective northbound APIs, all mediation policies can be added to it, to obtain desired data. Eg: If the backend service for ACCount information is SOAP, one can accept the request as json, use policies to convert JSON to XML, communicate to the backend system, get XML data, convert back to JSON and provide it to northbound APIs.  
