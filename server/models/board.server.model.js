'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BoardSchema = new Schema({
  floor: {
    type: String,
    default: ''
  },
  order: {
   type: Number
  },
  data: Schema.Types.Mixed,
  updated: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: ''
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

mongoose.model('Board', BoardSchema);
