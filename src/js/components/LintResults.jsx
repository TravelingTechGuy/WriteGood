'use strict';

var React = require('react');
var BackButton = require('./BackButton.jsx');

var LintResults = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  buildResult: function() {
    var p = 0;
    var loc = 0;
    var result = '';
    while(loc < this.props.result.text.length) {
      var point = this.props.result.result[p];
      if(p < this.props.result.result.length && loc === point.index + point.offset) {
        result += '<sup>' + (p + 1) + '</sup>';
        p++;
      }
      else {
        result += this.props.result.text.charAt(loc);
        loc++;
      }
    }
    return result;
  },

  render: function() {
    if(this.props.result) {
      return (
        <div>
          <p dangerouslySetInnerHTML={{__html: this.buildResult()}} />
          <ol>
          {
            this.props.result.result.map(function(point, index) {
              return <li key={index}>{point.reason}</li>;
            })
          }
          </ol>
          <BackButton />
        </div>
      );
    }
    else {
      return (<BackButton />);
    }
  }
});

module.exports = LintResults;
