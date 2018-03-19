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
 * app.js
 * Product connector server application.
 */
var express = require('express');
var app = express();

var request = require('request');
var apigee = require('apigee-access');
var packagejson = require('./package.json');

var getProducts = function(req, res) {
  console.log('received GET request');
  var basePath;
  basePath = apigee.getVariable(req, 'appBasePath');

  var options = {url: basePath + '/bankproducts', qs: {limit: 1000, client_id : packagejson.clientId, client_secret : packagejson.clientSecret}, json: true};

  if (req.params.id) {
    options.url = options.url + '/' + req.params.id;
  }

  console.log('making request to BaaS : ' + options.url);
  request(options, function(error, response, body) {
    var products = [];
    if (error) console.log('error status : ' + error);
    console.log('response code : ' + response.statusCode);

    if (!error && response.statusCode == 200 && body.entities) {
      console.log('received ' + body.entities.length + ' entities');
      body.entities.map(function(product) {
        delete product.uuid;
        delete product.created;
        delete product.modified;
        delete product.metadata;
        delete product.type;

        product.Id = product.name;
        product.Name = product.Text;
        delete product.text;

        products.push(product);
      });
    }
    res.json(products);
  });
};


app.get('/', getProducts);
app.get('/:id', getProducts);

app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
