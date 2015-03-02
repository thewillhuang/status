'use strict';
var React = require('react');
var Input = require('react-bootstrap/lib/Input');
var Col   = require('react-bootstrap/lib/Col');
var Row   = require('react-bootstrap/lib/Row');
var Table = require('react-bootstrap/lib/Table');
var Grid = require('react-bootstrap/lib/Grid');
var request = require('superagent');
var React = require('react');
var _ = require('lodash');
var vow = require('vow');
var $ = require('jquery');


// $(function() {
//   $("input").focus(function() { $(this).select(); } );
// }).mouseup(function (e) {
//   e.preventDefault();
// });


var Cell = React.createClass({

  handleFocus: function() {

    var id = this.props.id;
    var prevID = this.props.prevID;
    var nextID = this.props.nextID;
    var left = this.props.keyArray[this.props.keyArrayIndex -1] || null;
    var right = this.props.keyArray[this.props.keyArrayIndex + 1] || null;
    var first = this.props.keyArray[0];
    var allID = this.props.allID;
    var current = this.props.keyArray[this.props.keyArrayIndex];
    var myEvent = new CustomEvent('address', {
      detail:{
       'currentRowID': id,
       'prevID': prevID,
       'nextID': nextID,
       'currentCol': current,
       'left': left,
       'right': right,
       'firstCol': first,
       'allID': allID
     }
   });

    window.dispatchEvent(myEvent);

    this.refs.input.getInputDOMNode().select();

  },

  setFocus: function() {
    if (this.props.focusRow === this.props.id) {
      if (this.props.focusCol === this.props.keyArray[this.props.keyArrayIndex]) {
        this.refs.input.getInputDOMNode().focus();
      }
    }
  },

  componentDidUpdate: function() {
    this.setFocus();
  },

  //this works
  //this is where the bug is
  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextState.value !== this.state.value) {
      return true;
    }
    if (nextProps.focusRow === this.props.id &&
      nextProps.focusCol === this.props.keyArray[this.props.keyArrayIndex]) {
      // console.log('rerender');
      return true;
    } else {
      // console.log('did not rerender');
      return false;
    }
  },

  getInitialState: function() {
    return {
      value: this.props.roomProperty
    };
  },

  //debounced to send the post request when changes are finished
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

    this.setState({
      value: value
    });

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
  },

  render: function() {
    return (
      <td>
      <Input
      className="table-input"
      type="text"
      value={this.state.value}
      onChange={this.handleChange}
      onFocus={this.handleFocus}
      ref="input" />
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
    var keyArray = this.props.keyArray;
    var focusRow = this.props.focusRow;
    var focusCol = this.props.focusCol;
    var allID = this.props.allID;
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
        nextID={nextID}
        allID={allID}
        keyArray={keyArray}
        focusRow={focusRow}
        focusCol={focusCol}
        keyArrayIndex = {index} />
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

var TableBox = React.createClass({

  handleKeyDown: function (event) {
    if (event.keyCode >= 37 && event.keyCode <= 40 || event.keyCode === 9 || event.keyCode === 13) {
      event.preventDefault();
      //down
      if (event.keyCode === 40 || event.keyCode === 13) {
        this.setState({
          focusRow:this.state.focusinfo.nextID,
          focusCol:this.state.focusinfo.currentCol
        });
      }
      //up
      if (event.keyCode === 38 ) {
        this.setState({
          focusRow:this.state.focusinfo.prevID,
          focusCol:this.state.focusinfo.currentCol
        });
      }
      //left
      if (event.keyCode === 37) {
        this.setState({
          focusRow:this.state.focusinfo.currentRowID,
          focusCol:this.state.focusinfo.left
        });
      }
      //shift tab
      if (event.shiftKey === true && event.keyCode === 9) {
        this.setState({
          focusRow:this.state.focusinfo.currentRowID,
          focusCol:this.state.focusinfo.left
        });
      }
      //right
      if (event.keyCode === 39) {
        this.setState({
          focusRow:this.state.focusinfo.currentRowID,
          focusCol:this.state.focusinfo.right
        });
      }
      //tab goes right and moves onto next row or restart to first.
      if (event.keyCode === 9) {
        if (this.state.focusinfo.right === null && this.state.focusinfo.nextID === null) {
          this.setState({
            focusRow: this.state.focusinfo.allID[0],
            focusCol: this.state.focusinfo.firstCol
          });
        } else if (this.state.focusinfo.right === null && this.state.focusinfo.nextID !== null) {
          this.setState({
            focusRow: this.state.focusinfo.nextID,
            focusCol: this.state.focusinfo.firstCol
          });
        }
        this.setState({
          focusRow:this.state.focusinfo.currentRowID,
          focusCol:this.state.focusinfo.right
        });
      }
    } else {
        // event.preventDefault();
    }
  },

  handleAddress: function (event) {
    // console.log(event.detail);
    this.setState({
      focusinfo:event.detail
    });
  },

  getInitialState: function() {
    return {
      focusRow:'',
      focusCol:'',
      focusinfo:''
    };
  },

  componentDidMount: function () {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('address', this.handleAddress, false);
  },

  componentWillUnmount: function () {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('address', this.handleAddress, false);
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

    var focusRow = this.state.focusRow;
    var focusCol = this.state.focusCol;

    var roomData = this.props.data.map(function(key, index) {
      headerKey = Object.keys(key.data);
      return (
        <PatientRow
        room={key.data}
        key={index}
        rowID={key._id}
        prevID={assignID(idKey, index - 1)}
        nextID={assignID(idKey, index + 1)}
        allID = {idKey}
        keyArray={headerKey}
        focusRow={focusRow}
        focusCol={focusCol} />
        );
    });

    var tableHead = headerKey.map(function(key, index) {
      return(
        <TableHead head={key} key={index} />
        );
    });

    return (
      <div>
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
      </div>
      );
  }

});

module.exports = TableBox;
