import express from 'express';
import IceCreams from '../models/icecreams.js'; // Adjust the path as needed

const IceCreamsRouter = express.Router();

// GET all ice creams
IceCreamsRouter.get('/icecreams', async (req, res) => {
    try {
        const iceCreams = await IceCream.find();
        res.json(iceCreams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific ice cream by ID
IceCreamsRouter.get('/icecreams/:id', async (req, res) => {
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
IceCreamsRouter.post('/icecreams', async (req, res) => {
    const { name, description, price, flavors, size, pic } = req.body;

    const iceCream = new IceCream({
        name,
        description,
        price,
        flavors,
        size,
        pic // Include the image URL
    });

    try {
        const newIceCream = await iceCream.save();
        res.status(201).json(newIceCream);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (update) an ice cream by ID
IceCreamsRouter.put('/icecreams/:id', async (req, res) => {
    const { name, description, price, flavors, size, pic } = req.body;

    try {
        const updatedIceCream = await IceCream.findByIdAndUpdate(
            req.params.id,
            { name, description, price, flavors, size, pic }, // Update the pic field as well
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
IceCreamsRouter.delete('/icecreams/:id', async (req, res) => {
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

export default IceCreamsRouter;
