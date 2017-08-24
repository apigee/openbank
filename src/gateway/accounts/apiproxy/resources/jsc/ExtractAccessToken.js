var token = context.getVariable("request.header.Authorization");
if (token) {
    token = token.split(" ");
    if (token[0] == "Bearer" && token[1]) {
        context.setVariable("accToken", token[1]);
    }
}