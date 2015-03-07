'use strict';

var React = require('react');
var vow = require('vow');
var request = require('superagent');
var Input = require('react-bootstrap/lib/Input');
var Glyphicon = require('react-bootstrap/lib/glyphicon');

var  SearchInput= React.createClass({

  getInitialState: function(){
    return {
      value:""
    };
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

    this.debouncedChange(value).then(function(result){

      var sendRequest = function() {
        request
        .post('/search/' + value)
        .end(function(error, res){
          // console.log(error);
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
          value={this.state.value}
          ref="search"
          addonAfter={<Glyphicon glyph="search" />} />
      </div>
    );
  }

});

module.exports = SearchInput;
