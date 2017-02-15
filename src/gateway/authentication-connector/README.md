authentication-connector proxy is used to **authenticate** an user of client-app on basis of the username and password provided by him/her. 
The apis of this proxy are invoked as part of security and consent management.
The backend URL is by default pointing to Baas 2.0 to fetch customer specific details such as account number, for  which the App requires consent.
The backend URL can be modified to point to a different backend system by making changes in the Target Endpoint section of the proxy when opened in develop mode.
