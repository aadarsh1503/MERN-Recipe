import mongoose from 'mongoose';

const rollSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensure roll names are unique
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ingredients: [String], // Array of ingredients for the roll
    size: {
        type: String,
        enum: ['Small', 'Medium', 'Large'], // Enum for predefined sizes
        required: true
    }
},);

const Roll = mongoose.model('Roll', rollSchema);

export default Roll;
