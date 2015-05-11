'use strict';
var debug = require('debug')('server');
var express = require('express');
var app = express();
var port = 8080;
var AppConstants = require('./src/js/constants/AppConstants');
var lint = require('./src/js/lib/lint');


app.use(express.static('dist'));

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
      res.send(result);
    }
  });
});

var server = app.listen(port, function () {
  console.log('WriteGood listening at http://%s:%s', server.address().address, server.address().port);
});