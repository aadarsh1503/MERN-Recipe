const express = require('express');
const router = express.Router();
const Roll = require('../models/rolls.js');

// Create a new roll
router.post('/rolls', async (req, res) => {
    const { name, description, price, ingredients, size } = req.body;

    // Input validation
    if (!name || !description || !price || !size) {
        return res.status(400).json({ message: 'Name, description, price, and size are required' });
    }

    try {
        const newRoll = new Roll({ name, description, price, ingredients, size });
        await newRoll.save();
        res.status(201).json(newRoll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all rolls
router.get('/rolls', async (req, res) => {
    try {
        const rolls = await Roll.find();
        res.status(200).json(rolls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a roll by ID
router.get('/rolls/:id', async (req, res) => {
    try {
        const roll = await Roll.findById(req.params.id);
        if (!roll) {
            return res.status(404).json({ message: 'Roll not found' });
        }
        res.status(200).json(roll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a roll by ID
router.put('/rolls/:id', async (req, res) => {
    const { name, description, price, ingredients, size } = req.body;

    try {
        const updatedRoll = await Roll.findByIdAndUpdate(
            req.params.id,
            { name, description, price, ingredients, size },
            { new: true, runValidators: true }
        );
        if (!updatedRoll) {
            return res.status(404).json({ message: 'Roll not found' });
        }
        res.status(200).json(updatedRoll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a roll by ID
router.delete('/rolls/:id', async (req, res) => {
    try {
        const deletedRoll = await Roll.findByIdAndDelete(req.params.id);
        if (!deletedRoll) {
            return res.status(404).json({ message: 'Roll not found' });
        }
        res.status(200).json({ message: 'Roll deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
