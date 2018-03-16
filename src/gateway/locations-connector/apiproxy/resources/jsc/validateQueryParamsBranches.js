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
var reqQuery = context.getVariable("request.querystring");
var query = unescape(reqQuery).split("&");
var queryParamList = ["x-apikey","wheelchair","openingDay","openAt"];
var isError = false;
var errorDescription = "";
var queryParamArray = [];
if(reqQuery && reqQuery!= "")
{
    for(var i=0; i<query.length; i++)
    {
        var queryName = query[i].split("=")[0];
        var queryValue = query[i].split("=")[1];
        queryParamArray.push(queryName);
        if(queryParamList.indexOf(queryName)<0)
        {
            isError = true;
            errorDescription = "inValid query params";
        }
    }
}

// Mandatory query params for Get Consents.
var openingDay = context.getVariable("OpeningDay");
var openAt = context.getVariable("OpenAt");
if((!openingDay || openingDay == "") && openAt)
{
    isError = true;
    errorDescription = "Invalid set of query parameters. openAt without openingDay query parameter.";
}

var ql = "WHERE Branch = true";
var wheelchair = context.getVariable("request.queryparam.wheelchair");
if(wheelchair)
{
    ql += " and Wheelchair="+ wheelchair;
}

context.setVariable("qlquery",ql);

context.setVariable("isError", isError);
context.setVariable("errorDescription", errorDescription);

context.setVariable("branch",true);