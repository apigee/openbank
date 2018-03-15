var requestUri = context.getVariable("request.header.host");
var org = requestUri.split(".")[0].split("-");
context.setVariable("request.header.ApigeeOrg",org);