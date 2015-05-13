'use strict';
var debug = require('debug')('flux:dispatcher');
var Dispatcher = require('flux').Dispatcher;
var Constants = require('../constants/AppConstants');
var assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: Constants.ActionSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    debug('dispatcher',action);
    var payload = {
      source: Constants.ActionSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;
