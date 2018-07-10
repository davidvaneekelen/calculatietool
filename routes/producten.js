var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product.js');

/* GET ALL PRODUCTEN */
router.get('/', function(req, res, next) {
  Product.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE PRODUCT BY ID */
router.get('/:id', function(req, res, next) {
  Product.findById(req.params.id, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* SAVE PRODUCT */
router.post('/', function(req, res, next) {
  Product.create(req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* UPDATE PRODUCT */
router.put('/:id', function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* DELETE PRODUCT */
router.delete('/:id', function(req, res, next) {
  Product.findByIdAndRemove(req.params.id, req.body, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

module.exports = router;