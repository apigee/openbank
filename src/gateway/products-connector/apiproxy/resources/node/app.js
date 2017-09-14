var express = require('express');
var app = express();

var request = require('request');
var apigee = require('apigee-access');

var getProducts = function(req, res) {
  console.log('received GET request');
  var basePath;
  basePath = apigee.getVariable(req, 'appBasePath');

  var options = {url: basePath + '/bankproducts', qs: {limit: 1000}, json: true};

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
