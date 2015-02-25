'use strict';
var TableBox = require('./bedStatusView.jsx');
var HeaderMain = require('./headerView.jsx');
var data  = require('../data/data.json');
var a11y = require('react-a11y');
var ENV = 'development';
if (ENV === 'development') a11y();


var React = require('react');

var MainView = React.createClass({

  render: function() {
    // console.log(this.props.data);
    return (
      <div>
        <HeaderMain floorName={this.props.floorName} floors={this.props.floors} user={this.props.user} />
        <TableBox data={this.props.data} />
      </div>
    );
  }

});

React.render(<MainView data={data} floors={['Floor 1', 'Floor 2', 'Floor 3']} floorName={'Med Surg'} user={'User'}/>, document.getElementById('reactRoot'));
