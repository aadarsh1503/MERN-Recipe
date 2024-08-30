const mongoose = require('mongoose');

const iceCreamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensure ice cream names are unique
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    flavors: [String], // Array of flavors for the ice cream
    size: {
        type: String,
        enum: ['Small', 'Medium', 'Large'], // Enum for predefined sizes
        required: true
    }
});

const IceCream = mongoose.model('IceCream', iceCreamSchema);

module.exports = IceCream;
