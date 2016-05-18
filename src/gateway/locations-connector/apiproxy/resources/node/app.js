var express = require('express');
var app = express();

var atms = require("./atms.js");


app.get('/atms', atms.getAtms);
app.get('/branches', atms.getAtms);


app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
