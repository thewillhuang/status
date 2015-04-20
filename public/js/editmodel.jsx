'use strict';

var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var OverlayMixin = require('react-bootstrap/lib/OverlayMixin');
var request = require('superagent');
var Select = require('react-select');
var React = require('react');
var uuid = require('uuid');
// var Selectize = require('./selectize.jsx');
// require('selectize');
var transfer = {};

var EditModals = React.createClass({

  propTypes:{
    eventKey: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired,
    tableData: React.PropTypes.array.isRequired,
    headerUnits: React.PropTypes.array.isRequired,
    headerViews: React.PropTypes.array.isRequired
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
    var rowValue;
    var roomMap = data.map(function(key,index) {
      headerkey = Object.keys(key.data);
      rowValue = index + 1;
    });
    var props = this.props;
    // console.log(props.headerUnits, props.headerViews);

    var hederMap = props.headerUnits.map(function(key,index) {
      // console.log(key);
    });
    return {
      eventKey: this.props.eventKey,
      id: this.props.id,
      value: "",
      headerKey: headerkey,
      rowValue: rowValue,
      units: this.props.headerUnits,
      views: this.props.headerViews
    };
  },

  setHeaderKey: function(array){
    this.setState({
      headerKey: array
    });
  },




  //returns an array of objects.data and object.id that is unique for each row
  //with the input of new columns.
  generateTable: function(columnArray, row){
    var column = columnArray || this.state.headerKey;
    var numRow = row;
    // console.log('numRow', numRow);
    var array = [];
  	var o = {};

  	for (var i = 0; i < column.length; i++) {
  		o[columnArray[i]] = "example" + i;
  	}

  	for (var j = 0; j < numRow; j++) {
  		var obj = o;
  		var id = uuid.v4();
  		array.push({
  			data: obj,
  			id: id
  			});
  	}

    // console.log(array);
    this.sendTableData(array);
  },

  columnOrderChange: function(val, array) {
    var newArray = val.split(",");
    transfer.columnOrderChange = newArray;

  },

  columnOrderSubmit: function(){
    var headerkey = transfer.columnOrderChange;
    var row = this.state.rowValue;
    this.setState({
      headerKey: headerkey
    });
    this.generateTable(headerkey, row);
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
    // console.log('row value', value);

    this.generateTable(headerKey, value);

    this.setState({
      rowValue: value
    });
  },




  handleColumnSubmit: function(e) {
    // console.log('onsubmit called');
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
    // console.log('onChange called');
    var value = e.target.value || null;

    this.setState({
      columnValue: value
    });
  },




  //TODO need to write final function that will tell the server to make the changes
  onTableSaveChange: function() {
    console.log('submit all changes to server');
    this.handleToggle();
  },

  render: function() {

    //TODO different menu items needs building
    var editTable = (
      <Modal bsStyle="primary"
        title="Edit Table Format (Rows and Column)"
        onRequestHide={this.handleToggle}>
        <div className="modal-body">

          Choose Columns
          <Select
              name="form-field-name"
              multi={true}
              value={undefined}
              onChange={this.columnOrderChange}
              asyncOptions={this.getOptions}
              autoload={false}
          />
          <Button onClick={this.columnOrderSubmit} >
            Change Column Order
          </Button>
          <hr />

          Enter New Column name
          <br/>

            <input
              ref="newColumn"
              onChange={this.handleColumnChange}
              value={this.state.columnValue} />
            <br/>
            <Button onClick={this.handleColumnSubmit}>
              Add Column
            </Button>

          <hr />

          Select How many Rows:  {this.state.rowValue}
          <input
              type="range"
              ref="editTableRow"
              value={this.state.rowValue}
              min="1"
              max="25"
              step="1"
              onChange={this.handleRowChange}
            />
        </div>

        <div className="modal-footer">
          <Button onClick={this.handleToggle}>Close</Button>
          <Button onClick={this.onTableSaveChange}bsStyle="primary">Save changes</Button>
        </div>
      </Modal>
    );




    var editUnit = (
      <Modal bsStyle="primary" title="Edit Units" onRequestHide={this.handleToggle}>
        <div className="modal-body">
          <Select
            name="form-field-name"
            multi={true}
            value={undefined}
            onChange={this.onUnitChange}
            asyncOptions={this.unitGetOptions}
            autoload={false}
          />
          <Button onClick={this.onUnitSubmit} >
            Modify Units
          </Button>

          <hr />

          Enter New Unit <br/>
          <input
            ref="newColumn"
            onChange={this.handleColumnChange}
            value={this.state.columnValue} /> <br/>
          <Button onClick={this.handleColumnSubmit}>
            Add Column
          </Button>
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
          <Select
              name="form-field-name"
              multi={true}
              value={undefined}
              onChange={this.onViewChange}
              asyncOptions={this.viewGetOptions}
              autoload={false}
          />
        <Button onClick={this.onViewSubmit} >
            Modify Views
          </Button>
          <hr />
          Enter New View
          <br/>

            <input
              ref="newColumn"
              onChange={this.handleColumnChange}
              value={this.state.columnValue} />
            <br/>
            <Button onClick={this.handleColumnSubmit}>
              Add Column
            </Button>
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
        </div>
        <div className="modal-footer">
          <Button onClick={this.handleToggle}>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </div>
      </Modal>
    );

    // this part handles which modal will be rendered given an eventkey
    var eventKey = this.state.eventKey;
    // console.log('eventKey',eventKey);
    var load;

    var loadbyState = function(eventKey) {
      switch(eventKey) {
        case 1:
            load = editTable;
            break;
        case 2:
            load = editUnit;
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
