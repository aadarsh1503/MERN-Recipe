const mongoose = require('mongoose');

const burgerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    pic: {
        type: String, // URL or path to the image
        required: true
    }
});

const Burger = mongoose.model('Burger', burgerSchema);

module.exports = Burger;
