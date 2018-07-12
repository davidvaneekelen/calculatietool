var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = require('../models/Category.js');

/* GET ALL CATEGORIES */
router.get('/', function(req, res, next) {
  Category.find(function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET ALL CATEGORIES POPULATED*/
router.get('/populated', function(req, res, next) {
  Category.find({}).populate({
    path: 'ProductGroups',
    populate: {path: 'Products'}
  }).exec(function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE CATEGORY BY ID */
router.get('/:id', function(req, res, next) {
  Category.findById(req.params.id, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE CATEGORY BY ID POPULATED */
router.get('/:id/populated', function(req, res, next) {
  Category.findById(req.params.id).populate({
    path: 'ProductGroups',
    populate: {path: 'Products'}
  }).exec(function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* SAVE CATEGORY */
router.post('/', function(req, res, next) {
  Category.create(req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* UPDATE CATEGORY */
router.put('/:id', function(req, res, next) {
  Category.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* DELETE CATEGORY */
router.delete('/:id', function(req, res, next) {
  Category.findByIdAndRemove(req.params.id, req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

module.exports = router;