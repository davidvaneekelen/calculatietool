var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProductGroup = require('../models/ProductGroup.js');

/* GET ALL PRODUCTGROUPS */
router.get('/', function(req, res, next) {
  ProductGroup.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET ALL PRODUCTGROUPS POPULATED*/
router.get('/populated', function(req, res, next) {
  ProductGroup.find({}).populate({
    path: 'Products'
  }).exec(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE PRODUCTGROUP BY ID */
router.get('/:id', function(req, res, next) {
  ProductGroup.findById(req.params.id, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE PRODUCTGROUP BY ID POPULATED */
router.get('/:id/populated', function(req, res, next) {
  ProductGroup.findById(req.params.id).populate({
    path: 'Products'
  }).exec(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* SAVE PRODUCTGROUP */
router.post('/', function(req, res, next) {
  ProductGroup.create(req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* UPDATE PRODUCTGROUP */
router.put('/:id', function(req, res, next) {
  ProductGroup.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* DELETE PRODUCTGROUP */
router.delete('/:id', function(req, res, next) {
  ProductGroup.findByIdAndRemove(req.params.id, req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET ALL PRODUCTS OF PRODUCTGROUP BY ID */
router.get('/:id/products', function(req, res, next) {
  console.log('HOIIII');
  ProductGroup.findById(req.params.id).populate({
    path: 'Products'
  }).exec(function(err, data) {
    if (err) return next(err);
    res.json(data.Products);
  });
});

module.exports = router;