'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
  records = require('../../app/controllers/records.server.controller');

module.exports = function(app) {
  // record Routes
  app.route('/records')
    .get(records.list)
    .post(records.create);

  app.route('/records/:recordId')
    .get(records.read)
    .put(users.requiresLogin, records.hasAuthorization, records.update)
    .delete(users.requiresLogin, records.hasAuthorization, records.delete);

  // Finish by binding the record middleware
  app.param('recordId', records.recordByID);
};
