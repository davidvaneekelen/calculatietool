var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  merk: String,
  model: String,
  eigenschappen: [String],
  inkoopprijs: Number,
  verkoopprijs: Number,
  artikelnummer: String,
  leverancier: String
});

module.exports = mongoose.model('Product', ProductSchema);