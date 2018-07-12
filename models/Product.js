var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  brand: String,
  model: String,
  properties: [String],
  purchasePrice: Number,
  sellingPrice: Number,
  articleNumber: String,
  supplier: String
});

module.exports = mongoose.model('Product', ProductSchema);