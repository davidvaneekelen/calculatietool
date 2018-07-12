var mongoose = require('mongoose');

var ProductGroupSchema = new mongoose.Schema({
  name: String,
  Products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
});

module.exports = mongoose.model('ProductGroup', ProductGroupSchema);