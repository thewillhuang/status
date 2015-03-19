'use strict';

var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var OverlayMixin = require('react-bootstrap/lib/OverlayMixin');
var request = require('superagent');
var Select = require('react-select');
var React = require('react');

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

  getInitialState: function() {
    return {
      eventKey: this.props.eventKey,
      id: this.props.id,
    };
  },

  setHeaderKey: function(array){
    this.setState({
      headerKey: array
    });
  },
  logChange: function(val) {
    console.log("Selected: " + val);
  },

  getOptions: function(input, callback){
    var data = this.props.tableData;
    var options = [];
    var headerkey;
    var set = this.setHeaderKey;
    var makeOptionFromTable = function() {
      // console.log(data);
      var roomMap = data.map(function(key,index) {

        headerkey = Object.keys(key.data);

      });

      // console.log(headerkey);

      for (var i = 0; i < headerkey.length; i++) {
        // console.log(headerkey.length);
        var obj = {};
        // console.log(headerkey[i]);
        obj.value = headerkey[i];
        obj.label = headerkey[i];
        // console.log(obj);
        options.push(obj);
        // console.log(options);
      }

      // console.log(headerkey);

      set(headerkey);

    };

    makeOptionFromTable();

    setTimeout(function() {
        callback(null, {
            options: options,
            complete: true
        });
    }, 500);

  },

  handleRowChange: function(){

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
              onChange={this.logChange}
              value={this.state.headerKey}
              asyncOptions={this.getOptions}
          />

          <hr />

          Select How many Rows {this.state.editTableRowInput}

          <input
              type="range"
              ref="editTableRow"
              value={this.state.editTableRowInput}
              min="2"
              max="24"
              step="1"
              onChange={this.handleRowChange}
            />

          <hr />
          Enter New Column name
          <br />
          <input
            ref="newColumn"
            value={this.state.columnchange}
            onChange={this.handleColumnChange}
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
