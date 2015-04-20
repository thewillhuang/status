'use strict';
var express = require('express');
var app = express();
var port = process.argv[2] || process.env.PORT || 3000;
var build = "/public";
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

//connect with mongoDB
mongoose.connect('mongodb://localhost/status');

//initiate morgan to do logging
app.use(logger('dev'));

//body parser for parsing jsons
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static server
app.use(express.static(__dirname + build));

var api = express.Router();
app.use('/api', api);

//routes
require('./server/routes/headerRoutes.js')(api);
require('./server/routes/rowRoutes.js')(api);
// require('./server/routes/userRoutes.js')(api);

app.listen(port);
console.log("server started listening on port %d", port);
