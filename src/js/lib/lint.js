'use strict';
var request = require('superagent');
var writeGood = require('write-good');
var AppConstants = require('../constants/AppConstants');

module.exports = {
	_getUrl: function(repoUrl) {
		var url = repoUrl.replace(AppConstants.URLs.GITHUB_REGULAR_URL, AppConstants.URLs.GITHUB_STATIC_URL) + '/master/README.md';
		if(url.indexOf('https') !== 0) {
			url = AppConstants.URLs.GITHUB_STATIC_URL + repoUrl;
		}
		console.log('url', url);
		return url;
	},

	_lintGithub: function(repoUrl, checks, callback) {
		console.log('_lintGithub', repoUrl, checks);
		request.get(repoUrl, function(error, response, body) {
			var result = {};
			if(!error && response.statusCode === 200) {
				result = {
					text: body,
					result: this.lintText(body, checks)
				};
			}
			else {
				console.error(error);
			}
			callback(error, result);
		});
	},

	lintText: function(text, checks) {
		var result = writeGood(text, checks);
		return result;
	},

	lintGithub: function(repoUrl, checks, callback) {
		console.log('lintGithub', repoUrl, checks);
		var options = {
			uri: AppConstants.URLs.LINT_GITHUB,
			json: {
				repoUrl: this._getUrl(repoUrl),
				checks: checks
			}
		};
		request.get(options, callback);
	},

	lintUrl: function(url, checks) {

	}
};