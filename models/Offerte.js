var mongoose = require('mongoose');

var OfferteSchema = new mongoose.Schema({
  klant: String,
  straathuisnummer: String,
  postcode: String,
  plaats: String,
  telefoon: String,
  email: String,
  project: String,
  HoofdCategorieen: [{type: mongoose.Schema.Types.ObjectId, ref: 'HoofdCategorie'}]
});

module.exports = mongoose.model('Offerte', OfferteSchema);