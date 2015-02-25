'use strict';
var React = require('react');
var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var MenuItem = require('react-bootstrap/MenuItem');
var Input = require('react-bootstrap/Input');
var DropdownButton = require('react-bootstrap/DropdownButton');

var React = require('react');

var HeaderMain = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.floorName
    };
  },

  handleChange: function() {
    var value = this.refs.input.getInputDOMNode().value || null;
    this.setState({
      value: value
    });
  },

  render: function() {
    console.log(this.props.floors);
    var floors = this.props.floors.map(function(key, index){
      return (
        <MenuItem eventKey={index} key={key}>{key}</MenuItem>
        );
    });
    console.log(floors);
    var navbarInstance = (
        <Navbar>
          <Nav>
            <NavItem eventKey={0} href="#">
            <Input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            ref="input"
            className="floorNameInput" />
            </NavItem>
            <DropdownButton eventKey={1} title="Floors">
            {floors}
            </DropdownButton>
            <DropdownButton eventKey={2} title={'Welcome, ' + this.props.user}>
              <MenuItem eventKey="1">Edit Column</MenuItem>
              <MenuItem eventKey="2">Edit Floors</MenuItem>
              <MenuItem eventKey="3">Staff Optimizer</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="6">Preference</MenuItem>
              <MenuItem eventKey="7">Log In</MenuItem>
            </DropdownButton>
          </Nav>
        </Navbar>
      );
    return (
      navbarInstance
    );
  }

});

module.exports = HeaderMain;
