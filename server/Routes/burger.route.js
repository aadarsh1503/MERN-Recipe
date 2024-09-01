import express from 'express';
import Burger from '../models/burger.js'; // Adjust the path as needed

const router = express.Router();

// Create a new burger
router.post('/burger', async (req, res) => {
    try {
        const { name, description, price, pic } = req.body;

        // Ensure pic is a URL or valid string
        if (!pic || typeof pic !== 'string') {
            return res.status(400).json({ error: 'Invalid picture URL' });
        }

        const newBurger = new Burger({ name, description, price, pic });
        await newBurger.save();
        res.status(201).json(newBurger);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all burgers
router.get('/burgers', async (req, res) => {
    try {
        const burgers = await Burger.find();
        res.status(200).json(burgers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a burger by ID
router.get('/burgers/:id', async (req, res) => {
    try {
        const burger = await Burger.findById(req.params.id);
        if (!burger) {
            return res.status(404).json({ message: 'Burger not found' });
        }
        res.status(200).json(burger);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a burger by ID
router.put('/burgers/:id', async (req, res) => {
    try {
        const { name, description, price, pic } = req.body;
        const updatedBurger = await Burger.findByIdAndUpdate(
            req.params.id,
            { name, description, price, pic },
            { new: true, runValidators: true }
        );
        if (!updatedBurger) {
            return res.status(404).json({ message: 'Burger not found' });
        }
        res.status(200).json(updatedBurger);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a burger by ID
router.delete('/burger/:id', async (req, res) => {
    try {
        const deletedBurger = await Burger.findByIdAndDelete(req.params.id);
        if (!deletedBurger) {
            return res.status(404).json({ message: 'Burger not found' });
        }
        res.status(200).json({ message: 'Burger deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
