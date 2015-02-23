'use strict';

var React = require('react');
var randomColor = require('randomcolor');

var LintResultsColors = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
  },

  buildResult: function() {
    var loc = 0;
    var result = '';
    var text = this.props.result.text;
    LintResultsColors.colors = randomColor({
      luminosity: 'light',
      count: this.props.result.result.length
    });
    for(var i = 0; i < this.props.result.result.length; i++) {
      var point = this.props.result.result[i];
      result += text.substring(loc, point.index);
      result += '<span style="background-color: ' + LintResultsColors.colors[i] + '">';
      result += text.substring(point.index, point.index + point.offset);
      result += '</span>';
      loc = point.index + point.offset;
    }
    if(loc < text.length) {
      result += text.substring(loc);
    }
    return result;
  },

  render: function() {
    if(this.props.result) {
      return (
        <div>
          <p dangerouslySetInnerHTML={{__html: this.buildResult()}} />
          {
            this.props.result.result.map(function(point, index) {
              return (
                <div key={index}>
                  <span style={{backgroundColor: LintResultsColors.colors[index]}}>{index + 1}</span>. {point.reason}
                </div>
              );
            })
          }
          <p className="text-right">
            <a href="/">Back</a>
          </p>
        </div>
      );
    }
    else {
      return (<div><a href="/">Back</a></div>);
    }
  }
});

module.exports = LintResultsColors;
