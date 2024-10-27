import mongoose from 'mongoose';

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
    },
    pic: { 
        type: String, 
        required: true // URL of the image, required field
    }
});

const IceCream = mongoose.model('IceCream', iceCreamSchema);

export default IceCream;
