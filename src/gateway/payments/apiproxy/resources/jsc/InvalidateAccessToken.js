var bearerToken = context.getVariable("request.header.Authorization");
bearerToken = bearerToken.split(" ")[1];
context.setVariable("bearerToken",bearerToken);