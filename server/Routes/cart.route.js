

const express = require('express');
const cartModel = require('../models/cart.js');
const userModel = require('../models/user.js');
const router = express.Router();

router.post('/carts/:userId', async (req, res) => {
  const { name, description, image, price, quantity, size } = req.body;

  try {
    const user = await userModel.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let cart = await cartModel.findOne({ _id: user.cart });

    if (!cart) {
      // If the user doesn't have a cart, create one
      cart = new cartModel({
        items: []
      });
    }

    // Add item to the cart
    const item = { name, description, image, price, quantity, size };
    cart.items.push(item);
    
    await cart.save();

    // Associate the cart with the user
    user.cart = cart._id;
    await user.save();

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /cart/:userId
// @desc Get the cart for a user by user ID
router.get('/cart/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).populate('cart');
    if (!user || !user.cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const cart = await cartModel.findById(user.cart);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route DELETE /cart/:userId/item/:itemId
// @desc Remove an item from the user's cart
router.delete('/cart/:userId/item/:itemId', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user || !user.cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cart = await cartModel.findById(user.cart);
    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
