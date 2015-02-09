'use strict';

var express = require('express');
var app = express();
var port = 8080;
var AppConstants = require('./src/js/constants/AppConstants');
var lint = require('./src/js/lib/lint');

app.use(express.static('dist'));

app.get(AppConstants.URLs.ROOT, function(req, res) {
  res.sendFile('index.html', {root: __dirname + '/dist/'});
});

app.get(AppConstants.URLs.LINT_GITHUB, function(req, res) {
  lint._lintGithub(req.query.repoUrl, req.query.checks, function(err, result) {
    res.send(result);
  });
});

var server = app.listen(port, function () {
  console.log('WriteGood listening at http://%s:%s', server.address().address, server.address().port);
});