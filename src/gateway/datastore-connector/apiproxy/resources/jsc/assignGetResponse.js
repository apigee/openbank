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

