'use strict';

// react components
var TableBox = require('./bedStatusView.jsx');
var HeaderMain = require('./headerView.jsx');
var React = require('react');
var Select = require('react-select');

// data.json
var data  = require('../data/data.json');
var mockdata  = require('../data/mockdata2.json');
var headerData = require('../data/header.json');

var MainView = React.createClass({

  render: function() {
    return (
      <div>
        <HeaderMain tableData={this.props.tableData} headerData={this.props.headerData} />
      </div>
    );
  }

});

React.render(<MainView tableData={mockdata} headerData={headerData}/>, document.getElementById('reactRoot'));
