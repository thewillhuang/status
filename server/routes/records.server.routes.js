'use strict';

/**
 * Module dependencies.
 */
var users = require('../../server/controllers/users.server.controller'),
  records = require('../../server/controllers/records.server.controller');

module.exports = function(app) {
  // record Routes
  app.route('/records')
    .get(records.list)
    .post(records.create);

  app.route('/records/:recordId')
    .get(records.read)
    .put(records.update)
    .delete(records.delete);

    // with authorization
    // .put(users.requiresLogin, records.hasAuthorization, records.update)
    // .delete(users.requiresLogin, records.hasAuthorization, records.delete);

  // get route to return an array of json given a string of search query, data.key, limit
  app.route('/search/:key/:query/:page').get(records.search);

  // Finish by binding the record middleware
  app.param('recordId', records.recordByID);
};
