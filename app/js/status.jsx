'use strict';

// react components
var TableBox = require('./bedStatusView.jsx');
var HeaderMain = require('./headerView.jsx');
var 
var request = require('superagent');


// data.json
var data  = require('../data/data.json');

var React = require('react');

var MainView = React.createClass({


  render: function() {
    return (
      <div>
        <HeaderMain floorName={this.props.floorName} floors={this.props.floors} user={this.props.user} id={this.props.id} />
        <TableBox data={this.props.data} />
      </div>
    );
  }

});

React.render(<MainView data={data} floors={['Floor 1', 'Floor 2', 'Floor 3']} floorName={'Med Surg'} id={['54aa32abe8beb379bfdffloorid1','54aa32abe8beb379bfdffloorid2','54aa32abe8beb379bfdffloorid3']} user={'User'}/>, document.getElementById('reactRoot'));
