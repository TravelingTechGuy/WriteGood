var keyMirror = require('fbjs/lib/keyMirror');

module.exports = {
  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
    LINT_TEXT: null,
    LINT_GITHUB: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  URLs: {
    GITHUB_STATIC_URL: 'https://raw.githubusercontent.com/',
    GITHUB_REGULAR_URL: 'https://github.com/'
  }
};
