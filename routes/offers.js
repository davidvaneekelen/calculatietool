var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Offer = require('../models/Offer.js');
var excel = require('exceljs');

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

/* EXPORT OFFER BY ID TO EXCEL DOCUMENT */
router.get('/:id/excel', function(req, res, next) {
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
      if (!data) return res.json({'ERROR': 'Offer with ID ' + req.params.id + ' not found.'});

      // Crafting the Excel file
      var workbook = new excel.Workbook();
      workbook.creator = 'Doevendans Beveiliging';
      workbook.created = new Date(Date.now());

      // Creating a Workbook
      var sheet = workbook.addWorksheet('Offerte', {
        pageSetup: { paperSize: 9, orientation: 'landscape' }
      });

      // Manually counting rows
      var rows = 1;

      // Loop through all Categories in this Offer
      for (var i = data.Categories.length - 1; i >= 0; i--) {

        // Merge top cells and display Category name
        sheet.mergeCells('A' + rows + ':L' + rows);
        sheet.getCell('A' + rows).value = data.Categories[i].name;
        rows++;
        
        // Loop through all ProductGroups within this Category
        for (var j = data.Categories[i].ProductGroups.length - 1; j >= 0; j--) {

          // Merge cells and display ProductGroup name
          sheet.mergeCells('A' + rows + ':L' + rows);
          sheet.getCell('A' + rows).value = data.Categories[i].ProductGroups[j].name;
          rows++;

          // Format table header for the Products
          // Column 'aantal'
          sheet.mergeCells('A' + rows + ':A' + (rows+1));
          sheet.getCell('A' + rows).value = "Aantal";

          // Column 'Merk  + Model'
          sheet.mergeCells('B' + rows + ':E' + (rows+1));
          sheet.getCell('B' + rows).value = "Merk + Model";

          // Top-Column Prices
          sheet.mergeCells('F' + rows + ':G' + rows);
          sheet.getCell('F' + rows).value = "Prijzen"

          // Sub-Column Prices
          sheet.getCell('F' + (rows+1)).value = "Inkoop";
          sheet.getCell('G' + (rows+1)).value = "Verkoop";

          // Top-Column Price Margins
          sheet.mergeCells('H' + rows + ':I' + rows);
          sheet.getCell('H' + rows).value = "Marges"

          // Sub-Column Price Margins
          sheet.getCell('H' + (rows+1)).value = "%";
          sheet.getCell('I' + (rows+1)).value = "€";

          // Top-Column SubTotals
          sheet.mergeCells('J' + rows + ':L' + rows);
          sheet.getCell('J' + rows).value = "Subtotalen";

          // Sub-Column SubTotals
          sheet.getCell('J' + (rows+1)).value = "Inkoop";
          sheet.getCell('K' + (rows+1)).value = "Verkoop";
          sheet.getCell('L' + (rows+1)).value = "Winst";

          rows +=2;

          // Loop through all Products within this ProductGroup
          for (var k = data.Categories[i].ProductGroups[j].Products.length - 1; k >= 0; k--) {
            var prd = data.Categories[i].ProductGroups[j].Products[k];

            // Fill row with Product details
            // Amount
            sheet.getCell('A' + rows).value = prd.amount;
            
            // Brand + Model
            sheet.mergeCells('B' + rows + ':E' + rows);
            sheet.getCell('B' + rows).value = prd.brand + " " + prd.model;

            // Prices
            sheet.getCell('F' + rows).value = '€ ' + prd.purchasePrice;
            sheet.getCell('G' + rows).value = '€ ' + prd.sellingPrice;

            // Margins
            sheet.getCell('H' + rows).value = (((100/prd.purchasePrice) * prd.sellingPrice) - 100) + ' %';
            sheet.getCell('I' + rows).value = '€ ' + (prd.sellingPrice - prd.purchasePrice);

            // Subtotals
            var subTotalPurchasePrice = prd.amount * prd.purchasePrice;
            var subTotalSellingPrice = prd.amount * prd.sellingPrice;
            sheet.getCell('J' + rows).value = '€ ' + subTotalPurchasePrice;
            sheet.getCell('K' + rows).value = '€ ' + subTotalSellingPrice;
            sheet.getCell('L' + rows).value = '€ ' + (subTotalSellingPrice - subTotalPurchasePrice);

            rows++;
          }

          // Extra empty line
          rows++;
        }
      }

      workbook.xlsx.writeFile('./excel/' + Date.now() + ' ' + data.customer + ' - ' + data.project + '.xlsx')
        .then(function() {
          res.json({'hoi': 'hoi'});
        });
  });
});

module.exports = router;