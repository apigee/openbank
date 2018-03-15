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

/**
 * @file
 * CreateJWS.js
 * Script is used to create detached JWS value
 */
var responsePayload = JSON.parse(context.getVariable("response.content"));


var data = null;
if(responsePayload.Data)
{
   data =  JSON.stringify(responsePayload.Data);
}

var risk = null;
if(responsePayload.Risk)
{
   risk =  JSON.stringify(responsePayload.Risk);
}

var links = null;
if(responsePayload.Links)
{
   links =  JSON.stringify(responsePayload.Links);
}

var meta = null;
if(responsePayload.Meta)
{
   meta =  JSON.stringify(responsePayload.Meta);
}
context.setVariable("data",data);
context.setVariable("risk",risk);
context.setVariable("links",links);
context.setVariable("meta",meta);