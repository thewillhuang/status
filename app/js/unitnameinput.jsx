'use strict';
var React = require('react');
var vow = require('vow');
var request = require('superagent');
var Input = require('react-bootstrap/lib/Input');
var Glyphicon = require('react-bootstrap/lib/glyphicon');

var UnitNameInput = React.createClass({

  getInitialState: function() {
    // console.log(this.props);
    return {
      value: this.props.unitName
    };
  },

  componentDidUpdate: function(){
    this.setState({
      value: this.props.unitName
    });
  },

  //debounced to send the post request when changes are finished
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
    var value = this.refs.unit.getInputDOMNode().value || null;
    var obj = {};
    var id = this.props.id;

    this.debouncedChange(value).then(function(result){

      var sendRequest = function() {
        obj.unit = result;
        // console.log(obj);
        request
        .post('/unit/' + id)
        .send(obj)
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

  handleFocus: function() {
    this.refs.unit.getInputDOMNode().select();
  },

  render: function() {
    return (
      <div className="floornamewrapper">
        <Input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          ref="unit"
          className="floorNameInput" />
      </div>
    );
  }

});

module.exports = UnitNameInput;
