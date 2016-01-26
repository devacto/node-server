/* jshint node: true */
'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var engines = require('consolidate');
var morgan = require('morgan');

var app = express();
var server = http.createServer(app);

app.use(morgan('combined'));

// configure views
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.render('index', {name: "Victor Wibisono"});
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
var errorJson = function (err) {
  var error = {"message": err.message, "error": err};
  return error;
};

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(errorJson(err));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(errorJson(err));
});

server.listen(3000, 'localhost');
server.on('listening', function () {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
