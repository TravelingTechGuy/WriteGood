'use strict';

var React = require('react');
var Bootstrap = require('react-bootstrap');

var BackButton = React.createClass({
	handleClick: function(event) {
		event.preventDefault();
		location.href = '/';
	},

	render: function() {
		return (
			<p className="text-right">
            	<Bootstrap.Button bsStyle="primary" bsSize="xsmall" onClick={this.handleClick}>Back</Bootstrap.Button>
          	</p>
		);
	}
});

module.exports = BackButton;