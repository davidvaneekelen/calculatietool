var mongoose = require('mongoose');

var HoofdCategorieSchema = new mongoose.Schema({
  naam: String,
  SubCategorieen: [{type: mongoose.Schema.Types.ObjectId, ref: 'SubCategorie'}],
});

module.exports = mongoose.model('HoofdCategorie', HoofdCategorieSchema);