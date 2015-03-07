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
var SearchInput = require('./searchinput.jsx');
var UnitNameInput = require('./unitnameinput.jsx');

var HeaderMain = React.createClass({

  componentDidMount: function() {
    var data;

    request
    .get('/header/init')
    .end(function(err, res){
      data = res.body;
    });

    if (data) {
      this.setState({
        units : data.units,
        views : data.views,
        id : data.id,
        name : data.name,
      });
    }

    var tableData;
    request
    .get('/table/init')
    .end(function(err, res){
      tableData = res.body;
    });

    if (tableData) {
      this.setState({
        tableData : tableData
      });
    }
  },

  getInitialState: function() {
    return {
      units : this.props.headerData.units,
      views : this.props.headerData.views,
      id : this.props.headerData.id,
      name : this.props.headerData.name,
      tableData : this.props.tableData
    };
  },


  loadTable: function(key) {
    var tableData;
    request
    .get('table/' + key)
    .end(function(err, res){
      tableData = res.body;
    });

    if (tableData) {
      this.setState({
        tableData : tableData
      });
    }
  },

  handleSelect: function(eventKey) {
    var key = eventKey || 'none';
    // console.log(key,'pressed');
    if (key.length >= 20) {
      this.loadTable(eventKey);
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

    var navbarInstance = (
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

    return (
      navbarInstance
    );
  }

});

module.exports = HeaderMain;
