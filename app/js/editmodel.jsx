'use strict';

var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var OverlayMixin = require('react-bootstrap/lib/OverlayMixin');

var React = require('react');

//renders the correct setting and calls the backend api to update new settings.
var EditModals = React.createClass({

  toggleEvent: function(obj) {
    var toggleEvent = new CustomEvent('modelToggle');

    window.dispatchEvent(toggleEvent);
  },

  propTypes:{
    eventKey: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      eventKey: this.props.eventKey,
    };
  },

  handleToggle: function () {
    console.log('toggle modal in editmodel called');
    this.toggleEvent();
    // console.log('isModalOpen in editModel', this.state.isModalOpen);
    // this.setState({
    //   isModalOpen: !this.state.isModalOpen
    // });
  },

  render: function() {

    //TODO different menu items needs building
    var editTable = (
      <Modal bsStyle="primary" title="Edit Table" onRequestHide={this.handleToggle}>
        <div className="modal-body">
          Select How many Rows {this.state.editTableRowInput}
          <input type="range"
            ref="editTableChange"
            id="weight"
            value={this.state.editTableRowInput}
            min="0"
            max="22"
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
            // console.log('default triggered');
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
