var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Offer = require('../models/Offer.js');
var Category = require('../models/Category.js');
var ProductGroup = require('../models/ProductGroup.js');
var Product = require('../models/Product.js');

router.get('/', function(req, res, next) {
	
	// Create IP Camera Products
	Product.create([{
		brand: 'Dahua',
		model: 'DH-IPC-HFW2231TP-ZS',
		properties: ['Bullet', 'Starlight', 'VariFocal', 'SNMP', '2MP', 'PoE'],
		purchasePrice: 235,
		sellingPrice: 308,
		articleNumber: '20320316',
		supplier: 'www.smartsd.com'
	}, {
		brand: 'Dahua',
		model: 'DH-SD65F230F-HNI',
		properties: ['PTZ', 'Dome', 'Starlight', 'VariFocal', 'SNMP', '2MP', 'PoE+'],
		purchasePrice: 1000,
		sellingPrice: 1600,
		articleNumber: '20320149',
		supplier: 'www.smartsd.com'
	}], function(cameraProductErr, cameraProductObject) {
		if (cameraProductErr) return next(cameraProductErr);
		// Create Recorders + Schijven Products
		Product.create([{
			brand: 'Dahua',
			model: 'DHI-NVR4416-16P-4KS2',
			properties: ['Recorder', '16-kanaals', '16xPoE', 'SNMP', 'H.265'],
			purchasePrice: 700,
			sellingPrice: 896,
			articleNumber: '20320203',
			supplier: 'www.smartsd.com'
		}, {
			brand: 'WD',
			model: 'Purple WD40PURZ',
			properties: ['4TB'],
			purchasePrice: 100,
			sellingPrice: 160,
			articleNumber: 'WD40PURZ',
			supplier: 'www.update.nl'
		}], function(recorderProductErr, recorderProductObject) {
			if (recorderProductErr) return next(recorderProductErr);
			// Create Netwerk Toebehoren Products
			Product.create([{
				brand: 'TP-Link',
				model: 'TL-SG1008D',
				properties: ['8-Port', 'Unmanaged', 'Gigabit'],
				purchasePrice: 22,
				sellingPrice: 45,
				articleNumber: '257584',
				supplier: 'www.azerty.nl'
			}, {
				brand: 'TP-Link',
				model: 'Jetstream T1600G-28PS',
				properties: ['24-Port', 'Managed', 'Gigabit', 'PoE+', 'SNMP', '4xSFP'],
				purchasePrice: 250,
				sellingPrice: 350,
				articleNumber: 'T1600G-28PS',
				supplier: 'www.routershop.nl'
			}], function(networkProductErr, networkProductObject) {
				if (networkProductErr) return next(networkProductErr);
				// Create Bekabeling Products
				Product.create([{
					brand: 'Belden',
					model: 'CAT5e U/FTP per meter',
					purchasePrice: 0.70,
					sellingPrice: 1.70,
					articleNumber: 'CAT5EUTP',
					supplier: 'www.tue.nl'
				}, {
					brand: 'Plastico Fantastico',
					model: 'Installatiebuis 19mm (¾) per meter',
					purchasePrice: 1,
					sellingPrice: 2.20,
					articleNumber: 'INSTALLBUIS19MM',
					supplier: 'www.tue.nl'
				}, {
					brand: 'Plastico Fantastico',
					model: 'Installatiebuis Koppelingen',
					purchasePrice: 0.20,
					sellingPrice: 0.40,
					articleNumber: 'INSTALLKOPP19MM',
					supplier: 'www.tue.nl'
				}, {
					brand: 'Plastico Fantastico',
					model: 'Installatiebuis Bevestigingen',
					purchasePrice: 0.30,
					sellingPrice: 0.60,
					articleNumber: 'INSTALLBVST19MM',
					supplier: 'www.tue.nl'
				}, {
					brand: 'Belden',
					model: 'UTP RJ45 Connector',
					purchasePrice: 0.45,
					sellingPrice: 0.85,
					articleNumber: 'UTPRJ45CONN',
					supplier: 'www.tue.nl'
				}], function(wiringProductErr, wiringProductObject) {
					if (wiringProductErr) return next(wiringProductErr);
					// Create Arbeid 'Products'
					Product.create([{
						brand: 'Doevendans Beveiliging',
						model: 'Installatiewerk',
						purchasePrice: 25,
						sellingPrice: 45,
						articleNumber: 'CAM-INSTALL',
						supplier: 'nvt'
					}, {
						brand: 'Doevendans Beveiliging',
						model: 'Montagewerk',
						purchasePrice: 25,
						sellingPrice: 65,
						articleNumber: 'CAM-MONTAGE',
						supplier: 'nvt'
					}, {
						brand: 'Doevendans Beveiliging',
						model: 'Programmeerwerk',
						purchasePrice: 25,
						sellingPrice: 85,
						articleNumber: 'CAM-PROGRAM',
						supplier: 'nvt'
					}, {
						brand: 'Doevendans Beveiliging',
						model: 'Documenteerwerk',
						purchasePrice: 25,
						sellingPrice: 45,
						articleNumber: 'CAM-DOCUMEN',
						supplier: 'nvt'
					}], function(labourProductErr, labourProductObject) {
						if (labourProductErr) return next(labourProductErr);
						// Create Cameratoezicht ProductGroup
						ProductGroup.create([{
							name: 'Camera\'s',
							Products: cameraProductObject
						}, {
							name: 'Recorders + Schijven',
							Products: recorderProductObject
						}, {
							name: 'Netwerk Toebehoren',
							Products: networkProductObject
						}, {
							name: 'Bekabeling',
							Products: wiringProductObject
						}, {
							name: 'Arbeid',
							Products: labourProductObject
						}], function(camProductGroupErr, camProductGroupObject) {
							if (camProductGroupErr) return next(camProductGroupErr);
							// Create Cameratoezicht Hoofdcategorie
							Category.create({
								name: 'Cameratoezicht',
								ProductGroups: camProductGroupObject
							}, function(camCategoryErr, camCategoryObject) {
								if (camCategoryErr) return next(camCategoryErr);
								// Create Offerte entry
								Offer.create({
									customer: 'Washin7 Nijmegen',
									address: 'Hoofdstraat 1',
									postalCode: '1234AB',
									city: 'Nijmegen',
									phone: '01-23456789',
									email: 'nijmegen@washin7.nl',
									project: '2018-045',
									Categories: camCategoryObject
								}, function(err, data) {
									if (err) return next(err);
									res.json(data);
								});
							});
						});
					});
				});
			});
		});
	});
});

router.delete('/', function(req, res, next) {
	// Keep track of what's deleted and what not
	var results = {
		product: null,
		productgroup: null,
		category: null,
		offer: null
	}
	// Delete all Products
	Product.remove({}, function(errProduct, dataProduct) {
		if (errProduct) {
			results.product = errProduct;
		} else {
			results.product = 'success';

			// Delete all SubCategorieën
			ProductGroup.remove({}, function(errProductGroup, dataProductGroup) {
				if (errProductGroup) {
					results.productgroup = errProductGroup;
				} else {
					results.productgroup = 'success';

					// Delete all HoofdCategorieën
					Category.remove({}, function(errCategory, dataCategory) {
						if (errCategory) {
							results.category = errCategory;
						} else {
							results.category = 'success';

							// Delete all Offertes
							Offer.remove({}, function(errOffer, dataOffer) {
								if (errOffer) {
									results.offer = errOffer;
								} else {
									results.offer = 'success';
									res.json(results);
								}
							});
						}
					});
				}
			});
		}
	});
});

module.exports = router;