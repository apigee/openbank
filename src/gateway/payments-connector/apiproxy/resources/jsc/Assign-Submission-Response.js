var content = context.getVariable("response.content");
content = JSON.parse(content);
newResponse = {};
 
 newResponse.PaymentId = content.entities[0].PaymentId;
 newResponse.PaymentSubmissionId = content.entities[0].uuid;
 newResponse.Status = content.entities[0].Status;
 newResponse.CreatedAt = content.entities[0].created;
 

context.setVariable("response.content",JSON.stringify(newResponse));