import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },  // Name is required
      description: { type: String, default: '' },  // Optional with default value
      image: { type: String, default: '' },  // Optional with default value
      price: { type: Number, default: 1 },  // Optional with default value
      quantity: { type: Number, default: 1 },  // Optional with default value
      size: { type: String, default: 'M' }  // Optional with default value
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
