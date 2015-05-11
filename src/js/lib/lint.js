'use strict';
var debug = require('debug')('lint');
var request = require('superagent');
var writeGood = require('write-good');
var AppConstants = require('../constants/AppConstants');

var getUrl = function(repoUrl) {
  var url = repoUrl.replace(AppConstants.URLs.GITHUB_REGULAR_URL, AppConstants.URLs.GITHUB_STATIC_URL) + '/master/README.md';
  if(url.indexOf('https') !== 0) {
    url = AppConstants.URLs.GITHUB_STATIC_URL + repoUrl;
  }
  debug('getUrl', url);
  return url;
};

var lint ={
  lintText: function(text, checks) {
    return writeGood(text, checks);
  },

  lintGithub: function(repoUrl, checks, callback) {
    debug('lintGithub', repoUrl, checks);
    request
      .get('/github')
      .query({
        repoUrl: getUrl(repoUrl),
        checks:  JSON.stringify(checks)
      })
      .end(function(error, result) {
        debug('lintGithub callback', error, result)
        callback(error, JSON.parse(result.text));
      });
  },

  lintUrl: function(url, checks) {

  },

  lintGithubServerSide: function(repoUrl, checks, callback) {
    var removeMD = require('remove-markdown');
    debug('lintGithubServerSide', repoUrl, checks);
    request
      .get(repoUrl)
      .set('Access-Control-Allow-Origin', '*')
      .end(function(error, body) {
        debug('body', body)
        var result;
        var err;
        if(error || body.status !== 200) {
          err = error || new Error('HTTP ' + body.status);
          console.error(err);
        }
        else {
          var text = removeMD(body.text);
          result = {
            text: text,
            result: lint.lintText(text, checks)
          };
        }
        callback(err, result);
      });
  }
};
module.exports = lint;