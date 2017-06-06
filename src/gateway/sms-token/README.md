sms-token proxy is used for sending and verifying otp tokens, which is used to authenticate the user

The APIs of this proxy are invoked as a part of login and authentication

**NOTE-**
Currently any otp value is validated without any check. 
To know more about what token value is issued, check the `create sms token` flow,
start the trace session and get the otp value from `Assign: Nexmo SMS Payload` policy by looking for the `token_challenge` flow variable.
