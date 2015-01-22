'use strict';

var compression = require('compression');
var express     = require('express');
var app         = express();
var port        = process.env.PORT || 3000;
var bodyparser  = require('body-parser');
var path        = __dirname + '/build/';
// var mongoose    = require('mongoose');
// var uriUtil     = require('mongodb-uri');
// var options     = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//                     replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
// var mongodbUri  = process.env.MONGOLAB_URI;
// var mongooseUri = uriUtil.formatMongoose(mongodbUri);

// mongoose.connect(process.env.MONGO_URL || mongooseUri || 'mongodb://localhost/q_dev', options);

app.use(bodyparser.json());
app.set('json spaces', 2);
app.set('etag', 'weak');
app.use(compression());
app.use(express.static(path));

// app.use(function(req, res, next) {
//   console.log(req.method, req.url, req.body);
//   next();
// });

//routes

app.listen(port);
console.log('server started at', port);
