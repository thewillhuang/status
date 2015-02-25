'use strict';
var TableBox = require('./bedStatusView.jsx');
var HeaderMain = require('./headerView.jsx');
var data  = require('../data/data.json');


var React = require('react');

var MainView = React.createClass({

  render: function() {
    // console.log(this.props.data);
    return (
      <div>
        <HeaderMain floorName={this.props.floorName} user={this.props.user} />
        <TableBox data={this.props.data} />
      </div>
    );
  }

});

React.render(<MainView data={data} floorName={'Med Surg'} user={'User'}/>, document.getElementById('reactRoot'));
