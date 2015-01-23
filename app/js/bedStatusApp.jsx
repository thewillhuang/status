'use strict';

var React = require('react');
var Grid  = require('react-bootstrap/Grid');
var Col   = require('react-bootstrap/Col');
var Row   = require('react-bootstrap/Row');
// var Time  = require('./displaytime.jsx');
var data  =
{
  "MedSurg1":[
    {
      "room":100,
      "ptName": "Jessica Alba",
      "mdName": "Dr. Paul Liu",
      "rnName": "Mary",
      "cnaName": "Jack",
      "codeStatus": 1,
      "isolation": "c.diff",
      "misc": "dc",
      "acuity": 5
    },
    {
      "room":101,
      "ptName": "Jessica Alba",
      "mdName": "Dr. Paul Liu",
      "rnName": "Mary",
      "cnaName": "Jack",
      "codeStatus": 1,
      "isolation": "c.diff",
      "misc": "dc",
      "acuity": 5
    },
    {
      "room":102,
      "ptName": "Jessica Alba",
      "mdName": "Dr. Paul Liu",
      "rnName": "Mary",
      "cnaName": "Jack",
      "codeStatus": 1,
      "isolation": "c.diff",
      "misc": "dc",
      "acuity": 5
    },
    {
      "room":103,
      "ptName": "Jessica Alba",
      "mdName": "Dr. Paul Liu",
      "rnName": "Mary",
      "cnaName": "Jack",
      "codeStatus": 1,
      "isolation": "c.diff",
      "misc": "dc",
      "acuity": 5
    },
    {
      "room":104,
      "ptName": "Jessica Alba",
      "mdName": "Dr. Paul Liu",
      "rnName": "Mary",
      "cnaName": "Jack",
      "codeStatus": 1,
      "isolation": "c.diff",
      "misc": "dc",
      "acuity": 5
    },
    {
      "room":105,
      "ptName": "Jessica Alba",
      "mdName": "Dr. Paul Liu",
      "rnName": "Mary",
      "cnaName": "Jack",
      "codeStatus": 1,
      "isolation": "c.diff",
      "misc": "dc",
      "acuity": 5
    }
  ]
};


var React = require('react');

var MainViewBox = React.createClass({

  render: function() {
    var dataKey = Object.keys(this.props.data);
    var roomData = this.props.data[dataKey[0]].map(function(key, index) {
      return (
        <PatientRow room={key} key={index} />
        );
    });
    return (
      <Grid>
      {roomData}
      </Grid>
    );
  }

});

var PatientRow = React.createClass({

  render: function() {
    var roomKey = Object.keys(this.props.room);
    var roomProperty = [];
    for (var i = 0; i < roomKey.length; i++) {
      roomProperty.push(this.props.room[roomKey[i]]);
    }
    var roomAttribute = roomProperty.map(function(key, index) {
      return (
        <PatientCol roomProperty={roomProperty[index]} key={key} />
        );
    });
    return (
      <Row>
      {roomAttribute}
      </Row>
    );
  }

});

var React = require('react');

var PatientCol = React.createClass({

  render: function() {
    return (
      <Col xs={1} md={1} >
      {this.props.roomProperty}
      </Col>
    );
  }

});

React.render(<MainViewBox data={data}/>, document.getElementById('reactRoot'));

module.exports = MainViewBox;
