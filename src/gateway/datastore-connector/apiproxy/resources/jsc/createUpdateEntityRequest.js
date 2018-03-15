var kind = context.getVariable("kind");
var id = context.getVariable("id");
if(id)
{
    var pathSuffix = ":commit";
    // need to do 1 service callout to get the entity.
   var getPayload = {};
   var pattern = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'i');
   // if id is uuid
   if (pattern.test(id) === true)
    {
        var queryString = "SELECT * FROM "+ kind + " WHERE uuid = '" + id + "'";
    } 
    // else match the id with name parameter. 
    else
    {
        var queryString = "SELECT * FROM "+ kind + " WHERE name = '" + id + "'";
        
    }
    getPayload.gqlQuery = {};
    getPayload.gqlQuery.queryString = queryString;
    getPayload.gqlQuery.allowLiterals = true;
    
    // update entity
    var entity = JSON.parse(context.getVariable("request.content"));
    var dsPayload = {};
    context.setVariable("getPayload",JSON.stringify(getPayload));
    context.setVariable("originalRequest",JSON.stringify(entity));
    context.setVariable("request.verb","POST");
    context.setVariable("pathSuffix",pathSuffix);   
}
else
{
    context.setVariable("isError",true);
    context.setVariable("errorDescription","Unique key missing in path");
}

    

