var express = require('express');
var router = express.Router();

var http = require('http');
var logger = require('morgan');
var rp = require('request-promise');
require('request-promise').debug = true;

// App ID for openweathermap
var APP_ID = '8466917d0340021cf7baba0b7c90ef95';
var CITY = 'Melbourne';

var options = {
  uri: 'http://api.openweathermap.org/data/2.5/weather?q=' + CITY + '&APPID=' + APP_ID,
  json: true
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  rp(options)
    .then(function(body) {
      res.send(body);
    })
    .catch(function(err) {
      res.status(err.statusCode).send(err);
    });
});

module.exports = router;
