'use strict';
var debug = require('debug')('server');
var path = require('path');
var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var port = process.env.PORT || 8080;
var AppConstants = require('./src/js/constants/AppConstants');
var lint = require('./src/js/lib/lint');

app.use(favicon(path.join(__dirname,'dist','images','favicon.ico')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
  res.sendFile('index.html', {root: __dirname + '/dist/'});
});

app.get('/github', function(req, res) {
  debug('query', req.query)
  lint.lintGithubServerSide(req.query.repoUrl, JSON.parse(req.query.checks), function(err, result) {
    if(err) {
      console.error(err);
      res.status(500).send(err);
    }
    else {
      debug('server call', result);
      res.status(200).send(result);
    }
  });
});

var server = app.listen(port, function () {
  console.log('WriteGood listening on port %s', server.address().port);
});