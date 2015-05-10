var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var log4js = require('log4js'); 
// log4js.loadAppender('file');
// log4js.addAppender(log4js.appenders.file('logs/requests.log'), 'requests');
// var loggerReq = log4js.getLogger('requests');
// loggerReq.setLevel('ERROR');
// var log4js = require('log4js');
// log4js.configure({
//   appenders: [
//     { type: 'console' },
//     { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
//   ]
// });
// var logger = log4js.getLogger('cheese');
// logger.setLevel('ERROR');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// a middleware sub-stack which prints request info for any type of HTTP request to /user/:id
app.use('/users', function(req, res, next) {
  // console.log(loggerReq, loggerReq.trace);
  // logger.trace('Cheese is Gouda.');
  req.userInfo = {
    status: 200
  };
  // console.log('Request: ', req.connection.remoteAddress);
  // console.log('User INFO: ', req.userInfo);
  next();
});

app.use('/', routes);
app.use('/users', users);

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
