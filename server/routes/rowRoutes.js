'use strict';
var Row = require('../model/rowModel.js');
var OldRow = require('../model/oldRowModel.js');

module.exports = function(app) {
  app
  // create a row
  .post('/row/', function(req, res) {
    var newRow = new Row({
      data: req.body
    });
    newRow.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  })

  // get all the rows with a given floorid
  .get('/table/init/:floorid', function(req, res) {
    Row
    .find({floorid: req.params.floorid}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      if (!data) return res.status(200).send('no data');
      if (data) res.json(data);
    });
  })

  // update a previous row given a unique id, and a body payload.
  .put('/row/:id', function(req, res) {
    Row
    .findOne({_id: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      if (!data) return res.status(200).send('no data');
      data.data = req.body;
      data.save(function(err, data) {
        if (err) return console.log(err);
        res.json(data);
      });
    });
  })

  // delete the row given the id && create it to oldRow database
  .delete('/row/:id', function(req, res) {
    Row
    .remove({_id: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      if (!data) return res.status(200).send('no data');
      var newOldRow = new OldRow({
        data: data
      });
      OldRow.save(function(err, data) {
        if (err) return res.status(500).send('there was an error');
        res.status(200).send(data);
      });
    });
  });
};
