var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Offerte = require('../models/Offerte.js');
var HoofdCategorie = require('../models/HoofdCategorie.js');
var SubCategorie = require('../models/SubCategorie.js');
var Product = require('../models/Product.js');

router.get('/', function(req, res, next) {
	
	// Create IP Camera Producten
	Product.create([{
		merk: 'Dahua',
		model: 'DH-IPC-HFW2231TP-ZS',
		eigenschappen: ['Bullet', 'Starlight', 'VariFocal', 'SNMP', '2MP', 'PoE'],
		inkoopprijs: 235,
		verkoopprijs: 308,
		artikelnummer: '20320316',
		leverancier: 'www.smartsd.com'
	}, {
		merk: 'Dahua',
		model: 'DH-SD65F230F-HNI',
		eigenschappen: ['PTZ', 'Dome', 'Starlight', 'VariFocal', 'SNMP', '2MP', 'PoE+'],
		inkoopprijs: 1000,
		verkoopprijs: 1600,
		artikelnummer: '20320149',
		leverancier: 'www.smartsd.com'
	}], function(err1, productObject) {
		if (err1) return next(err1);
		
		// Create Camera's SubCategorie
		SubCategorie.create({
			naam: 'Camera\'s',
			Producten: productObject
		}, function(err2, subcategorieObject) {
			if (err2) return next(err2);

			// Create Cameratoezicht HoofdCategorie
			HoofdCategorie.create({
				naam: 'Cameratoezicht',
				SubCategorieen: subcategorieObject
			}, function(err3, hoofdcategorieObject) {
				if (err3) return next(err3);

				// Create Offerte
				Offerte.create({
					klant: 'Washin7 Nijmegen',
					straathuisnummer: 'Hoofdstraat 1',
					postcode: '1234AB',
					plaats: 'Nijmegen',
					telefoon: '01-23456789',
					email: 'nijmegen@washin7.nl',
					project: '2018-045',
					HoofdCategorieen: hoofdcategorieObject
				}, function(err4, offerteObject) {
					res.json([offerteObject, hoofdcategorieObject, subcategorieObject, productObject]);
				});
			});
		});
	});
});

router.delete('/', function(req, res, next) {
	// Keep track of what's deleted and what not
	var results = {
		product: null,
		subcategorie: null,
		hoofdcategorie: null,
		offerte: null
	}
	// Delete all Products
	Product.remove({}, function(errProduct, dataProduct) {
		if (errProduct) {
			results.product = errProduct;
		} else {
			results.product = 'success';
		}
	});
	// Delete all SubCategorieën
	SubCategorie.remove({}, function(errSubcategorie, dataSubcategorie) {
		if (errSubcategorie) {
			results.subcategorie = errSubcategorie;
		} else {
			results.subcategorie = 'success'
		}
	});
	// Delete all HoofdCategorieën
	HoofdCategorie.remove({}, function(errHoofdcategorie, dataHoofdcategorie) {
		if (errHoofdcategorie) {
			results.hoofdcategorie = errHoofdcategorie;
		} else {
			results.hoofdcategorie = 'success';
		}
	});
	// Delete all Offertes
	Offerte.remove({}, function(errOfferte, dataOfferte) {
		if (errOfferte) {
			results.offerte = errOfferte;
		} else {
			results.offerte = 'success';
		}
	});

	res.json(results);
});

module.exports = router;