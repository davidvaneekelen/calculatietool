var mongoose = require('mongoose');

var OfferSchema = new mongoose.Schema({
  customer: String,
  address: String,
  postalCode: String,
  city: String,
  phone: String,
  email: String,
  project: String,
  Categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}]
});

module.exports = mongoose.model('Offer', OfferSchema);