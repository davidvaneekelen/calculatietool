var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var HoofdCategorie = require('../models/HoofdCategorie.js');

/* GET ALL HOOFDCATEGORIEEN */
router.get('/', function(req, res, next) {
  HoofdCategorie.find(function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET ALL HOOFDCATEGORIEEN POPULATED*/
router.get('/populated', function(req, res, next) {
  HoofdCategorie.find({}).populate({
    path: 'SubCategorieen',
    populate: {path: 'Producten'}
  }).exec(function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE HOOFDCATEGORIE BY ID */
router.get('/:id', function(req, res, next) {
  HoofdCategorie.findById(req.params.id, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE HOOFDCATEGORIE BY ID POPULATED */
router.get('/:id/populated', function(req, res, next) {
  HoofdCategorie.findById(req.params.id).populate({
    path: 'SubCategorieen',
    populate: {path: 'Producten'}
  }).exec(function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* SAVE HOOFDCATEGORIE */
router.post('/', function(req, res, next) {
  HoofdCategorie.create(req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* UPDATE HOOFDCATEGORIE */
router.put('/:id', function(req, res, next) {
  HoofdCategorie.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* DELETE HOOFDCATEGORIE */
router.delete('/:id', function(req, res, next) {
  HoofdCategorie.findByIdAndRemove(req.params.id, req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

module.exports = router;