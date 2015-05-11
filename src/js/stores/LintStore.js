'use strict';
var debug = require('debug')('flux:store');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var lint = require('../lib/lint');
var assign = require('object-assign');

// data storage
var _data = null;

var LintStore = assign(EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getData: function() {
    return _data;
  },


  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },


  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    debug('store', payload);
    switch(action.action) {
      case Constants.ActionTypes.LINT_TEXT:
          _data = {
            text: action.text,
            result: lint.lintText(action.text, action.checks)
          };
          LintStore.emitChange();
          break;
      case Constants.ActionTypes.LINT_GITHUB:
          lint.lintGithub(action.repoUrl, action.checks, function(error, result) {
            if(error) {
              _data.error = error;
            }
            else {
              _data = result;
            }
            LintStore.emitChange();
          });
          break;

      // add more cases for other actionTypes...
    }
  })

});

module.exports = LintStore;
