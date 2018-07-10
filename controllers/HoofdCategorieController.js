var mongoose = require('mongoose');
var HoofdCategorie = mongoose.model("HoofdCategorie");

var hoofdCategorieController = {};

hoofdCategorieController.list = function(req, res) {
	HoofdCategorie.find({}).exec(function(err, data) {
		if (err) {
			console.log("ERROR: " + err);
		} else {
			res.render('../views/hoofdcategorie/index', {hoofdcategorieen:data});
		}
	});
};

hoofdCategorieController.show = function(req, res) {
	HoofdCategorie.findOne({_id: req.params.id}).exec(function(err, data) {
		if (err) {
			console.log("ERROR: " + err);
		} else {
			res.render('../views/hoofdcategorie/show', {hoofdcategorie:data});
		}
	});
};

hoofdCategorieController.create = function(req, res) {
	res.render('../views/hoofdcategorie/create');
};

hoofdCategorieController.save = function(req, res) {
	var hoofdcategorie = new HoofdCategorie(req.body);

	hoofdcategorie.save(function(err) {
		if (err) {
			console.log(err);
			res.render('../views/hoofdcategorie/create');
		} else {
			console.log("Hoofdcategorie aangemaakt");
			res.redirect('/hoofdcategorie/show/' + hoofdcategorie._id);
		}
	});
};

hoofdCategorieController.edit = function(req, res) {
	HoofdCategorie.findOne({_id: req.params.id}).exec(function(err, data) {
		if (err) {
			console.log("ERROR: " + err);
		} else {
			res.render('../views/hoofdcategorie/edit', {hoofdcategorie:data});
		}
	});
};

hoofdCategorieController.update = function(req, res) {
	HoofdCategorie.findByIdAndUpdate(req.params.id, { $set: {naam: req.body.naam}}, {new: true}, function (err, data) {
		if (err) {
			console.log(err);
			res.render('../views/hoofdcategorie/edit', {hoofdcategorie:req.body});
		} else {
			res.redirect('/hoofdcategorie/show/' + data._id)
		}
	});
};

hoofdCategorieController.delete = function(req, res) {
	HoofdCategorie.remove({_id:req.params.id}, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Hoofdcategorie verwijderd');
			res.redirect('/hoofdcategorieen');
		}
	});
}

module.exports = hoofdCategorieController;