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
var filterDay = false;
var filtertime = false;
var openingday =  "allday";
var openingAt = "alltime";
var openingDay = context.getVariable("OpeningDay");
var openAt = context.getVariable("OpenAt");
if (openingDay) 
{
    openingday = openingDay;
    if(openAt)
    {
        openingAt = openAt;
    }
}

if(openingday != "allday")
{
    filterDay = true;
    
}
            
if(openingAt != "alltime")
{
filtertime = true;
}
            
            
for (var i = 0; i < entities.length; i++) 
{
                
    var entity = {}; 
    entity.AtmAtBranch = entities[i].AtmAtBranch;
    entity.Access = entities[i].Access;
    entity.BranchIdentification = entities[i].BranchIdentification;
    entity.BranchName = entities[i].BranchName;
    entity.Address = entities[i].Address;
    entity.BranchMediatedServiceName = entities[i].BranchMediatedServiceName;
    entity.BranchPhoto = entities[i].BranchPhoto;
    entity.BranchSelfServeServiceName = entities[i].BranchSelfServeServiceName;
    entity.BranchType = entities[i].BranchType;
    entity.CustomerSegment = entities[i].CustomerSegment;
    entity.FaxNumber = entities[i].FaxNumber;
    entity.Location = entities[i].Location;
    entity.OpeningTimes = entities[i].OpeningTimes;
    entity.Organisation = entities[i].Organisation;
    entity.TelephoneNumber = entities[i].TelephoneNumber;
                
    if(filterDay)
    {
        if(entities[i].OpeningTimes)
        {
            for(var j = 0; j < entities[i].OpeningTimes.length; j++)
            {
                if( entities[i].OpeningTimes[j].OpeningDay == openingday )
                {
                    if(filtertime)
                    {
                        var openingTime = entities[i].OpeningTimes[j].OpeningTime.split(":");
                        var closingTime = entities[i].OpeningTimes[j].ClosingTime.split(":");
                                
                                
                        var openminute = parseFloat(openingTime[0])*60 + parseFloat(openingTime[1]);
                        var closeminute = parseFloat(closingTime[0])*60 + parseFloat(closingTime[1]);
                        
                        if( (openingAt >= openminute ) && (openingAt <= closeminute)) 
                        {
                            data.push(entity);
                            break;
                        }
                            
                    }
                    else
                    {   
                        data.push(entity);
                        break;
                    }
                }
            }
        }
    }
    else
    {
        data.push(entity);
    }
        
 }
var branches = {};
branches.Data = {};
branches.Data["Branches"] = data;
branches.Meta = {};
branches.Links = {};

if (cursor) 
{
    branches.Links.next = "/branches?cursor=" + cursor;
}
context.setVariable("response.content",JSON.stringify(branches));