'use strict';
var Header = require('../model/headerModel.js');

module.exports = function(app) {
  app
  // create a header
  .get('/header', function(req, res){
    res.send('hi');
  })

  .post('/header/:name/:tableid/:view', function(req, res) {
    var newHeader = new Header({
      name: req.params.name,
      view: req.params.view,
      tableid: req.params.tableid
    });
    newHeader.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  })

  // get all the headers
  .get('/header/init', function(req, res) {
    console.log('got header/init');
    Header
    .find({}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      if (!data) return res.status(200).send('no data');
      if (data) res.json(data);
    });
  })

  // update a previous header given a unique id, body payload of {name:"string",tableid:"string"}
  .put('/header/:id', function(req, res) {
    Header
    .findOne({_id: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      if (!data) return res.status(200).send('no data');
      data.name = req.body.name;
      data.tableid = req.body.tableid;
      data.save(function(err, data) {
        if (err) return console.log(err);
        res.json(data);
      });
    });
  })

  // delete the header given the id
  .delete('/comment/:id', function(req, res) {
    Comment
    .remove({_id: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      if (!data) return res.status(200).send('no data');
    });
  });
};
