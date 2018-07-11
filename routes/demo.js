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
	}], function(cameraProductErr, cameraProductObject) {
		if (cameraProductErr) return next(cameraProductErr);
		console.log('1');
		// Create Recorders + Schijven Producten
		Product.create([{
			merk: 'Dahua',
			model: 'DHI-NVR4416-16P-4KS2',
			eigenschappen: ['Recorder', '16-kanaals', '16xPoE', 'SNMP', 'H.265'],
			inkoopprijs: 700,
			verkoopprijs: 896,
			artikelnummer: '20320203',
			leverancier: 'www.smartsd.com'
		}, {
			merk: 'WD',
			model: 'Purple WD40PURZ',
			eigenschappen: ['4TB'],
			inkoopprijs: 100,
			verkoopprijs: 160,
			artikelnummer: 'WD40PURZ',
			leverancier: 'www.update.nl'
		}], function(recorderProductErr, recorderProductObject) {
			if (recorderProductErr) return next(recorderProductErr);
			console.log('2');
			// Create Netwerk Toebehoren Producten
			Product.create([{
				merk: 'TP-Link',
				model: 'TL-SG1008D',
				eigenschappen: ['8-Port', 'Unmanaged', 'Gigabit'],
				inkoopprijs: 22,
				verkoopprijs: 45,
				artikelnummer: '257584',
				leverancier: 'www.azerty.nl'
			}, {
				merk: 'TP-Link',
				model: 'Jetstream T1600G-28PS',
				eigenschappen: ['24-Port', 'Managed', 'Gigabit', 'PoE+', 'SNMP', '4xSFP'],
				inkoopprijs: 250,
				verkoopprijs: 350,
				artikelnummer: 'T1600G-28PS',
				leverancier: 'www.routershop.nl'
			}], function(networkProductErr, networkProductObject) {
				if (networkProductErr) return next(networkProductErr);
				console.log('3');
				// Create Bekabeling Producten
				Product.create([{
					merk: 'Belden',
					model: 'CAT5e U/FTP per meter',
					inkoopprijs: 0.70,
					verkoopprijs: 1.70,
					artikelnummer: 'CAT5EUTP',
					leverancier: 'www.tue.nl'
				}, {
					merk: 'Plastico Fantastico',
					model: 'Installatiebuis 19mm (¾) per meter',
					inkoopprijs: 1,
					verkoopprijs: 2.20,
					artikelnummer: 'INSTALLBUIS19MM',
					leverancier: 'www.tue.nl'
				}, {
					merk: 'Plastico Fantastico',
					model: 'Installatiebuis Koppelingen',
					inkoopprijs: 0.20,
					verkoopprijs: 0.40,
					artikelnummer: 'INSTALLKOPP19MM',
					leverancier: 'www.tue.nl'
				}, {
					merk: 'Plastico Fantastico',
					model: 'Installatiebuis Bevestigingen',
					inkoopprijs: 0.30,
					verkoopprijs: 0.60,
					artikelnummer: 'INSTALLBVST19MM',
					leverancier: 'www.tue.nl'
				}, {
					merk: 'Belden',
					model: 'UTP RJ45 Connector',
					inkoopprijs: 0.45,
					verkoopprijs: 0.85,
					artikelnummer: 'UTPRJ45CONN',
					leverancier: 'www.tue.nl'
				}], function(wiringProductErr, wiringProductObject) {
					if (wiringProductErr) return next(wiringProductErr);
					console.log('4');
					// Create Arbeid 'Producten'
					Product.create([{
						merk: 'Doevendans Beveiliging',
						model: 'Installatiewerk',
						inkoopprijs: 25,
						verkoopprijs: 45,
						artikelnummer: 'CAM-INSTALL',
						leverancier: 'nvt'
					}, {
						merk: 'Doevendans Beveiliging',
						model: 'Montagewerk',
						inkoopprijs: 25,
						verkoopprijs: 65,
						artikelnummer: 'CAM-MONTAGE',
						leverancier: 'nvt'
					}, {
						merk: 'Doevendans Beveiliging',
						model: 'Programmeerwerk',
						inkoopprijs: 25,
						verkoopprijs: 85,
						artikelnummer: 'CAM-PROGRAM',
						leverancier: 'nvt'
					}, {
						merk: 'Doevendans Beveiliging',
						model: 'Documenteerwerk',
						inkoopprijs: 25,
						verkoopprijs: 45,
						artikelnummer: 'CAM-DOCUMEN',
						leverancier: 'nvt'
					}], function(labourProductErr, labourProductObject) {
						if (labourProductErr) return next(labourProductErr);
						console.log('5');
						// Create Cameratoezicht SubCategorieën
						SubCategorie.create([{
							naam: 'Camera\'s',
							Producten: cameraProductObject
						}, {
							naam: 'Recorders + Schijven',
							Producten: recorderProductObject
						}, {
							naam: 'Netwerk Toebehoren',
							Producten: networkProductObject
						}, {
							naam: 'Bekabeling',
							Producten: wiringProductObject
						}, {
							naam: 'Arbeid',
							Producten: labourProductObject
						}], function(camSubCategoryErr, camSubCategoryObject) {
							if (camSubCategoryErr) return next(camSubCategoryErr);
							console.log('6');
							// Create Cameratoezicht Hoofdcategorie
							HoofdCategorie.create({
								naam: 'Cameratoezicht',
								SubCategorieen: camSubCategoryObject
							}, function(camMainCategoryErr, camMainCategoryObject) {
								if (camMainCategoryErr) return next(camMainCategoryErr);
								console.log('7');
								// Create Offerte entry
								Offerte.create({
									klant: 'Washin7 Nijmegen',
									straathuisnummer: 'Hoofdstraat 1',
									postcode: '1234AB',
									plaats: 'Nijmegen',
									telefoon: '01-23456789',
									email: 'nijmegen@washin7.nl',
									project: '2018-045',
									HoofdCategorieen: camMainCategoryObject
								}, function(err, data) {
									if (err) return next(err);
									console.log('8');
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

			// Delete all SubCategorieën
			SubCategorie.remove({}, function(errSubcategorie, dataSubcategorie) {
				if (errSubcategorie) {
					results.subcategorie = errSubcategorie;
				} else {
					results.subcategorie = 'success';

					// Delete all HoofdCategorieën
					HoofdCategorie.remove({}, function(errHoofdcategorie, dataHoofdcategorie) {
						if (errHoofdcategorie) {
							results.hoofdcategorie = errHoofdcategorie;
						} else {
							results.hoofdcategorie = 'success';

							// Delete all Offertes
							Offerte.remove({}, function(errOfferte, dataOfferte) {
								if (errOfferte) {
									results.offerte = errOfferte;
								} else {
									results.offerte = 'success';
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