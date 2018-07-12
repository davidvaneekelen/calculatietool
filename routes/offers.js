var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Offer = require('../models/Offer.js');

/* GET ALL OfferS */
router.get('/', function(req, res, next) {
  Offer.find(function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET ALL OFFERS POPULATED */
router.get('/populated', function(req, res, next) {
  Offer.find({}).populate({
    path: 'Categories',
    populate: {
      path: 'ProductGroups',
      populate: {
        path: 'Products'
      }
    }
  }).exec(function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE OFFER BY ID */
router.get('/:id', function(req, res, next) {
  Offer.findById(req.params.id, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* GET SINGLE OFFER BY ID POPULATED */
router.get('/:id/populated', function(req, res, next) {
  Offer.findById(req.params.id).populate({
    path: 'Categories',
    populate: {
      path: 'ProductGroups',
      populate: {
        path: 'Products'
      }
    }
  }).exec(function(err, data) {
      if (err) return next(err);
      res.json(data);
  });
});

/* SAVE OFFER */
router.post('/', function(req, res, next) {
  Offer.create(req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* UPDATE OFFER */
router.put('/:id', function(req, res, next) {
  Offer.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* DELETE OFFER */
router.delete('/:id', function(req, res, next) {
  Offer.findByIdAndRemove(req.params.id, req.body, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

module.exports = router;