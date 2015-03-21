'use strict';

var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var OverlayMixin = require('react-bootstrap/lib/OverlayMixin');
var request = require('superagent');
var Select = require('react-select');
var React = require('react');
var uuid = require('uuid');

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/


//renders the correct setting model and calls the backend api to update new settings.
var EditModals = React.createClass({

  propTypes:{
    eventKey: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired,
    tableData: React.PropTypes.array.isRequired
  },

  handleToggle: function () {
    // console.log('toggle modal in editmodel called');
    this.toggleEvent();
  },

  toggleEvent: function(obj) {
    var toggleEvent = new CustomEvent('modelToggle');
    window.dispatchEvent(toggleEvent);
  },

  sendTableData: function(array) {
    var searchEvent = new CustomEvent('tableData', {
      detail: array
    });

    window.dispatchEvent(searchEvent);
  },

  getInitialState: function() {
    var data = this.props.tableData;
    var headerkey;
    var roomMap = data.map(function(key,index) {
      headerkey = Object.keys(key.data);
    });
    return {
      eventKey: this.props.eventKey,
      id: this.props.id,
      value: "",
      headerKey: headerkey
    };
  },

  setHeaderKey: function(array){
    this.setState({
      headerKey: array
    });
  },

  //returns an array of objects.data and object.id that is unique for each row
  //with the input of new columns.
  generateTable: function(columnArray){
    console.log(columnArray);
    var numRow = this.state.rowValue;
    var array = [];
  	var o = {};

  	for (var i = 0; i < columnArray.length; i++) {
  		o[columnArray[i]] = "data" + i;
  	}

  	for (var j = 0; j < numRow; j++) {
  		var obj = o;
  		var id = uuid.v4();
  		array.push({
  			data: obj,
  			id: id
  			});
  	}

    this.sendTableData(array);

  },

  columnOrderOnChange: function(val, array) {
    // console.log("Selected: " + val);
    var newArray = val.split(",");
    // console.log(newArray);
    this.generateTable(newArray);
  },

  getOptions: function(input, callback){
    var options = [];
    var headerkey = this.state.headerKey;
    var makeOptionFromTable = function() {
      for (var i = 0; i < headerkey.length; i++) {
        var obj = {};
        obj.value = headerkey[i];
        obj.label = headerkey[i];
        options.push(obj);
      }
    };
    makeOptionFromTable();
    setTimeout(function() {
        callback(null, {
            options: options,
            complete: true
        });
    }, 500);
  },

  handleRowChange: function(e){
    var value = e.target.value || null;
    var headerKey = this.state.headerKey;
    this.setState({
      rowValue: value
    });

    this.generateTable(headerKey);
  },

  handleColumnSubmit: function(e) {
    console.log('onsubmit called');
    e.preventDefault();
    var value = this.state.columnValue || null;
    var headerKey = this.state.headerKey;

    headerKey.push(value);

    this.setState({
      headerKey: headerKey,
      columnValue: ""
    });

  },

  handleColumnChange: function(e) {
    console.log('onChange called');
    var value = e.target.value || null;

    this.setState({
      columnValue: value
    });
  },

  render: function() {

    //TODO different menu items needs building
    var editTable = (
      <Modal bsStyle="primary"
        title="Edit Table"
        onRequestHide={this.handleToggle}>
        <div className="modal-body">

          Choose Column Order
          <Select
              name="form-field-name"
              multi={true}
              onChange={this.columnOrderOnChange}
              value={undefined}
              asyncOptions={this.getOptions}
              autoload={false}
          />
          <hr />

          Enter New Column name
          <br/>

          <form onSubmit={this.handleColumnSubmit}>
            <input
              ref="newColumn"
              onChange={this.handleColumnChange}
              value={this.state.columnValue} />
              <br/>
            <button>Add Column</button>
          </form>
          <hr />

          Select How many Rows:  {this.state.rowValue}
          <input
              type="range"
              ref="editTableRow"
              value={this.state.rowValue}
              min="0"
              max="25"
              step="1"
              onChange={this.handleRowChange}
            />
        </div>

        <div className="modal-footer">
          <Button onClick={this.handleToggle}>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </div>
      </Modal>
    );

    var editFloor = (
      <Modal bsStyle="primary" title="Edit Floor" onRequestHide={this.handleToggle}>
        <div className="modal-body">
          This modal is controlled by our custom trigger component.
        </div>
        <div className="modal-footer">
          <Button onClick={this.handleToggle}>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </div>
      </Modal>
    );

    var editView = (
      <Modal bsStyle="primary" title="Edit View" onRequestHide={this.handleToggle}>
        <div className="modal-body">
          This modal is controlled by our custom trigger component.
        </div>
        <div className="modal-footer">
          <Button onClick={this.handleToggle}>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </div>
      </Modal>
    );

    var staffOptimizer = (
      <Modal bsStyle="primary" title="Staff Optimizer" onRequestHide={this.handleToggle}>
        <div className="modal-body">
          This modal is controlled by our custom trigger component.
        </div>
        <div className="modal-footer">
          <Button onClick={this.handleToggle}>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </div>
      </Modal>
    );

    // this part handles which modal will be rendered given an eventkey
    var eventKey = this.state.eventKey;
    console.log('eventKey',eventKey);
    var load;

    var loadbyState = function(eventKey) {
      switch(eventKey) {
        case 1:
            load = editTable;
            break;
        case 2:
            load = editFloor;
            break;
        case 3:
            load = editView;
            break;
        case 4:
            load = staffOptimizer;
            break;
        default:
            console.log('default triggered');
            break;
      }

    };

    loadbyState(eventKey);

    return (
      load
    );

  }

});

module.exports = EditModals;
