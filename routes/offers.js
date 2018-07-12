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

/* GET ALL CATEGORIES OF OFFER BY ID */
router.get('/:id/categories', function(req, res, next) {
  Offer.findById(req.params.id).populate({
    path: 'Categories'
  }).exec(function(err, data) {
    if (err) return next(err);
    res.json(data.Categories);
  });
});

/* GET ALL PRODUCTGROUPS OF ALL CATEGORIES OF OFFER BY ID */
router.get('/:id/categories/productgroups', function(req, res, next) {
  Offer.findById(req.params.id).populate({
    path: 'Categories',
    populate: {
      path: 'ProductGroups'
    }
  }).exec(function(err, data) {
    if (err) return next(err);
    
    var productGroups = [];
    for (var i = data.Categories.length - 1; i >= 0; i--) {
      for (var y = data.Categories[i].ProductGroups.length - 1; y >= 0; y--) {
        productGroups.push(data.Categories[i].ProductGroups[y]);
      }
    }

    res.json(productGroups);
  });
});

/* GET ALL PRODUCTS OF ALL PRODUCTGROUPS OF ALL CATEGORIES OF OFFER BY ID */
router.get('/:id/categories/productgroups/products', function(req, res, next) {
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
    
    var products = [];
    for (var i = data.Categories.length - 1; i >= 0; i--) {
      for (var y = data.Categories[i].ProductGroups.length - 1; y >= 0; y--) {
        for (var z = data.Categories[i].ProductGroups[y].Products.length - 1; z >= 0; z--) {
          products.push(data.Categories[i].ProductGroups[y].Products[z]);
        }
      }
    }

    res.json(products);
  });
});

module.exports = router;