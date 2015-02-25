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
            <NavItem eventKey={1} href="#">Floors</NavItem>
            <DropdownButton eventKey={3} title={'Welcome, ' + this.props.user}>
              <MenuItem eventKey="1">Action</MenuItem>
              <MenuItem eventKey="2">Another action</MenuItem>
              <MenuItem eventKey="3">Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">Separated link</MenuItem>
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
