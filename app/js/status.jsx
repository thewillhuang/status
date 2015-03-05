'use strict';

// react components
var TableBox = require('./bedStatusView.jsx');
var HeaderMain = require('./headerView.jsx');

//superagent
var request = require('superagent');


// data.json
var data  = require('../data/data.json');
var headerData = require('../data/header.json');

var React = require('react');

var MainView = React.createClass({


  render: function() {
    return (
      <div>
        <HeaderMain tableData={this.props.tableData} headerData={this.props.headerData} />
      </div>
    );
  }

});

React.render(<MainView tableData={data} headerData={headerData}/>, document.getElementById('reactRoot'));
