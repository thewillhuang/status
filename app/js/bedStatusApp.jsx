'use strict';
var React = require('react');
var Input = require('react-bootstrap/Input');
var Col   = require('react-bootstrap/Col');
var Row   = require('react-bootstrap/Row');
var Table = require('react-bootstrap/Table');
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

  // debounceChange: function() {
  //   var value = this.refs.input.getInputDOMNode().value || null;
  //   var index = this.props.index;
  //   var id = this.props.id;
  //   var obj = {};

  //   var sendRequest = function() {
  //     obj[index] = value;
  //     console.log(obj);
  //     request
  //       .post('/boards/'+ id)
  //       .send(obj)
  //       .end(function(error, res){
  //         console.log(error);
  //     });
  //   };

  //   var debounce = _.debounce(sendRequest, 1000, {'trailing': true});

  //   debounce();

  // },

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
    })(name), 1000);
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

    // this.debounceChange();
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
    var rowID = this.props.rowID;
    var roomKey = Object.keys(this.props.room);
    var roomProperty = [];
    for (var i = 0; i < roomKey.length; i++) {
      roomProperty.push(this.props.room[roomKey[i]]);
    }
    var roomAttribute = roomProperty.map(function(key, index) {
      return (
        <Cell roomProperty={roomProperty[index]} key={key} id={rowID} index={roomKey[index]} />
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
      objKey = Object.keys(key.data);
      return (
        <PatientRow room={key.data} key={index} rowID={key._id}/>
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
            <Table striped condensed hover responsive>
              {tableHead}
              {roomData}
            </Table>
          </Col>
        </Row>
    );
  }

});

React.render(<MainViewBox data={data} />, document.getElementById('reactRoot'));

module.exports = MainViewBox;
