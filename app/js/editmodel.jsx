'use strict';

var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var OverlayMixin = require('react-bootstrap/lib/OverlayMixin');
var request = require('superagent');

var React = require('react');

//renders the correct setting model and calls the backend api to update new settings.
var EditModals = React.createClass({

  propTypes:{
    eventKey: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired
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
      id: this.props.id
    };
  },

  handleChange: function(){
    
  },

  render: function() {

    //TODO different menu items needs building
    var editTable = (
      <Modal bsStyle="primary"
        title="Edit Table"
        onRequestHide={this.handleToggle}>
        <div className="modal-body">
          Select How many Rows {this.state.editTableRowInput}
          <input type="range"
            ref="editTableRowChange"
            value={this.state.editTableRowInput}
            min="2"
            max="24"
            step="1"
            onChange={this.handleEditTableChange} />

          <hr />
          Select How many Columns
          <input type="range"
            ref="editTableColChange"
            value={this.state.editTableRowInput}
            min="2"
            max="12"
            step="1"
            onChange={this.handleEditTableChange} />

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

    // console.log('eventKey',eventKey);

    // this part handles which modal will be rendered given an eventkey
    var eventKey = this.state.eventKey;
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
