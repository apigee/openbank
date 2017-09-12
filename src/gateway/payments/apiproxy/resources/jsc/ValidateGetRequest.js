var GetResourceConfig =
    {
        "Headers": [
            {"Authorization": {"Mandatory": true}},
            {"x-fapi-financial-id": {"Mandatory": true}},
            {"Accept": {"ValueList": ["application/json"]}}

        ]
    };

var error = validateRequest(GetResourceConfig);
if (error.isError) {
    context.setVariable("isError", error.isError);
    context.setVariable("errorResponseCode", error.errorResponseCode);
    context.setVariable("errorDescription", error.errorDescription);
}
else {
    context.setVariable("isError", false);
}