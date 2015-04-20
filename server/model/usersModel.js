'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userName: String,
  fName: String,
  lName: String,
  mName: String,
  passwordHash: String,
  role: String,
  scope: [String]
});

var User = mongoose.model('Users', userSchema);
