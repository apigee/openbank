var faultName = context.getVariable("fault.name");

var obieCode = "";
var errorResponseCode = "400";
var errorMessage = "";

if (faultName === "InvalidClaim" || faultName === "ClaimTypeMismatch" || faultName === "JwtIssuerMismatch" 
        || faultName === "JwtSubjectMismatch" || faultName === "JwtAudienceMismatch"  || faultName === "AlgorithmMismatch"){
    obieCode = "UK.OBIE.Signature.InvalidClaim";
    errorMessage = faultName;
} else if (faultName === "JwtClaimNotPresent" || faultName === "KeyIdMissing") {    
    obieCode = "UK.OBIE.Signature.MissingClaim";
    errorMessage = faultName;
} else if (faultName === "FailedToDecode" || faultName === "InvalidJwt" || faultName === "KeyParsingFailed") {
    obieCode = "UK.OBIE.Signature.Malformed";
    errorMessage = faultName;
}  else {
    obieCode = "UK.OBIE.Signature.Unexpected";
    errorMessage = faultName;
}   

context.setVariable("isError","true");
context.setVariable("obieCode",obieCode);
context.setVariable("errorMessage",errorMessage);
context.setVariable("errorCode",errorResponseCode);