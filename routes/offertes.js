var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Offerte = require('../models/Offerte.js');

/* GET ALL OFFERTES */
router.get('/', function(req, res, next) {
  Offerte.find(function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET ALL OFFERTES POPULATED */
router.get('/populated', function(req, res, next) {
  Offerte.find({}).populate({
    path: 'HoofdCategorieen',
    populate: {
      path: 'SubCategorieen',
      populate: {
        path: 'Producten'
      }
    }
  }).exec(function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE OFFERTE BY ID */
router.get('/:id', function(req, res, next) {
  Offerte.findById(req.params.id, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE OFFERTE BY ID POPULATED */
router.get('/:id/populated', function(req, res, next) {
  Offerte.findById(req.params.id).populate({
    path: 'HoofdCategorieen',
    populate: {
      path: 'SubCategorieen',
      populate: {
        path: 'Producten'
      }
    }
  }).exec(function(err, data) {
      if (err) return next(err);
      res.json(data);
  });
});

/* SAVE OFFERTE */
router.post('/', function(req, res, next) {
  Offerte.create(req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* UPDATE OFFERTE */
router.put('/:id', function(req, res, next) {
  Offerte.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* DELETE OFFERTE */
router.delete('/:id', function(req, res, next) {
  Offerte.findByIdAndRemove(req.params.id, req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

module.exports = router;