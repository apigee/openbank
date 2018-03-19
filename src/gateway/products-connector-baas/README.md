This is a southbound proxy for fetching details of various products a bank has to offer. eg: types of credit cards, various loan schemes etc.

Since this is a southbound proxy, it is responsible for fetching data from bank's backend system and pass it to the respective northbound proxy.

Various mediation policies can be added for data type conversion, in order to communicate with multiple kinds of backend system.

the backend URL for the openbank solution is by default pointing to Baas 2.0 org. 

One can change the Backend URL to point to different backend system of a bank by making changes to target Endpoint part of the proxy in the Develop mode.
