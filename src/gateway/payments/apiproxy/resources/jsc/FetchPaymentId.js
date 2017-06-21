//var response = JSON.parse(context.getVariable("response.content"));
print(response.content);
context.setVariable("paymentResponse",JSON.stringify(response.content));