import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Cart from '../models/cart.js'; // Import Cart model

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, description, password } = req.body;

    try {
        if (!username || !email || !description || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create a new Cart
        const newCart = new Cart();
        await newCart.save();

        // Create a new User with the Cart reference
        const newUser = new User({
            name: username,
            email: email,
            description: description,
            password: password,
            cart: newCart._id // Associate the new Cart with the User
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

        const user = await User.findById(newUser._id).populate('cart');

        res.status(201).json({ message: 'User created successfully', token, user });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
});

export default router;
