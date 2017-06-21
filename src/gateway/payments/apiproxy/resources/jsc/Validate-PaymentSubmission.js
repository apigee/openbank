 var paymentreqResponse = JSON.parse(context.getVariable("paymentreqResponse.content"));
 var request = JSON.parse(context.getVariable("request.content"));
 var validSubmissionReq = true;
 
 //context.setVariable("PaymentRequestId",request.PaymentId);
 
 //do validation
 if(paymentreqResponse.InstructionIdentification != request.InstructionIdentification)
 {
     validSubmissionReq = false;
 }
 
  if(paymentreqResponse.EndToEndIdentification != request.EndToEndIdentification)
 {
     validSubmissionReq = false;
 }
 
  if(JSON.stringify(paymentreqResponse.RemittanceInformation).toUpperCase() != JSON.stringify(request.RemittanceInformation).toUpperCase())
 {
     validSubmissionReq = false;
 }
 
  if(JSON.stringify(paymentreqResponse.InstructedAmount).toUpperCase() != JSON.stringify(request.InstructedAmount).toUpperCase())
 {
     validSubmissionReq = false;
 }
 
  if(JSON.stringify(paymentreqResponse.DebtorAgent).toUpperCase() != JSON.stringify(request.DebtorAgent).toUpperCase())
 {
     validSubmissionReq = false;
 }
 
  if(JSON.stringify(paymentreqResponse.DebtorAccount).toUpperCase() != JSON.stringify(request.DebtorAccount).toUpperCase())
 {
     validSubmissionReq = false;
 }
 
  if(JSON.stringify(paymentreqResponse.CreditorAgent).toUpperCase() != JSON.stringify(request.CreditorAgent).toUpperCase())
 {
     validSubmissionReq = false;
 }
 
  if(JSON.stringify(paymentreqResponse.CreditorAccount).toUpperCase() != JSON.stringify(request.CreditorAccount).toUpperCase())
 {
     validSubmissionReq = false;
 }
 
 
  if(paymentreqResponse.MerchantCategoryCode != request.MerchantCategoryCode)
 {
     validSubmissionReq = false;
 }
 
 

 
 
 
