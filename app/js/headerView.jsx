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
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

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
      <EditModel
        eventKey={this.state.eventState}
        id={this.state.tableid}
        tableData={this.state.tableData}
        headerUnits={this.state.units}
        headerViews={this.state.views}/>
    );

  },

  //updates the header name to coorolate with the current table being displayed.
  updateHeaderName: function(tableid) {
    // console.log(tableid);
    var name;
    var id;
    var units = this.state.units;
    var views = this.state.views;
    // console.log(units, views);

    //find the actual object with the same id then set the name and nameid as the new
    //header state going through units first
    for (var i = 0; i < units.length; i++){
      if (units[i].tableid === tableid){
        name = units[i].name;
        id = units[i]._id;
      } else { // then go through views
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
      //loads the corosponding table with a given id
      this.loadTableById(eventKey);
      //loads a new header name with the given id
      this.updateHeaderName(eventKey);

    } else if (key >= 0 && key < 5) { //handles event 1-4 by loading the modals
      this.handleToggle();
      this.setState({
        eventState : key
      });
    }

    //TODO handle cog event 5 logout for auth auth

  },

  handleSearch: function(data) {
    // console.log(data);
    this.loadTable(data.detail);
    this.setState({
      name:"Search Results",
      id: ''
    });
  },

  componentWillUnmount: function () {
    window.removeEventListener('tableData', this.handleSearch);
    window.removeEventListener('modelToggle', this.handleToggle);
  },

  componentDidMount: function() {

    //handles toggle of modals from editmodel
    window.addEventListener('modelToggle', this.handleToggle);

    //handles search data from searchinput to give new data to table
    window.addEventListener('tableData', this.handleSearch);

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
    var units = this.parseUnitsFromHeader(this.props.headerData);
    var views = this.parseViewsFromHeader(this.props.headerData);

      this.setState({
        units : units,
        views : views
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

  parseUnitsFromHeader: function(data){
    // console.log(data);
    var array = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].dropdown === "units"){
        array.push(data[i]);
      }
    }
    return array;
  },

  parseViewsFromHeader: function(data){
    var array = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].dropdown === "views"){
        array.push(data[i]);
      }
    }
      return array;
  },

  //transfer mock data from props to states
  getInitialState: function() {
      var units = this.parseUnitsFromHeader(this.props.headerData);
      var views = this.parseViewsFromHeader(this.props.headerData);
    return {
      headerData: this.props.headerData,
      units : units,
      views : views,
      tableid : units[0].tableid,
      id: units[0]._id,
      name : units[0].name,
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
