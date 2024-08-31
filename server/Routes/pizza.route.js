import express from 'express';
import Pizza from '../models/pizza.js';

const router = express.Router();

// Create a new pizza
router.post('/pizzas', async (req, res) => {
    const { name, description, price, size, toppings } = req.body;

    // Input validation
    if (!name || !description || !price || !size) {
        return res.status(400).json({ message: 'Name, description, price, and size are required' });
    }

    try {
        const newPizza = new Pizza({ name, description, price, size, toppings });
        await newPizza.save();
        res.status(201).json(newPizza);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all pizzas
router.get('/pizzas', async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        res.status(200).json({ pizzas: pizzas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a pizza by ID
router.get('/pizzas/:id', async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.status(200).json(pizza);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a pizza by ID
router.put('/pizzas/:id', async (req, res) => {
    const { name, description, price, size, toppings } = req.body;

    try {
        const updatedPizza = await Pizza.findByIdAndUpdate(
            req.params.id,
            { name, description, price, size, toppings },
            { new: true, runValidators: true }
        );
        if (!updatedPizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.status(200).json(updatedPizza);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a pizza by ID
router.delete('/pizzas/:id', async (req, res) => {
    try {
        const deletedPizza = await Pizza.findByIdAndDelete(req.params.id);
        if (!deletedPizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.status(200).json({ message: 'Pizza deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
