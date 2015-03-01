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

var HeaderMain = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.floorName
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
    var floors = this.props.floors.map(function(key, index){
      // console.log(key);
      return (
        <MenuItem
        eventKey={index} key={key} > {key} </MenuItem>
        );
    });
    var navbarInstance = (
        <Navbar toggleNavKey={0} defaultNavExpanded={false}>
          <Nav right eventKey={0}>
            <NavItem eventKey={1} href="#">
              <Input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              ref="input"
              className="floorNameInput" />
            </NavItem>

            <DropdownButton eventKey={2} title="Floors">
              {floors}
            </DropdownButton>

            <DropdownButton eventKey={3} title={'Welcome, ' + this.props.user}>
              <MenuItem eventKey="1">Edit Column</MenuItem>
              <MenuItem eventKey="2">Edit Floors</MenuItem>
              <MenuItem eventKey="3">Staff Optimizer</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="6">Preference</MenuItem>
              <MenuItem eventKey="7">Log In</MenuItem>
            </DropdownButton>

            <NavItem eventKey={4}>
              <input type="search" placeholder="search" />
              <span className="glyphicon glyphicon-search"></span>
            </NavItem>

          </Nav>
        </Navbar>
      );

    return (
      navbarInstance
    );
  }

});

module.exports = HeaderMain;
