'use strict';

var users = require('../../server/controllers/users.server.controller'),
    rows = require('../../server/controllers/rows.server.controller');

module.exports = function(app) {
  // Row Routes
  app.route('/rows')
    .get(rows.list) // pull all isActive data
    .post(rows.create); // post route to update a new row given a specific JSON data

    // temporality comment out login required
    // .post(users.requiresLogin, rows.create);

  app.route('/rows/:rowId')
    .get(rows.read)
    .put(rows.update) // update a row
    .delete(rows.delete);

    // temporality comment out login required
    // .put(users.requiresLogin, rows.hasAuthorization, rows.update)
    // .delete(users.requiresLogin, rows.hasAuthorization, rows.delete);

  // Finish by binding the row middleware
  app.param('rowId', rows.rowByID);
};
