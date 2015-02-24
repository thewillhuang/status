'use strict';
var React = require('react');
var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var MenuItem = require('react-bootstrap/MenuItem');
var DropdownButton = require('react-bootstrap/DropdownButton');

var React = require('react');

var HeaderMain = React.createClass({

  render: function() {
    var navbarInstance = (
        <Navbar>
          <Nav>
            <NavItem>
            <input type="text" value="floor name" className="floorNameInput" />
            </NavItem>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <DropdownButton eventKey={3} title="Dropdown">
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
