const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

// Order Schema
const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' }
});

const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { User, Order };
