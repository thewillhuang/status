'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Record Schema
 */
var RecordSchema = new Schema({
  floor: {
    type: String,
    default: ''
  },
  data: Schema.Types.Mixed,
  updated: {
    type: Date,
    default: Date.now
  },
  updateBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Record', RecordSchema);
