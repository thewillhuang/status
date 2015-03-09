'use strict';
var vow = require('vow');
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
var EditColumn = require('./editColumn.jsx');

//components
var TableBox = require('./bedStatusView.jsx');
var UnitNameInput = require('./unitnameinput.jsx');


//mock data
var mockdata  = require('../data/mockdata2.json');
var mockdata2  = require('../data/data.json');


var SearchInput = React.createClass({

  sendSearchData: function(obj) {
    var searchEvent = new CustomEvent('searchData', {
      detail: obj
    });

    window.dispatchEvent(searchEvent);
  },

  getInitialState: function(){
    return {
      value:""
    };
  },

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
    var value = this.refs.search.getInputDOMNode().value || null;
    var sendData = this.sendSearchData;

    this.debouncedChange(value).then(function(result){

      var sendRequest = function() {
        var searchResponseData;
        request
        .get('/search/' + value)
        .end(function(error, res){
          if (error) {
            console.log(error);
          }
          console.log(res.body);
          searchResponseData = res.body || mockdata2;
          // console.log(searchResponseData);
          sendData(searchResponseData);
        });
      };

      sendRequest();

    });

    this.setState({
      value: value
    });

  },

  render: function() {
    return (
      <div>
        <Input type="text"
          className="search-query form-control"
          placeholder="Search Doctor or patient"
          onChange={this.handleChange}
          value={this.state.value}
          ref="search"
          addonAfter={<Glyphicon glyph="search" />} />
      </div>
    );
  }

});

var HeaderMain = React.createClass({

  handleSearch: function(data) {
    // console.log(data);
    this.loadTable(data.detail);
  },

  componentWillUnmount: function () {
    window.removeEventListener('searchData', this.handleSearch);
  },

  componentDidMount: function() {

    window.addEventListener('searchData', this.handleSearch);

    var data;

    request
    .get('/header')
    .end(function(err, res){
      if (err) {
        console.log(err);
      }
      data = res.body;
    });

    if (data) {
      this.setState({
        units : data.units,
        views : data.views,
        id : data.units[0]._id,
        name : data.units[0].name,
      });
    }

  },

  getInitialState: function() {
    return {
      units : this.props.headerData.units,
      views : this.props.headerData.views,
      id : this.props.headerData.units[0]._id,
      name : this.props.headerData.units[0].name,
      tableData : this.props.tableData
    };
  },


  loadTableById: function(id) {
    var tableData;
    request
    .get('tables/' + id)
    .end(function(err, res){
      if (err) {
        console.log(err);
      }
      tableData = res.body;
    });

    if (tableData) {
      this.setState({
        tableData : tableData
      });
    }
  },

  loadTable: function(data) {
    this.setState({
      tableData : data
    });
  },

  handleSelect: function(eventKey) {
    var key = eventKey || 'none';
    // console.log(key,'pressed');
    if (key.length >= 20) {
      this.loadTableById(eventKey);
    }
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
              <MenuItem eventKey={5}>Preference</MenuItem>
              <MenuItem eventKey={6}>Log Out</MenuItem>
            </DropdownButton>

          </Nav>

        </Navbar>

        <TableBox data={this.state.tableData} />

      </div>
    );
  }

});

module.exports = HeaderMain;
