'use strict';

var express = require('express');
var app = express();
var port = 8080;

app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname + '/dist/'});
});

app.get('/lintUrl', function (req, res) {
  res.send('hello');
});

var server = app.listen(port, function () {
  console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
});