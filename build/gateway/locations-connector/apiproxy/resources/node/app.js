var express = require('express');
var app = express();

var locations = require('./locations.js');

app.get('/atms', locations.getAtms);
app.get('/branches', locations.getBranches);


app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
