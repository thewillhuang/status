'use strict';

var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Row = mongoose.model('Row'),
    _ = require('lodash');


/**
 * List of rows
 */
exports.list = function(req, res) {

  var floor = req.params.floor;
  var limit = req.params.limit;

  Row.find({'isActive':'true'}).and({'floor': floor}).sort('data.room').limit(limit).exec(function(err, rows) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(rows);
    }
  });
};

/**
 * Create a row
 */
exports.create = function(req, res) {
  var row = new Row(req.body);
  row.user = req.user;


  row.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(row);
    }
  });
};

/**
 * Update a row
 */
exports.update = function(req, res) {
  var row = req.row;

  row = _.extend(row, req.body);

  row.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(row);
    }
  });
};

/**
 * Row middleware
 */
exports.rowByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Row is invalid'
    });
  }

  Row.findById(id).populate('user', 'displayName').exec(function(err, row) {
    if (err) return next(err);
    if (!row) {
      return res.status(404).send({
          message: 'Row not found'
        });
    }
    req.row = row;
    next();
  });
};

/**
 * Row authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.row.user.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};

/**
 * Row Change Status
 */

 exports.changeStatus = function(req, res){
  var row = req.row;

  row = _.extend(row, req.body);

  row.isActive = false;
  row.data = "";
  row.order = 0;
  row.floor = 0;

  row.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(row);
    }
  });
 };

 /**
 * Row Search Query
 */

 exports.search = function(req, res){

  var roomNumber = parseInt(req.params.query);

  if (roomNumber) {

    Row.find({'data': { 'room': req.params.query}}).exec(function(err, rows) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(rows);
      }
    });
  } else {

    Row.find({'data': { 'Doctor Name': new RegExp(req.params.query, 'i')}}).exec(function(err, rows) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(rows);
      }
    });
  }


  Row.find({'data': { 'room': req.params.query}}).exec(function(err, rows) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(rows);
    }
  });
 };
