'use strict';

var React = require('react');
var ButtonToolbar = require('react-bootstrap/ButtonToolbar');
var Panel = require('react-bootstrap/Panel');


var DoctorBox = React.createClass({

  render: function() {
    return (
      <Panel bsStyle="primary" header="Select Doctor(s)">
      <ButtonToolbar>
      </ButtonToolbar>
      </Panel>
    );
  }

});

module.exports = DoctorBox;
