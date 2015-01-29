'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BoardSchema = new Schema({
  data: Schema.Types.Mixed,
  updated: {type: Date, default: Date.now},
  isActive: Boolean,
  history: String,
});

mongoose.model('Board', BoardSchema);
