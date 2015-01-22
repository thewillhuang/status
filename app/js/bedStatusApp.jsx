'use strict';

var React      = require('react');
var Grid       = require('react-bootstrap/Grid');
var Col        = require('react-bootstrap/Col');
var Row        = require('react-bootstrap/Row');
var Time       = require('./displaytime.jsx');

var React = require('react');

var MainViewBox = React.createClass({

  render: function() {
    return (
      <Grid>
      <Time />
       <Row className="show-grid">
          <Col xs={18} md={12}>
            Represents the whole screen
            <PatientList />
          </Col>
      </Row>
      </Grid>
    );
  }
});


var PatientList = React.createClass({

  render: function() {
    return (
      <div>
      I represent the whole patient list on one screen
      <PatientRow />
      </div>
    );
  }

});

var PatientRow = React.createClass({

  render: function() {
    return (
      <div>
      one single patient row
      <PatientCol />
      </div>
    );
  }

});

var PatientCol = React.createClass({

  render: function() {
    return (
      <div>
      one single patient col
      </div>
    );
  }

});

React.render(<MainViewBox />, document.getElementById('reactRoot'));

module.exports = MainViewBox;
