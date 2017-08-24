var GetAccTransactionsResourceConfig =
    {
        "Headers": [
            {"Authorization": {"Mandatory": true}},
            {"x-fapi-financial-id": {"Mandatory": true}},
            {"Accept": {"ValueList": ["application/json"]}}

        ],

        "QueryParams": [
            {"toBookingDateTime": {"ValueType": "Date"}},
            {"fromBookingDateTime": {"ValueType": "Date"}}
        ]
    };

var error = validateRequest(GetAccTransactionsResourceConfig);
if (error.isError) {
    context.setVariable("isError", error.isError);
    context.setVariable("errorResponseCode", error.errorResponseCode);
    context.setVariable("errorDescription", error.errorDescription);
}
else {
    context.setVariable("isError", false);
}