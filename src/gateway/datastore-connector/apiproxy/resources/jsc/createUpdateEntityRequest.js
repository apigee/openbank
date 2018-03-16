/*
 Copyright 2017 Google Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 https://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
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

    

