var React = require('react');
var Bootstrap = require('react-bootstrap');

var TextForm = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <Bootstrap.Col md={10}>
        <Bootstrap.Input type="textarea" label='Paste your text here:' defaultValue="" id="text" />
      </Bootstrap.Col>
    );
  }
});

module.exports = TextForm;
