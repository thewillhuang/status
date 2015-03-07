'use strict';

// react components
var TableBox = require('./bedStatusView.jsx');
var HeaderMain = require('./headerView.jsx');
var React = require('react');
window.React = React;

// for ReactRouter
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// data.json
var data  = require('../data/data.json');
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

// React.render(<MainView tableData={data} headerData={headerData}/>, document.getElementById('reactRoot'));


var MedSurg = React.createClass({
  render: function(){
    return <h1>Med Surg</h1>
  }
});

var ICU = React.createClass({
  render: function(){
    return <h1>ICU</h1>
  }
});

var Telemetry = React.createClass({
  render: function(){
    return <h1>Telemetry</h1>
  }
});

var Rehab = React.createClass({
  render: function(){
    return <h1>Rehab</h1>
  }
});


var routes = (
  <Route name="megsurg" path="/" handler={HeaderMain}>
    <Route name="icu" handler={ICU}/>
    <Route name="telemetry" handler={Telemetry}/>
    <Route name="rehab" handler={Rehab}/>
    <DefaultRoute handler={MedSurg}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
  // React.render(<MainView tableData={data} headerData={headerData}/>, document.getElementById('reactRoot'));
});