/**
 * Created by rmahalank on 8/8/17.
 */
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Routes
var payments = require('./routes/index');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// Define the routes
app.use('/', payments);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.sendStatus(err.status || 500);
});

module.exports = app;

//start
app.listen(3000, function () {
    console.log('Payments Connector app listening on port 3000!')
});
