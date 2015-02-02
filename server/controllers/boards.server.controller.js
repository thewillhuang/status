'use strict';

var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Board = mongoose.model('Board'),
    _ = require('lodash');

/**
 * Create a board
 */
exports.create = function(req, res) {
  console.log('this is the req', req.body);
  var board = new Board(req.body);
  board.user = req.user;


  board.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(board);
    }
  });
};

/**
 * Show the current board
 */
exports.read = function(req, res) {
  res.json(req.board);
};

/**
 * Update a board
 */
exports.update = function(req, res) {
  var board = req.board;

  board = _.extend(board, req.body);

  board.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(board);
    }
  });
};

/**
 * Delete a board
 */
exports.delete = function(req, res) {
  var board = req.board;

  board.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(board);
    }
  });
};

/**
 * List of Boards
 */
exports.list = function(req, res) {
  Board.find({'isActive':'true'}).sort('-created').populate('user', 'displayName').exec(function(err, boards) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(boards);
    }
  });
};

/**
 * Board middleware
 */
exports.boardByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Board is invalid'
    });
  }

  Board.findById(id).populate('user', 'displayName').exec(function(err, board) {
    if (err) return next(err);
    if (!board) {
      return res.status(404).send({
          message: 'Board not found'
        });
    }
    req.board = board;
    next();
  });
};

/**
 * Board authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.board.user.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};
