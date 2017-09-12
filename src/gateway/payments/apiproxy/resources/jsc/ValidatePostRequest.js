var PostResourceConfig =
    {
        "Headers": [
            {"Authorization": {"Mandatory": true}},
            {"x-fapi-financial-id": {"Mandatory": true}},
            {"x-idempotency-key": {"Mandatory": true}},
            {"x-jws-signature": {"Mandatory": true}},
            {"Content-Type": {"Mandatory": true, "ValueList": ["application/json"]}},
            {"Accept": {"ValueList": ["application/json"]}}

        ],
        "Body": [
            {"Data.Initiation": {"Mandatory": true, "ValueType": "Object"}},
            {"Data.Initiation.EndToEndIdentification": { "MaxText":31}},
            {"Data.Initiation.InstructedAmount": {"Mandatory": true, "ValueType": "Object"}},
            {"Data.Initiation.InstructedAmount.Amount": {"Mandatory": true, "ValueType": "Float", "MaxText":14}},
            {"Data.Initiation.CreditorAccount": {"Mandatory": true, "ValueType": "Object"}},
            {"Data.Initiation.CreditorAccount.Identification": {"Mandatory": true}},
            {"Data.Initiation.CreditorAccount.Name": { "MaxText":18}},
            {"Data.Initiation.CreditorAccount.SecondaryIdentification": { "MaxText":18}},
            {"Data.Initiation.RemittanceInformation": {"ValueType": "Object"}},
            {"Data.Initiation.RemittanceInformation.Reference": { "MaxText":18}},
            {"Risk": {"Mandatory": true, "ValueType": "Object"}}
        ]
    };
    

var error = validateRequest(PostResourceConfig);
if (error.isError) {
    context.setVariable("isError", error.isError);
    context.setVariable("errorResponseCode", error.errorResponseCode);
    context.setVariable("errorDescription", error.errorDescription);
}
else {
    context.setVariable("isError", false);
}