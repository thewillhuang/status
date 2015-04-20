'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var headerSchema = new Schema({
  updated: { type: Date, default: Date.now },
  name: String,
  view: String,
  tableid: String,
});

module.exports = mongoose.model('Header', headerSchema);
