import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensuring email is unique
    password: { type: String, required: true }, // Store hashed password, never plain text
    cart: { type: mongoose.Types.ObjectId, ref: 'Cart' }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
