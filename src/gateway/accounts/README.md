This proxy is the northbound proxy for all the Account Information APIs.
It is the APP facing part of the API, and directs all its calls internally to southbound proxies. ( with -connector ).
It incorporates the oAuth 2.0 security model, hence all the APIs exposed by this proxy are secured and require a valid access token for successful API calls.
All its internal calls are directed to the Accounts connector which the southbound proxy for the Account information APIs.
