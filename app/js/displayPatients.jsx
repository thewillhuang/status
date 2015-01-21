'use strict';
var React = require('react');
var Button = require('react-bootstrap/button');
var ButtonGroup = require('react-bootstrap/ButtonGroup');

var DisplayPatient = React.createClass({

  getInitialState: function() {
    return {
      names: [],
      isActive: false
    };
  },

  render: function() {
    return (
      <div />
    );
  }

});

module.exports = DisplayPatient;
