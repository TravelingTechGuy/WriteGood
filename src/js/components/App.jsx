'use strict';

var React = require('react');
var Constants = require('../constants/AppConstants');
var Bootstrap = require('react-bootstrap');
var LintResults = require('./LintResults.jsx');
var LintResultsColors = require('./LintResultsColors.jsx');
var LintStore = require('../stores/LintStore');
var LintAction = require('../actions/LintAction');


var App = React.createClass({
  getInitialState: function() {
    return {
      selectAll: true,
      showResult: false,
      resultInColors: true
    };
  },

  _onChange: function() {
    this.setState({showResult: true});
  },

  componentDidMount: function() {
    LintStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LintStore.removeChangeListener(this._onChange);
  },

  handleCheckAll: function() {
    var checkAll = !this.state.selectAll;
    for(var i in this.refs) {
      if(this.refs[i].isCheckboxOrRadio()) {
        this.refs[i].getInputDOMNode().checked = checkAll;
      }
    }
    this.setState({selectAll: checkAll});
  },

  handleLint: function(event) {
    event.preventDefault();
    var text = this.refs.text.getValue();
    var action = text.startsWith('https://github.com') ? Constants.ActionTypes.LINT_GITHUB : Constants.ActionTypes.LINT_TEXT;
    var checks = {};
    for(let i in this.refs) {
      if(this.refs[i].isCheckboxOrRadio()) {
        checks[i] = this.refs[i].getChecked();
      }
    }
    var payload = {
      action: action,
      checks: checks
    };
    if(payload.action === Constants.ActionTypes.LINT_TEXT) {
      payload.text = text;
      LintAction.lintText(payload);
    }
    else {
      payload.repoUrl = text;
      LintAction.lintGithub(payload);
    }
  },

  selectResultType: function(event) {
    this.setState({resultInColors: this.refs.colors.getChecked()});
  },

  render: function() {
    return (
      <div>
        <Bootstrap.Grid>
          <Bootstrap.Row>
            <Bootstrap.Col md={10}>
              <Bootstrap.PageHeader>
                Write Better <small>write your code, we'll correct your English</small>
              </Bootstrap.PageHeader>
            </Bootstrap.Col>
          </Bootstrap.Row>
        </Bootstrap.Grid>

        <Bootstrap.Grid className={this.state.showResult ? 'hidden' : 'show'}>
          <Bootstrap.Row>
            <Bootstrap.Col md={3} className="text-left">
              <Bootstrap.Input type="checkbox" label="Passive voice" ref="passive" defaultChecked={this.state.selectAll} />
              <Bootstrap.Input type="checkbox" label="Lexical illusions" ref="illusion" defaultChecked={this.state.selectAll} />
              <Bootstrap.Input type="checkbox" label="'So' at the beginning of the sentence" ref="so" defaultChecked={this.state.selectAll} />
            </Bootstrap.Col>
            <Bootstrap.Col md={3} className="text-left">
              <Bootstrap.Input type="checkbox" label="There Is/Are at the beginning of the sentence" ref="thereIs" defaultChecked={this.state.selectAll} />
              <Bootstrap.Input type="checkbox" label="Adverbs that can weaken meaning" ref="adverb" defaultChecked={this.state.selectAll} />
              <Bootstrap.Input type="checkbox" label="'Weasel' Words" ref="weasel" defaultChecked={this.state.selectAll} />
            </Bootstrap.Col>
            <Bootstrap.Col md={3} className="text-left">
              <Bootstrap.Input type="checkbox" label="Wordy phrases and unnecessary words" ref="tooWordy" defaultChecked={this.state.selectAll} />
              <Bootstrap.Input type="checkbox" label="Common cliches" ref="cliches" defaultChecked={this.state.selectAll} />
              <Bootstrap.Input type="checkbox" label="Highlight results with colors" ref="colors" onChange={this.selectResultType} defaultChecked={true} />
              <Bootstrap.Button bsStyle="default" bsSize="xsmall" onClick={this.handleCheckAll}>All</Bootstrap.Button>
            </Bootstrap.Col>
          </Bootstrap.Row>
          <Bootstrap.Row>
            <Bootstrap.Col md={10} className="text-right">
              <Bootstrap.Button bsStyle="primary" onClick={this.handleLint}>Lint!</Bootstrap.Button>
            </Bootstrap.Col>
          </Bootstrap.Row>
          <Bootstrap.Row>
            <Bootstrap.Col md={10}>
              <Bootstrap.Input type="textarea" placeholder="Paste text, or Github repo url here" ref="text" />
            </Bootstrap.Col>
          </Bootstrap.Row>
        </Bootstrap.Grid>

        <Bootstrap.Grid className={this.state.showResult ? 'show' : 'hidden'}>
          <Bootstrap.Row>
            <Bootstrap.Col md={10} className="text-left">
              {
                this.state.resultInColors ?
                <LintResultsColors result={LintStore.getData()} />
                :
                <LintResults result={LintStore.getData()} />
              }
            </Bootstrap.Col>
          </Bootstrap.Row>
        </Bootstrap.Grid>

        <Bootstrap.Grid>
          <Bootstrap.Row>
            <Bootstrap.Col md={10}>
              <strong>Important:</strong> Do not use this tool to be a jerk to other people about their writing.
            </Bootstrap.Col>
          </Bootstrap.Row>
        </Bootstrap.Grid>
      </div>
    );
  }
});

module.exports = App;
