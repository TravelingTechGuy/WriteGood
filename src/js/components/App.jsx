var React = require('react');
var Constants = require('../constants/AppConstants');
var Bootstrap = require('react-bootstrap');
var LintResults = require('./LintResults.jsx');

var App = React.createClass({
  getInitialState: function() {
    return {
      action: Constants.ActionTypes.LINT_TEXT
    };
  },

  handleSelect: function(action) {
    this.setState({
      action: action,
      selectAll: true
    });
  },

  handleCheckAll: function() {
    for(var i in this.refs) {
      if(this.refs[i].isCheckboxOrRadio()) {
        this.refs[i].getInputDOMNode().checked = this.state.selectAll;
      }
    }
    this.state.selectAll = !this.state.selectAll;
  },

  handleLint: function(event) {
    event.preventDefault();
    var payload = {
      action: this.state.action,
      checks: {}
    };
    if(this.state.action === Constants.ActionTypes.LINT_TEXT) {
      payload.text = this.refs.text.getValue();
    }
    else {
      payload.repoUrl = this.refs.repo.getValue();
    }
    for(var i in this.refs) {
      if(this.refs[i].isCheckboxOrRadio()) {
        payload.checks[i] = this.refs[i].getChecked();
      }
    }
    console.log(payload);
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <Bootstrap.Grid>
        <Bootstrap.Row>
          <Bootstrap.Col md={10}>
            <Bootstrap.PageHeader>
              Write Good <small>concentrate on your code, we'll correct your English</small>
            </Bootstrap.PageHeader>
          </Bootstrap.Col>
        </Bootstrap.Row>
        <Bootstrap.Row>
          <Bootstrap.Col md={10}>
            <Bootstrap.Nav bsStyle="pills" activeKey={this.state.action} onSelect={this.handleSelect}>
              <Bootstrap.NavItem eventKey={Constants.ActionTypes.LINT_TEXT} title="Paste Text">Paste Text</Bootstrap.NavItem>
              <Bootstrap.NavItem eventKey={Constants.ActionTypes.LINT_GITHUB} title="Github Readme">Github README</Bootstrap.NavItem>
            </Bootstrap.Nav>
          </Bootstrap.Col>
        </Bootstrap.Row>
        <div className="buffer"></div>
        <Bootstrap.Row>
          <Bootstrap.Col md={this.state.action === Constants.ActionTypes.LINT_TEXT ? 10 : 8}>
          {
            this.state.action === Constants.ActionTypes.LINT_TEXT ?
              <Bootstrap.Input type="textarea" label="Paste your text here:" defaultValue="" onChange={this.handleChange} ref="text" />
              :
              <Bootstrap.Input type="url" label="Github Repo URL:" defaultValue="" onChange={this.handleChange} ref="repo" />
          }
          </Bootstrap.Col>
        </Bootstrap.Row>
         <Bootstrap.Row>
          <Bootstrap.Col md={3} className="text-left">
            <Bootstrap.Input type="checkbox" label="Passive voice" ref="passive" />
            <Bootstrap.Input type="checkbox" label="Lexical illusions" ref="illusion"  />
            <Bootstrap.Input type="checkbox" label="'So' at the beginning of the sentence" ref="so" />
          </Bootstrap.Col>
          <Bootstrap.Col md={3} className="text-left">
            <Bootstrap.Input type="checkbox" label="There Is/Are at the beginning of the sentence" ref="thereIs" />
            <Bootstrap.Input type="checkbox" label="Adverbs that can weaken meaning" ref="adverb" />
            <Bootstrap.Input type="checkbox" label="'Weasel' Words" ref="weasel" />
          </Bootstrap.Col>
          <Bootstrap.Col md={3} className="text-left">
            <Bootstrap.Input type="checkbox" label="Wordy phrases and unnecessary words" ref="tooWordy" />
            <Bootstrap.Input type="checkbox" label="Common cliches" ref="cliches" />
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
            <strong>Important:</strong> Do not use this tool to be a jerk to other people about their writing.
          </Bootstrap.Col>
        </Bootstrap.Row>
      </Bootstrap.Grid>
    );
  }
});

module.exports = App;
