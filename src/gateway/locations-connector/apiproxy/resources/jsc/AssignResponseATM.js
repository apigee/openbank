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
var entities = context.getVariable("response.content");
var cursor = JSON.parse(entities).cursor;
entities = JSON.parse(entities).entities;
 
var data = [];
for (var i = 0; i < entities.length; i++) 
{
                var entity = {}; 
                
                entity.AtmId = entities[i].AtmId;
                entity.AtmServices = entities[i].AtmServices;
                entity.Address = entities[i].Address;
                entity.Currency = entities[i].Currency;
                entity.Location = entities[i].Location;
                entity.LocationCategory = entities[i].LocationCategory;
                entity.MinimumValueDispensed = entities[i].MinimumValueDispensed;
                entity.Organisation = entities[i].Organisation;
                entity.SiteName = entities[i].SiteName;
                entity.SupportedLanguages = entities[i].SupportedLanguages;
                data.push(entity);
}
var atms = {};
atms.Data = {};
atms.Data["Atm"] = data;
atms.Meta = {};
atms.Links = {};

if (cursor) 
{
    atms.Links.next = "/atms?cursor=" + cursor;
}
context.setVariable("response.content",JSON.stringify(atms));