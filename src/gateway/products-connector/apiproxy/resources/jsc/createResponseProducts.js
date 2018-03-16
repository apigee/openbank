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
 limitations under the License.*/
var response = JSON.parse(context.getVariable("response.content"));

var cursor = response.cursor;
var products = response.entities;
if(products && products.length >0)
{
    for(var i = 0; i< products.length; i++)
    {
        delete products[i].uuid;
        products[i].Id = products.name;
        products[i].Name = products.Text;
        delete products[i].Text;
    }
    var bankProducts = {};
    bankProducts.Data = {};
    bankProducts.Data["BankProducts"] = products;
    bankProducts.Meta = {};
    bankProducts.Links = {};

    if (cursor) 
    {
        bankProducts.Links.next = "/bankProducts?cursor=" + cursor;
    }
    
    context.setVariable("response.content",JSON.stringify(bankProducts));
}