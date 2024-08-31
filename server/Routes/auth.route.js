import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import checkUserAuth from "../middlewares/auth_middlewares.js";

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

        const newUser = new User({
            name: username,
            email: email,
            description: description,
            password: password
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

        const user = await User.findById(newUser._id);

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

// Profile route
router.get("/profile", checkUserAuth, (req, res) => {
    res.status(200).json({ user: req.user });
});

// Export router using ESM syntax
export default router;
