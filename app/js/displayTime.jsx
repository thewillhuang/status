'use strict';
var React = require('react');
var moment = require('moment');

var ShowDate = React.createClass({

  getInitialState: function() {
    return {
      time:moment().format('MMMM Do YYYY, h:mm:ss a')
    };
  },

  everySecond: function() {
    this.setState({
      time:moment().format('MMMM Do YYYY, h:mm:ss a')
    });
  },

  componentDidMount: function() {
    this.interval = setInterval(this.everySecond, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function() {
    return (
      <div>{this.state.time}</div>
    );
  }

});

module.exports = ShowDate;
