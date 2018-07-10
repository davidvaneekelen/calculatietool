var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SubCategorie = require('../models/SubCategorie.js');

/* GET ALL SUBCATEGORIEEN */
router.get('/', function(req, res, next) {
  SubCategorie.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET ALL SUBCATEGORIEEN POPULATED*/
router.get('/populated', function(req, res, next) {
  SubCategorie.find({}).populate({
    path: 'Producten'
  }).exec(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE SUBCATEGORIE BY ID */
router.get('/:id', function(req, res, next) {
  SubCategorie.findById(req.params.id, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE SUBCATEGORIE BY ID POPULATED */
router.get('/:id/populated', function(req, res, next) {
  SubCategorie.findById(req.params.id).populate({
    path: 'Producten'
  }).exec(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* SAVE SUBCATEGORIE */
router.post('/', function(req, res, next) {
  SubCategorie.create(req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* UPDATE SUBCATEGORIE */
router.put('/:id', function(req, res, next) {
  SubCategorie.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* DELETE SUBCATEGORIE */
router.delete('/:id', function(req, res, next) {
  SubCategorie.findByIdAndRemove(req.params.id, req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

module.exports = router;