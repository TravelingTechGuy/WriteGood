var React = require('react');
var Bootstrap = require('react-bootstrap');

var GithubForm = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <Bootstrap.Col md={8}>
        <Bootstrap.Input type="url" label='Github Repo URL:' defaultValue="" id="repo" />
      </Bootstrap.Col>
    );
  }
});

module.exports = GithubForm;
