var response = JSON.parse(context.getVariable("getDatatstoreResponse.content"));
var kind = context.getVariable("kind");
var props = response.batch.entityResults[0].entity.properties;

var decodedResp = {};
for(var key in props){
decodedResp[key] = decodeValueProto(props[key])
}
var uuid = decodedResp.uuid;
var putRequest = JSON.parse(context.getVariable("originalRequest"));
for(var key in putRequest){

        decodedResp[key] = putRequest[key];
}
var finalResponse = JSON.parse(JSON.stringify(decodedResp));
var properties = {};
for(var key in decodedResp)
    {
    properties[key] = encodeValue(decodedResp[key])
    }
var dsPayload = {
                      "mode": "NON_TRANSACTIONAL",
                      "mutations": [
                        {
                          "update": {
                            "key": {
                              "path": [
                                {
                                  "kind": kind,
                                  "name" : uuid
                                }
                              ]
                            },
                            "properties": properties
                          }
                        }
                      ]
                    };

context.setVariable("request.content",JSON.stringify(dsPayload));
context.setVariable("responsePayload",JSON.stringify(finalResponse));