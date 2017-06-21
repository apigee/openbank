var request = JSON.parse(context.getVariable("request.content"));
request.Status = "Received";
context.setVariable("request.content",JSON.stringify(request));