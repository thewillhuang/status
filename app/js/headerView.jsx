'use strict';
var request = require('superagent');

var React = require('react');

//react-bootstrap components
var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var Input = require('react-bootstrap/lib/Input');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var Glyphicon = require('react-bootstrap/lib/glyphicon');
var OverlayMixin = require('react-bootstrap/lib/OverlayMixin');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');

//components
var TableBox = require('./bedStatusView.jsx');
var UnitNameInput = require('./unitnameinput.jsx');
var SearchInput = require('./searchinput.jsx');

//mock data
var mockdata  = require('../data/mockdata2.json');
var mockdata2  = require('../data/data.json');

var HeaderMain = React.createClass({
  mixins: [OverlayMixin],

  handleToggle: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  renderOverlay: function () {
    if (!this.state.isModalOpen) {
      return <span/>;
    }

    //different menu items
    var editTable = (
      <Modal bsStyle="primary" title="Edit Table" onRequestHide={this.handleToggle}>
        <div className="modal-body">
          This modal is controlled by our custom trigger component.
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


    var eventKey = this.state.eventState;
    // console.log('eventKey',eventKey);
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


  },

  handleSelect: function(eventKey) {
    var key = eventKey || 'none';

    // console.log(key);

    this.setState({
      eventState : key
    });

    // console.log(key,'pressed');
    if (key.length >= 20) {
      this.loadTableById(eventKey);
    }

    if (key >= 0) {
      this.handleToggle();
    }

  },

  handleSearch: function(data) {
    // console.log(data);
    this.loadTable(data.detail);
  },

  componentWillUnmount: function () {
    window.removeEventListener('searchData', this.handleSearch);
  },

  componentDidMount: function() {

    //TODO add socket IO server refresh on refresh event. implimen this
    //on server side to broadcast change to client on receving new data.

    window.addEventListener('searchData', this.handleSearch);

    var loadheader = this.loadHeader;
    request
    .get('/header')
    .end(function(err, res){
      if (err) {
        console.log(err);
      }
      if (res.body) {
        loadheader(res.body);
      }
    });

  },

  //TODO call this function to reload last loaded page on the specific client
  onServerPush : function() {
    var loadtable = this.loadTable;
    var id = this.state.tableID;

    request
    .get('tables/' + id)
    .end(function(err, res){
      if (err) console.log(err);
      if (res.body) {
        loadtable(res.body, id);
      }
    });
  },

  loadHeader: function(data){
    this.setState({
      units : data.units,
      views : data.views,
      id : data.units[0]._id,
      name : data.units[0].name,
    });
  },

  getInitialState: function() {
    return {
      units : this.props.headerData.units,
      views : this.props.headerData.views,
      id : this.props.headerData.units[0]._id,
      name : this.props.headerData.units[0].name,
      tableData : this.props.tableData,
      isModalOpen: false
    };
  },

  loadTableById: function(id) {
    var loadtable = this.loadTable;
    request
    .get('tables/' + id)
    .end(function(err, res){
      if (err) console.log(err);
      if (res.body) {
        loadtable(res.body, id);
      }
    });

  },

  loadTable: function(data, id) {
    this.setState({
      tableData : data,
      tableID : id
    });
  },

  render: function() {

    var units = this.state.units.map(function(key, index){
      // console.log(key);
      return (
        <MenuItem
          eventKey={key._id} key={index} > {key.name} </MenuItem>
      );
    });

    var views = this.state.views.map(function(key, index){
      // console.log(key);
      return (
        <MenuItem
          eventKey={key._id} key={index} > {key.name} </MenuItem>
      );
    });

    return (
      <div>
        <Navbar
          brand={
            <UnitNameInput
              unitName={this.state.name}
              id={this.state.id} />
          }
          toggleNavKey={0}
          defaultNavExpanded={false}
          fluid
          >

          <Nav onSelect={this.handleSelect} eventKey={0} right>

            <NavItem id="custom-search-input">
              <div className="input-group">
                <SearchInput />
              </div>
            </NavItem>

            <DropdownButton eventKey="views" title="Views" id="view">
              {views}
            </DropdownButton>

            <DropdownButton eventKey="floors" title="Floors" id="floor">
              {units}
            </DropdownButton>

            <DropdownButton eventKey="settings"
              title={
                <Glyphicon glyph="cog" />}
              id="login">
              <MenuItem eventKey={1}>Edit Table</MenuItem>
              <MenuItem eventKey={2}>Edit Floors</MenuItem>
              <MenuItem eventKey={3}>Edit Views</MenuItem>
              <MenuItem eventKey={4}>Staff Optimizer</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={5}>Log Out</MenuItem>
            </DropdownButton>

          </Nav>

        </Navbar>

        <TableBox data={this.state.tableData} />

      </div>
    );
  }

});

module.exports = HeaderMain;
