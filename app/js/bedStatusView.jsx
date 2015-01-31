'use strict';
var React = require('react');
var Input = require('react-bootstrap/Input');
var Col   = require('react-bootstrap/Col');
var Row   = require('react-bootstrap/Row');
var Table = require('react-bootstrap/Table');
var Grid = require('react-bootstrap/Grid');
var data  = require('../data/data.json');
var request = require('superagent');
var React = require('react');
var _ = require('lodash');
var vow = require('vow');

var Cell = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.roomProperty
    };
  },

  debouncedChange: function (name) {
    var dfd = vow.defer();

    var timerId = this.timerId;
    var self = this;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout((function (innerName) {
      return function () {
        dfd.resolve(innerName);
      };
    })(name), 2000);
    this.timerId = timerId;

    return dfd.promise();
  },

  handleChange: function() {

    var value = this.refs.input.getInputDOMNode().value || null;
    var index = this.props.index;
    var id = this.props.id;
    var obj = {};

    this.debouncedChange(value).then(function(result){

      var sendRequest = function() {
        obj[index] = result;
        console.log(obj);
        request
          .post('/boards/'+ id)
          .send(obj)
          .end(function(error, res){
            console.log(error);
        });
      };

      sendRequest();

    });

    this.setState({
      value: value
    });

  },

  keydown: function() {
    this.refs.input.getDOMNode().focus();
  },

  render: function() {
    return (
      <td>
      <Input
      type="text"
      value={this.state.value}
      onChange={this.handleChange}
      onKeyDown={this.keyDown}
      ref="input"
      submit={this.handleChange}
      placeholder={this.state.value} />
      </td>
    );
  }

});


var PatientRow = React.createClass({
  render: function() {
    var rowID = this.props.rowID;
    var roomKey = Object.keys(this.props.room);
    var roomProperty = [];
    var prevID = this.props.prevID;
    var nextID = this.props.nextID;
    for (var i = 0; i < roomKey.length; i++) {
      roomProperty.push(this.props.room[roomKey[i]]);
    }
    var roomAttribute = roomProperty.map(function(key, index) {
      return (
        <Cell
        roomProperty={roomProperty[index]}
        key={key}
        id={rowID}
        index={roomKey[index]}
        prevID={prevID}
        nextID={nextID} />
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
      <th className="table-head">
      {this.props.head}
      </th>
    );
  }

});

var MainViewBox = React.createClass({

  handleKeyDown: function (event) {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      if (event)
      console.log('key pressed');
    }
  },

  componentDidMount: function () {
    window.addEventListener('keydown', this.handleKeyDown);
  },

  componentWillUnmount: function () {
    window.removeEventListener('keydown', this.handleKeyDown);
  },

  render: function() {
    var headerKey;

    var idKey = this.props.data.map(function(key){
      return key._id;
    });

    var assignID = function(array, index) {
      if (!array[index]) {
        return null;
      } else {
        return array[index];
      }
    };

    var roomData = this.props.data.map(function(key, index) {
      headerKey = Object.keys(key.data);
      return (
        <PatientRow
        room={key.data}
        key={index}
        rowID={key._id}
        prevID={assignID(idKey, index - 1)}
        nextID={assignID(idKey, index + 1)}/>
        );
    });

    var tableHead = headerKey.map(function(key, index) {
      return(
        <TableHead head={key} key={index} />
        );
    });

    return (
      <Grid fluid>
        <Row>
          <Col xs={18} md={12}>
            <Table striped condensed responsive hover>
              {tableHead}
              {roomData}
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }

});

React.render(<MainViewBox data={data} />, document.getElementById('reactRoot'));

module.exports = MainViewBox;