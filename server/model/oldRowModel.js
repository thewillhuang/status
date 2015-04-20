'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rowSchema = new Schema({
  floorid: [Schema.Types.ObjectId],
  updated: { type: Date, default: Date.now },
  data: {},
  history: String
});

module.exports = mongoose.model('OldRow', rowSchema);
