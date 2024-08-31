import express from 'express';
import userModel from '../models/user.js';

const router = express.Router();

// @route POST /users
// @desc Create a new user
router.post('/users', async (req, res) => {
  const { name, email, description, password, cart } = req.body;

  try {
    // Input validation
    if (!name || !email || !description || !password || !cart) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      description,
      password, // Ensure password is hashed in real implementation
      cart,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /auth/user
// @desc Get current user
router.get('/user', async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id); // Use req.user.id if you have a middleware to authenticate and attach user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /users
// @desc Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /users/:id
// @desc Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route PUT /users/:id
// @desc Update a user by ID
router.put('/users/:id', async (req, res) => {
  const { name, description } = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route DELETE /users/:id
// @desc Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
