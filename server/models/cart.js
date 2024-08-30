const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },
      description: String,
      image: String,
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1, required: true },
      size: { type: String, required: true }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
