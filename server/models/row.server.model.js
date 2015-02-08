'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RowSchema = new Schema({
  floor: {
    type: String,
    default: ''
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

mongoose.model('Row', RowSchema);
