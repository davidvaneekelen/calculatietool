var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  name: String,
  ProductGroups: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProductGroup'}],
});

module.exports = mongoose.model('Category', CategorySchema);