var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  lint: function(payload) {
    console.log('action', payload)
    AppDispatcher.handleViewAction(payload);
  }

};
