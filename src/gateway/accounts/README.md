This proxy is the northbound proxy for all the Account Information APIs.

It incorporates the **oAuth 2.0 security policy**, hence all the APIs exposed by this proxy are secured and require a **valid access token** for successful API calls.

It exposes three Account Accesss APIS:
  - Account Transactions
  - Account Information
  - Account Balance

All its internal calls are directed to the Accounts connector which the southbound proxy for the Account information APIs.
