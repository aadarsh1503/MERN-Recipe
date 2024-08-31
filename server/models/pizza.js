import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        enum: ['Small', 'Medium', 'Large'], // Enum for predefined sizes
        required: true
    },
    toppings: [String] // Array of strings for toppings
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

export default Pizza;
