var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ApigeeStore = require('express-session-apigee-cache')(session);
var style = require('./controllers/style');


// Routes
var routes = require('./routes/index');
var login = require('./routes/login');
var otp = require('./routes/otp');
var consent = require('./routes/consent');

// Configuration
var config = require('./config.orig');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Set the config values.
app.set('config', config);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var options = {
  cache: 'consent_app_session',
  prefix: "casess:",
  ttl: 300,
}
app.use(session({
   store: new ApigeeStore(options),
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: false
}));



// Define the routes
app.use('/', routes);
app.use('/login', login);
app.use('/otp', otp);
app.use('/consent', consent);

// Add the custom styles.
style.setBasicStyles();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
