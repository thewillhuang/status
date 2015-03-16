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

//modal compoments
var OverlayMixin = require('react-bootstrap/lib/OverlayMixin');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');

//components
var TableBox = require('./bedStatusView.jsx');
var UnitNameInput = require('./unitnameinput.jsx');
var SearchInput = require('./searchinput.jsx');
var EditModel = require('./editmodel.jsx');

//mock data
var mockdata  = require('../data/mockdata2.json');
var mockdata2  = require('../data/data.json');

var HeaderMain = React.createClass({

  //start of model hide show inner workings
  mixins: [OverlayMixin],

  handleToggle: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  renderOverlay: function () {
    if (!this.state.isModalOpen) {
      // console.log('hide modal in headerview called');
      return <span/>;
    }

    return (
      <EditModel eventKey={this.state.eventState} id={this.state.tableid} />
    );

  },

  updateHeaderName: function(tableid) {
    // console.log(tableid);
    var name;
    var id;
    var units = this.state.units;
    var views = this.state.views;
    // console.log(units, views);
    for (var i = 0; i < units.length; i++){
      if (units[i].tableid === tableid){
        name = units[i].name;
        id = units[i]._id;
      } else {
        for (var j = 0; j < views.length; j++){
          if (views[j].tableid === tableid){
            name = views[j].name;
            id = views[j]._id;
          }
        }
      }
    }

    this.setState({
      name: name,
      id: id
    });

  },

  //handles what happens during clicking the drop down
  handleSelect: function(eventKey) {
    var key = eventKey || 'none';

    //handles requests with a given ID to load a new table,
    //ie swithcing from view 1 to view 2 or view 1 to  table 1
    if (key.length >= 20) {
      this.loadTableById(eventKey);
      this.updateHeaderName(eventKey);

    } else if (key >= 0 && key < 5) { //handles event 1-4
      this.handleToggle();
      this.setState({
        eventState : key
      });
    }

    //TODO handle cog event 5 logout

  },

  handleSearch: function(data) {
    // console.log(data);
    this.loadTable(data.detail);
  },

  componentWillUnmount: function () {
    window.removeEventListener('searchData', this.handleSearch);
    window.removeEventListener('modelToggle', this.handleToggle);
  },

  componentDidMount: function() {

    //handles toggle of modals from editmodel
    window.addEventListener('modelToggle', this.handleToggle);

    //handles search data from searchinput to give new data to table
    window.addEventListener('searchData', this.handleSearch);

    //initialize header with server data instead of mock data.
    this.initializeHeader();

    //TODO add socket IO server refresh on refresh event. implimen this
    //on server side to broadcast change to client on receving new data.
  },

  initializeHeader: function(){
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

  loadHeader: function(data){

      this.setState({
        units : data.units,
        views : data.views,
        tableid : data.units[0].tableid,
        name : data.units[0].name,
        id: data.units[0]._id
      });

  },

  //TODO call this function to reload last loaded page on the specific client
  onTablePush : function() {
    var loadtable = this.loadTable;
    var id = this.state.tableid;

    request
    .get('tables/' + id)
    .end(function(err, res){
      if (err) console.log(err);
      if (res.body) {
        loadtable(res.body, id);
      }
    });
  },

  onHeaderPush : function() {
    var loadheader = this.loadHeader;

    request
    .get('header/')
    .end(function(err, res){
      if (err) console.log(err);
      if (res.body) {
        loadheader(res.body);
      }
    });
  },


  //transfer mock data from props to states
  getInitialState: function() {
    return {
      units : this.props.headerData.units,
      views : this.props.headerData.views,
      tableid : this.props.headerData.units[0].tableid,
      id: this.props.headerData.units[0]._id,
      name : this.props.headerData.units[0].name,
      tableData : this.props.tableData,
      isModalOpen: false
    };
  },

  loadTableById: function(tableid) {
    var loadtable = this.loadTable;

    this.setState({
      tableid: tableid
    });

    request
    .get('tables/' + tableid)
    .end(function(err, res){
      if (err) console.log(err);
      if (res.body) {
        loadtable(res.body);
      }
    });

  },

  loadTable: function(data) {
    this.setState({
      tableData : data
    });
  },

  render: function() {

    var units = this.state.units.map(function(key, index){
      // console.log(key);
      return (
        <MenuItem
          eventKey={key.tableid} key={index} > {key.name} </MenuItem>
      );
    });

    var views = this.state.views.map(function(key, index){
      // console.log(key);
      return (
        <MenuItem
          eventKey={key.tableid} key={index} > {key.name} </MenuItem>
      );
    });

    var all = (
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


    return (
      all
    );
  }

});

module.exports = HeaderMain;
