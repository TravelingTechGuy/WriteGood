'use strict';
var request = require('request');
var writeGood = require('write-good');

var GITHUB_STATIC_URL = 'https://raw.githubusercontent.com/';
var GITHUB_REGULAR_URL = 'https://github.com/';

module.exports = {

	lintText: function(text, checks) {
		var result = writeGood(text, checks);
		return result;
	},

	lintRepo: function(repoUrl, checks, callback) {
		var url = repoUrl.replace(GITHUB_REGULAR_URL, GITHUB_STATIC_URL) + '/master/README.md';
		if(url.indexOf('https') !== 0) {
			url = GITHUB_STATIC_URL + repoUrl;
		}
		console.log('url', url);
		request.get(url, function(error, response, body) {
			var result = {};
			if(!error && response.statusCode === 200) {
				result = writeGood(body, checks);
			}
			else {
				console.error(error);
			}
			callback(error, result);
		});
	},

	lintUrl: function(url, checks) {

	}
}