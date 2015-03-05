'use strict';
var vow = require('vow');
var request = require('superagent');

var React = require('react');
var Navbar = require('react-bootstrap/lib/Navbar');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var Input = require('react-bootstrap/lib/Input');
var DropdownButton = require('react-bootstrap/lib/DropdownButton');
var EditColumn = require('./editColumn.jsx');
var Glyphicon = require('react-bootstrap/lib/glyphicon');

var TableBox = require('./bedStatusView.jsx');

var React = require('react');

var FloorNameInput = React.createClass({

  getInitialState: function() {
    return {
      value:this.props.floorName
    };
  },

     //debounced to send the post request when changes are finished
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
    })(name), 2000);
    this.timerId = timerId;

    return dfd.promise();
  },

  handleChange: function() {
    var value = this.refs.input.getInputDOMNode().value || null;
    var obj = {};
    var id = this.props.id;

    this.debouncedChange(value).then(function(result){

      var sendRequest = function() {
        obj.floor = result;
        console.log(obj);
        request
        .post('/floor/' + id)
        .send(obj)
        .end(function(error, res){
          console.log(error);
        });
      };

      sendRequest();

    });

    this.setState({
      value: value
    });
  },

  handleFocus: function() {
    this.refs.input.getInputDOMNode().select();
  },

  render: function() {
    return (
      <div className="floornamewrapper">
      <Input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        ref="input"
        className="floorNameInput" />
      </div>
    );
  }

});

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
        unit : data.unit,
        views : data.views,
        id : data.id,
        unitName : data.unitName,
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
      unit:this.props.headerData.unit,
      views:this.props.headerData.views,
      id:this.props.headerData.id,
      unitName:this.props.headerData.unitName,
      tableData:this.props.tableData
    };
  },

  handleSelect: function(eventKey) {
    console.log(eventKey,'pressed');
  },

  render: function() {

    var floors = this.state.unit.map(function(key, index){
      // console.log(key);
      return (
        <MenuItem
        eventKey={key} key={index} > {key} </MenuItem>
        );
    });

    var views = this.state.views.map(function(key, index){
      // console.log(key);
      return (
        <MenuItem
        eventKey={key} key={index} > {key} </MenuItem>
        );
    });

    var navbarInstance = (
      <div>
        <Navbar brand={
          <FloorNameInput
            floorName={this.state.unitName}
            id={this.state.id} />}
            toggleNavKey={0}
            defaultNavExpanded={false}
            fluid
          >

          <Nav onSelect={this.handleSelect} eventKey={0} right>

            <NavItem eventKey="search" id="custom-search-input">
              <div className="input-group">
                <Input type="search" className="search-query form-control" placeholder="Search Doctor or patient" addonAfter={<Glyphicon glyph="search" />} />
              </div>
            </NavItem>

            <DropdownButton eventKey="views" title="Views" id="view">
              {views}
            </DropdownButton>

            <DropdownButton eventKey="floors" title="Floors" id="floor">
              {floors}
            </DropdownButton>

            <DropdownButton eventKey="settings" title={<Glyphicon glyph="cog" />} id="login">
              <MenuItem eventKey="editTables">Edit Table</MenuItem>
              <MenuItem eventKey="editFloors">Edit Floors</MenuItem>
              <MenuItem eventKey="editViews">Edit Views</MenuItem>
              <MenuItem eventKey="optimizer">Staff Optimizer</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="pref">Preference</MenuItem>
              <MenuItem eventKey="login">Log Out</MenuItem>
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
