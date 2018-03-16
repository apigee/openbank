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
var query = unescape(context.getVariable("request.querystring")).split("&");
var verb = context.getVariable('request.verb');
var proxyPathSuffix = context.getVariable('proxy.pathsuffix');

context.setVariable('target.copy.pathsuffix', false);
context.setVariable('target.copy.queryparams', false);
context.setVariable("statusCode",200);
var pathTokens = proxyPathSuffix.split('/');
var pathSuffix = '';

var kind = pathTokens[1];
var id = pathTokens[2];

var isError = false;
var errorDescription = "";
if(pathTokens.length < 2 || pathTokens.length >3 )
{
    isError = true;
    errorDescription = "Invalid path";
}
else
{
    context.setVariable("kind",pathTokens[1]);
    context.setVariable("id",pathTokens[2]);
    
    if(verb == "POST")
    {
        context.setVariable("create","true");
        context.setVariable("statusCode",201)
    }
    else if(verb == "GET")
    {
        context.setVariable("read","true");
        context.setVariable("statusCode",200)
    }
    else if(verb == "PUT")
    {
        context.setVariable("update","true");
        context.setVariable("statusCode",200)
    }
    else if(verb == "DELETE")
    {
        context.setVariable("delete","true");
        context.setVariable("statusCode",200);
    }
}
context.setVariable("originalRequestVerb", verb);
context.setVariable("isError",isError);
context.setVariable("errorDescription",errorDescription);


