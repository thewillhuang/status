'use strict';

var React = require('react');
var Button = require('react-bootstrap/Button');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var DisplayPatients = require('./displayPatients.jsx');
var Panel = require('react-bootstrap/Panel');


var PatientBox = React.createClass({

  render: function() {
    return (
      <Panel bsStyle="primary" header="Select Name(s)">
      <ButtonToolbar>
      <DisplayPatients />
      <Button className='QueButton' bsStyle="primary" bsSize="large" block>Queue Here</Button>
      </ButtonToolbar>
      </Panel>
    );
  }

});

module.exports = PatientBox;
