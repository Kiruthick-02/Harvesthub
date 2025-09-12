const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  produce: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  terms: { type: String, required: true },
  status: { type: String, enum: ['pending', 'active', 'completed', 'disputed'], default: 'pending' },
  digitalSignatureFarmer: { type: String },
  digitalSignatureBuyer: { type: String },
  versionHistory: [{
    terms: String,
    updatedAt: { type: Date, default: Date.now },
  }],
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
}, { timestamps: true });

module.exports = mongoose.model('Contract', ContractSchema);