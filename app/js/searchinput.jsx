'use strict';
var vow = require('vow');
var React = require('react');
var request = require('superagent');
var Input = require('react-bootstrap/lib/Input');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var mockdata2  = require('../data/data.json');

var SearchInput = React.createClass({

  sendSearchData: function(array) {
    var searchEvent = new CustomEvent('tableData', {
      detail: array
    });

    window.dispatchEvent(searchEvent);
  },

  getInitialState: function(){
    return {
      value:""
    };
  },

  handleFocus: function() {
    var element = this.refs.search.getInputDOMNode();
    setTimeout(function() {
      element.select();
      }, 0);
  },

  debouncedChange: function (name) {
    var dfd = vow.defer();

    var timerId = this.timerId;
    var self = this;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout((function (innerName) {
      return function () {
        dfd.resolve(innerName);
      };
    })(name), 1000);
    this.timerId = timerId;

    return dfd.promise();
  },

  handleChange: function() {
    var value = this.refs.search.getInputDOMNode().value || null;
    var sendData = this.sendSearchData;

    this.debouncedChange(value).then(function(result){

      var sendRequest = function() {
        var searchResponseData;
        request
        .get('/search/' + value)
        .end(function(error, res){
          if (error) {
            console.log(error);
          }
          console.log(res.body);
          //mocking data
          searchResponseData = res.body || mockdata2;
          // console.log(searchResponseData);
          sendData(searchResponseData);
        });
      };

      sendRequest();

    });

    this.setState({
      value: value
    });

  },

  render: function() {
    return (
      <div>
        <Input type="text"
          className="search-query form-control"
          placeholder="Search Doctor or patient"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          value={this.state.value}
          ref="search"
          addonAfter={<Glyphicon glyph="search" />} />
      </div>
    );
  }

});

module.exports = SearchInput;
