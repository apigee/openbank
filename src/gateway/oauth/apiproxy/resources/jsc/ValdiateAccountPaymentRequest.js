var requestContent = context.getVariable("requestIdResponse.content");
var type = context.getVariable("type");
requestContent = JSON.parse(requestContent);
var errorJson = {};
errorJson.isError = false;
errorJson.errorResponseCode = 400;
errorJson.errorDescription = "accountRequest/paymentRequest is already authorised";
if ((type !== null && type !== "" && (type == "accounts" || type == "payments" )) && (requestContent && requestContent.Data && requestContent.Data.Status == "Authorised")) {
    errorJson.isError = true;
}
context.setVariable("isError", errorJson.isError);
context.setVariable("errorResponseCode", errorJson.errorResponseCode);
context.setVariable("errorDescription", errorJson.errorDescription);