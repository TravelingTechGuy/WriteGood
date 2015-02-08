var React = require('react');
var Constants = require('../constants/AppConstants');
var Bootstrap = require('react-bootstrap');
var TextForm = require('./TextForm.jsx');
var GithubForm = require('./GithubForm.jsx');
var LintResults = require('./LintResults.jsx');

var App = React.createClass({
  getInitialState: function() {
    return {
      selected: Constants.ActionTypes.LINT_TEXT
    };
  },

  handleSelect: function(selected) {
    this.setState({selected: selected});
  },

  handleLint: function(event) {
    event.preventDefault();
    var payload = {
      action: this.state.selected,
    };
    if(this.state.selected === Constants.ActionTypes.LINT_TEXT) {
      payload.text = document.getElementById('text').value;
    }
    else {
      payload.repoUrl = document.getElementById('repo').value;
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
            <Bootstrap.PageHeader>Write Good <small>concentrate on your code, we'll fix your English</small></Bootstrap.PageHeader>
          </Bootstrap.Col>
        </Bootstrap.Row>
        <Bootstrap.Row>
          <Bootstrap.Col md={10}>
            <Bootstrap.Nav bsStyle="pills" activeKey={this.state.selected} onSelect={this.handleSelect}>
              <Bootstrap.NavItem eventKey={Constants.ActionTypes.LINT_TEXT} title="Paste Text">Paste Text</Bootstrap.NavItem>
              <Bootstrap.NavItem eventKey={Constants.ActionTypes.LINT_GITHUB} title="Github Readme">Github ReadME</Bootstrap.NavItem>
            </Bootstrap.Nav>
          </Bootstrap.Col>
        </Bootstrap.Row>
        <div className="buffer"></div>
        <Bootstrap.Row>
          {this.state.selected === Constants.ActionTypes.LINT_TEXT ? <TextForm /> : <GithubForm />}
        </Bootstrap.Row>
        <Bootstrap.Row>
          <Bootstrap.Col md={2}>
            <Bootstrap.Button bsStyle="primary" onClick={this.handleLint}>Fix me!</Bootstrap.Button>
          </Bootstrap.Col>
        </Bootstrap.Row>
      </Bootstrap.Grid>
    );
  }
});

module.exports = App;
