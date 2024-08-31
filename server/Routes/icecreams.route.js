import express from 'express';
import IceCream from '../models/IceCreams.js'; // Adjust the path as needed

const router = express.Router();

// GET all ice creams
router.get('/icecreams', async (req, res) => {
    try {
        const iceCreams = await IceCream.find();
        res.json(iceCreams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific ice cream by ID
router.get('/icecreams/:id', async (req, res) => {
    try {
        const iceCream = await IceCream.findById(req.params.id);
        if (!iceCream) {
            return res.status(404).json({ message: 'Ice cream not found' });
        }
        res.json(iceCream);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new ice cream
router.post('/icecreams', async (req, res) => {
    const { name, description, price, flavors, size } = req.body;

    const iceCream = new IceCream({
        name,
        description,
        price,
        flavors,
        size
    });

    try {
        const newIceCream = await iceCream.save();
        res.status(201).json(newIceCream);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (update) an ice cream by ID
router.put('/icecreams/:id', async (req, res) => {
    const { name, description, price, flavors, size } = req.body;

    try {
        const updatedIceCream = await IceCream.findByIdAndUpdate(
            req.params.id,
            { name, description, price, flavors, size },
            { new: true, runValidators: true }
        );

        if (!updatedIceCream) {
            return res.status(404).json({ message: 'Ice cream not found' });
        }

        res.json(updatedIceCream);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an ice cream by ID
router.delete('/icecreams/:id', async (req, res) => {
    try {
        const iceCream = await IceCream.findByIdAndDelete(req.params.id);

        if (!iceCream) {
            return res.status(404).json({ message: 'Ice cream not found' });
        }

        res.json({ message: 'Ice cream deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
