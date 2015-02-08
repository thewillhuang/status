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
  order: {
   type: Number,
   default: 0
  },
  data: Schema.Types.Mixed,
  updated: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  history: {
    type: String,
    default: ''
  },
  updateBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Record', RecordSchema);
