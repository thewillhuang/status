'use strict';
// react components
var TableBox = require('./bedStatusView.jsx');
var HeaderMain = require('./headerView.jsx');

// data.json
var data  = require('../data/data.json');

//react router components
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

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
