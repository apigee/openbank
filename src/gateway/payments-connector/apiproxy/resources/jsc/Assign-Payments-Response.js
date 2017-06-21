var content = context.getVariable("response.content");
content = JSON.parse(content);
newResponse = {};
            
            newResponse.PaymentId = content.entities[0].name;
            newResponse.Status = content.entities[0].Status;
            newResponse.InstructionIdentification = content.entities[0].InstructionIdentification;
            newResponse.EndToEndIdentification = content.entities[0].EndToEndIdentification;
            newResponse.RemittanceInformation = content.entities[0].RemittanceInformation;
            newResponse.InstructedAmount = content.entities[0].InstructedAmount;
            newResponse.DebtorAgent = content.entities[0].DebtorAgent;
            newResponse.DebtorAccount = content.entities[0].DebtorAccount;
            newResponse.CreditorAgent = content.entities[0].CreditorAgent;
            newResponse.CreditorAccount = content.entities[0].CreditorAccount;
            newResponse.MerchantCategoryCode = content.entities[0].MerchantCategoryCode;
            newResponse.CreatedAt = content.entities[0].created;

context.setVariable("response.content",JSON.stringify(newResponse));
