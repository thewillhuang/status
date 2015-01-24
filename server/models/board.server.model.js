'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BoardSchema = new Schema({
  room: {
    type: Number
  },
  ptName: {
    type: String
  },
  mdName: {
    type: String
  },
  rnName: {
    type: String
  },
  cnaName: {
    type: Number
  },
  codeStatus: {
    type: String
  },
  isolation: {
    type: String
  },
  misc: {
    type: String
  },
  acuity: {
    type: Number
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Board', BoardSchema);
