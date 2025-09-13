const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
  payer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Buyer
  payee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Farmer
  amount: { type: Number, required: true },
  currency: { type: String, default: 'inr' },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  stripeSessionId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
