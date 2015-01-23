'use strict';

var React = require('react');
var Grid  = require('react-bootstrap/Grid');
var Col   = require('react-bootstrap/Col');
var Row   = require('react-bootstrap/Row');
var Table = require('react-bootstrap/Table');
// var Time  = require('./displaytime.jsx');
var data  =
{
  "MedSurg1":[
    {
      "Rm":100,
      "Patient": "Jessica Alba",
      "Doctor": "Dr. Paul Liu",
      "Nurse": "Mary",
      "CNA": "Jack",
      "Code": 1,
      "Isolation": "c.diff",
      "MISC": "dc",
      "Acuity": 5
    },
    {
      "Rm":101,
      "Patient": "Jessica Alba",
      "Doctor": "Dr. Paul Liu",
      "Nurse": "Mary",
      "CNA": "Jack",
      "Code": 1,
      "Isolation": "c.diff",
      "Misc": "dc",
      "Acuity": 5
    },
    {
      "Rm":102,
      "Patient": "Jessica Alba",
      "Doctor": "Dr. Paul Liu",
      "Nurse": "Mary",
      "CNA": "Jack",
      "Code": 1,
      "Isolation": "c.diff",
      "Misc": "dc",
      "Acuity": 5
    },
    {
      "Rm":103,
      "Patient": "Jessica Alba",
      "Doctor": "Dr. Paul Liu",
      "Nurse": "Mary",
      "CNA": "Jack",
      "Code": 1,
      "Isolation": "c.diff",
      "Misc": "dc",
      "Acuity": 5
    },
    {
      "Rm":104,
      "Patient": "Jessica Alba",
      "Doctor": "Dr. Paul Liu",
      "Nurse": "Mary",
      "CNA": "Jack",
      "Code": 1,
      "Isolation": "c.diff",
      "Misc": "dc",
      "Acuity": 5
    },
    {
      "Rm":105,
      "Patient": "Jessica Alba",
      "Doctor": "Dr. Paul Liu",
      "Nurse": "Mary",
      "CNA": "Jack",
      "Code": 1,
      "Isolation": "c.diff",
      "Misc": "dc",
      "Acuity": 5
    }
  ]
};


var React = require('react');

var MainViewBox = React.createClass({

  render: function() {
    var dataKey = Object.keys(this.props.data);
    var objKey;

    var roomData = this.props.data[dataKey[0]].map(function(key, index) {
      objKey = Object.keys(key);
      return (
        <PatientRow room={key} key={index} />
        );
    });

    var tableHead = objKey.map(function(key, index) {
      return(
        <TableHead head={key} key={index} />
        );
    });

    return (
      <Grid>
        <Row>
          <Col xs={18} md={12}>
            <Table striped bordered condensed hover responsive>
              {tableHead}
              {roomData}
            </Table>
          </Col>
        </Row>
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
      <tr>
      {roomAttribute}
      </tr>
    );
  }

});

var PatientCol = React.createClass({

  render: function() {
    return (
      <td>
      {this.props.roomProperty}
      </td>
    );
  }

});

var TableHead = React.createClass({

  render: function() {
    return (
      <th>
      {this.props.head}
      </th>
    );
  }

});

React.render(<MainViewBox data={data}/>, document.getElementById('reactRoot'));

module.exports = MainViewBox;
