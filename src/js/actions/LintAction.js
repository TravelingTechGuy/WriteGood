'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');

module.exports = {

  lintText: function(payload) {
    console.log('view action', payload);
    AppDispatcher.handleViewAction(payload);
  },

  lintGithub: function(payload) {
    console.log('server action', payload);
    AppDispatcher.handleServerAction(payload);
  }
};
