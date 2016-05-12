var express = require('express');
var app = express();

var branches = require("./branches.js");


app.get('', branches.getBranches);


app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
