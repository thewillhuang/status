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

  handleSelect: function(eventKey) {
    console.log(eventKey,'pressed');
  },

  render: function() {
    var floors = this.props.floors.map(function(key, index){
      // console.log(key);
      return (
        <MenuItem
        eventKey={key} key={index} > {key} </MenuItem>
        );
    });

    var navbarInstance = (
        <Navbar brand={
            <FloorNameInput
            floorName={this.props.floorName}
            id={this.props.id} />}
          toggleNavKey={0}
          defaultNavExpanded={false}
          fluid >

          <Nav onSelect={this.handleSelect} right eventKey={0}>

            <NavItem eventKey="search" id="custom-search-input">
              <div className="input-group">
                <input type="search" className="search-query form-control" placeholder="Search" />
                  <span className="input-group-btn">
                    <button className="btn btn-danger" type="button">
                      <span className="glyphicon glyphicon-search"></span>
                    </button>
                  </span>
              </div>
            </NavItem>

            <DropdownButton eventKey="floors" title="Floors">
              {floors}
            </DropdownButton>

            <DropdownButton eventKey="welcome" title={'Login, ' + this.props.user}>
              <MenuItem eventKey="editColumn">Edit Column</MenuItem>
              <MenuItem eventKey="editFloors">Edit Floors</MenuItem>
              <MenuItem eventKey="optimizer">Staff Optimizer</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="pref">Preference</MenuItem>
              <MenuItem eventKey="login">Log Out</MenuItem>
            </DropdownButton>

          </Nav>
        <EditColumn />
        </Navbar>
      );

    return (
      navbarInstance
    );
  }

});

module.exports = HeaderMain;
