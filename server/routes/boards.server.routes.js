'use strict';

var users = require('../../server/controllers/users.server.controller'),
    boards = require('../../server/controllers/boards.server.controller');

module.exports = function(app) {
  // Board Routes
  app.route('/boards')
    .get(boards.list)
    .post(boards.create);

    // temporality comment out login required
    // .post(users.requiresLogin, boards.create);

  app.route('/boards/:boardId')
    .get(boards.read)
    .put(boards.update)
    .delete(boards.delete);

    // temporality comment out login required
    // .put(users.requiresLogin, boards.hasAuthorization, boards.update)
    // .delete(users.requiresLogin, boards.hasAuthorization, boards.delete);

  // Finish by binding the board middleware
  app.param('boardId', boards.boardByID);
};
