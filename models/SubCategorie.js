var mongoose = require('mongoose');

var SubCategorieSchema = new mongoose.Schema({
  naam: String,
  Producten: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
});

module.exports = mongoose.model('SubCategorie', SubCategorieSchema);