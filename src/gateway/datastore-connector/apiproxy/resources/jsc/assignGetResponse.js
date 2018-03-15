var response = JSON.parse(context.getVariable("response.content"));
var id = context.getVariable("id");
var results = response.batch.entityResults;
var props = null;

var decodedResponse = [];
decodedEntity = {};
// check if entities found
if(results instanceof Array)
{
    
    var numEntities = results.length;
    if(id)
    {
        numEntities = 1;
    }
    for(var i=0; i< numEntities; i++)
    {
        props = results[i].entity.properties;
        decodedEntity = {};
        for(var key in props)
        {
        decodedEntity[key] = decodeValueProto(props[key])
        }
        decodedResponse.push(decodedEntity);
    }   


}

var clientResponse = {};
clientResponse.entities = decodedResponse;
if(response.batch.moreResults!= "NO_MORE_RESULTS" && !id)
{
    clientResponse.cursor = response.batch.endCursor;
}

context.setVariable("response.content",JSON.stringify(clientResponse));

