'use strict';
var debug = require('debug')('flux:action');
var AppDispatcher = require('../dispatchers/AppDispatcher');

module.exports = {

  lintText: function(payload) {
    debug('view action', payload);
    AppDispatcher.handleViewAction(payload);
  },

  lintGithub: function(payload) {
    debug('server action', payload);
    AppDispatcher.handleServerAction(payload);
  }
};
