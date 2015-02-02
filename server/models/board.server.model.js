'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BoardSchema = new Schema({
  floor: String,
  order: Number,
  data: Schema.Types.Mixed,
  updated: {type: Date, default: Date.now},
  isActive: Boolean,
  history: String,
  updateBy: String
});

mongoose.model('Board', BoardSchema);
