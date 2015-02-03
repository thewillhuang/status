'use strict';

var users = require('../../server/controllers/users.server.controller'),
    rows = require('../../server/controllers/rows.server.controller');

module.exports = function(app) {
  // Row Routes

  // get route to pull all isActive from a specific floor with params to limit by number,
  // sort by asending, pull from certain room order and up returns array of objects
  app.route('/rows/:floor/:limit').get(rows.list);

  // post route to update a row given a specific JSON.data
  app.route('/row/:rowId').put(rows.update);

  // post route to create a new row given a specific JSON.data
  app.route('/rows').post(rows.create);

  // post route to change a board's status from isActive true to false given an _id and
  // {history: String} returns a new row with the JSON.data same key but blank value
  app.route('/status/:rowId').post(rows.changeStatus);

  // get route to return an array of JSON given a String of search query on data.
  // example: "100" returns last 2 days, every single patient that was in room 100 and
  // their history, last update, and updated by who. "Paul Liu" returns any patient,
  // that has the name or Doctor of Paul Liu, any spelling variation not case sensitive
  app.route('/search/:key/:query/:page').get(rows.search);

  // Finish by binding the row middleware
  app.param('rowId', rows.rowByID);
};

// temporality comment out login required
// .post(users.requiresLogin, rows.create);
// .put(users.requiresLogin, rows.hasAuthorization, rows.update)
// .delete(users.requiresLogin, rows.hasAuthorization, rows.delete);
