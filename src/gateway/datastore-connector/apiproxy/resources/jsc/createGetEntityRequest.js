// GET entity by Id, unique name
var pathSuffix = ":runQuery";
var kind = context.getVariable("kind");
var id = context.getVariable("id");
if(id)
{
   var dsPayload = {};
   var pattern = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'i');
   // if id is uuid
   if (pattern.test(id) === true)
    {
        pathSuffix = ":runQuery";
        var queryString = "SELECT * FROM "+ kind + " WHERE uuid = '" + id + "'";
        dsPayload.gqlQuery = {};
        dsPayload.gqlQuery.queryString = queryString;
        dsPayload.gqlQuery.allowLiterals = true;
    } 
    // else match the id with name parameter. 
    else
    {
        
        pathSuffix = ":runQuery";
        var queryString = "SELECT * FROM "+ kind + " WHERE name = '" + id + "'";
        dsPayload.gqlQuery = {};
        dsPayload.gqlQuery.queryString = queryString;
        dsPayload.gqlQuery.allowLiterals = true;
    }
   
}

else
{
    pathSuffix = ":runQuery";
    var dsPayload = {};
    dsPayload.gqlQuery = {};
    dsPayload.gqlQuery.allowLiterals = true;
    var order = context.getVariable("request.queryparam.order");
    var limit = context.getVariable("request.queryparam.limit");
    var cursor = context.getVariable("request.queryparam.cursor");
    var queryString = "SELECT * FROM "+ kind;
    var dsReqQuery = unescape(context.getVariable("request.queryparam.ql"));
    if(dsReqQuery && dsReqQuery!= "" )
    {
      queryString += " " + dsReqQuery;
    }
    if(order)
    {
      queryString += " ORDER BY " +  order;
    }
    if(limit)
    {
      queryString+= " LIMIT " + limit;
    }
    if(cursor)
    {
      queryString+= " OFFSET  @cursorStart";
      dsPayload.gqlQuery.namedBindings = {};
      dsPayload.gqlQuery.namedBindings.cursorStart = {};
      var cursor1 = cursor.split(" ");
      if(cursor1.length >=2)
      {
          cursor1 = cursor1.join("+");
          dsPayload.gqlQuery.namedBindings.cursorStart.cursor = cursor1;
      }
      else
      {
        dsPayload.gqlQuery.namedBindings.cursorStart.cursor = cursor;
      }
    }
  
  dsPayload.gqlQuery.queryString = queryString;
   
}
context.setVariable("request.verb","POST");
context.setVariable("pathSuffix", pathSuffix);
context.setVariable("request.content",JSON.stringify(dsPayload));
