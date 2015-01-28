'use strict';
var React = require('react');
// var Grid  = require('react-bootstrap/Grid');
var Input = require('react-bootstrap/Input');
var Col   = require('react-bootstrap/Col');
var Row   = require('react-bootstrap/Row');
var Table = require('react-bootstrap/Table');
var data  = require('../data/data.json');
var request = require('superagent');
var React = require('react');
var _ = require('lodash');

var Cell = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.roomProperty
    };
  },

  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
    // _.debounce(this.sendPost(), 500);
    this.sendPost();
  },

  sendPost: function() {
    console.log('sending', this.refs.input.getInputDOMNode().value);
    request
      .post('/boards/'+ this.props.room + '/' +  this.props.index + '/' + this.refs.input.getInputDOMNode().value)
      .end(function(error, res){
        console.log(res);
    });
  },

  render: function() {
    return (
      <td>
      <Input
      type="text"
      value={this.state.value}
      onChange={this.handleChange}
      ref="input"
      submit={this.handleChange}
      placeholder={this.state.value} />
      </td>
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
        <Cell roomProperty={roomProperty[index]} key={key} room={roomProperty[0]} index={roomKey[index]} />
        );
    });
    return (
      <tr>
      {roomAttribute}
      </tr>
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

var MainViewBox = React.createClass({

  render: function() {
    var objKey;

    var roomData = this.props.data.map(function(key, index) {
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
        <Row>
          <Col xs={18} md={12}>
            <Table striped bordered condensed hover responsive>
              {tableHead}
              {roomData}
            </Table>
          </Col>
        </Row>
    );
  }

});

React.render(<MainViewBox data={data.MedSurg1}/>, document.getElementById('reactRoot'));

module.exports = MainViewBox;
