// Distributor model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const distributorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  markets: [{ type: Schema.Types.ObjectId, ref: 'Market' }]
});

const Distributor = mongoose.model('Distributor', distributorSchema);

module.exports = Distributor;
