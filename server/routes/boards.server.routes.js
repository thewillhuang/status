'use strict';

var users = require('../../server/controllers/users.server.controller'),
    boards = require('../../server/controllers/boards.server.controller');

module.exports = function(app) {
  // Board Routes
  app.route('/boards')
    .get(boards.list)
    .post(users.requiresLogin, boards.create);

  app.route('/boards/:boardId')
    .get(boards.read)
    .put(users.requiresLogin, boards.hasAuthorization, boards.update)
    .delete(users.requiresLogin, boards.hasAuthorization, boards.delete);

  // Finish by binding the board middleware
  app.param('boardId', boards.boardByID);
};
