var pathSuffix = ":commit";
var kind = context.getVariable("kind");
var id = context.getVariable("id");
if(!id)
{
    context.setVariable("isError",true);
    context.setVariable("errorDescription","cannot DELETE on path /Kind. Id required");
}
else
{
    var dsPayload = {
                      "mode": "NON_TRANSACTIONAL",
                      "mutations": [
                        {
                          "delete": {
                              "path": [
                                {
                                  "kind": kind,
                                  "name" : id
                                }
                              ]
                               
                             }
                        }
                      ]
                    };
    context.setVariable("request.verb","POST");
    context.setVariable("pathSuffix", pathSuffix);
    context.setVariable("request.content",JSON.stringify(dsPayload));   
}

