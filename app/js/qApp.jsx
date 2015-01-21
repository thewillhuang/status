'use strict';

var React = require('react');
var Grid = require('react-bootstrap/Grid');
var Col = require('react-bootstrap/Col');
var Row = require('react-bootstrap/Row');
var PageHeader = require('react-bootstrap/PageHeader');
var SelectPatient = require('./selectPatient.jsx');
var DoctorProfile = require('./displayDoctorProfile.jsx');
var Time = require('./displaytime.jsx');

var Qbox = React.createClass({

  render: function() {
    return (
        <div>
        <PageHeader>Queue Selection Page <small><Time /></small></PageHeader>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <SelectPatient />
            </Col>
            <Col xs={12} md={8}>
            <DoctorProfile />
            </Col>
          </Row>
        </Grid>
        </div>
    );
  }
});

React.render(
  <Qbox />,
  document.getElementById('reactRoot')
  );

module.exports = Qbox;
