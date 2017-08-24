var PostAccountRequestConfig =
    {
        "Headers": [
            {"Authorization": {"Mandatory": true}},
            {"x-fapi-financial-id": {"Mandatory": true}},
            {"Content-Type": {"Mandatory": true, ValueList: ["application/json"]}},
            {"x-jws-signature": {"Mandatory": true}},
            {"Accept": {"ValueList": ["application/json"]}}

        ],
        "Body": [
            {"Data.Permissions": {"Mandatory": true, "ValueType": "Array"}},
            {"Data.ExpirationDateTime": {"ValueType": "Date"}},
            {"Data.TransactionFromDateTime": {"ValueType": "Date"}},
            {"Data.TransactionToDateTime": {"ValueType": "Date"}},
            {"Risk": {"Mandatory": true, "ValueType": "Object"}}
        ]
    };

var error = validateRequest(PostAccountRequestConfig);
if (error.isError) {
    context.setVariable("isError", error.isError);
    context.setVariable("errorResponseCode", error.errorResponseCode);
    context.setVariable("errorDescription", error.errorDescription);
}
else {
    context.setVariable("isError", false);
}