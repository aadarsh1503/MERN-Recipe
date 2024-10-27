import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import userRoutes from './Routes/user.route.js';
import authRoutes from './Routes/auth.route.js';
import pizzaRoutes from './Routes/pizza.route.js'; 
import rollRoutes from './Routes/rolls.route.js';
import iceCreamRoutes from './Routes/icecreams.route.js';
import burgerRoutes from './Routes/burger.route.js'; 
import Cart from './Routes/cart.route.js';
import IceCreamRouter from './Routes/icecreams.route.js';

const app = express();

// Use CORS
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use the user, auth, and burger routes
app.use("/api", userRoutes);
app.use('/auth', authRoutes);
app.use('/', burgerRoutes); 
app.use('/', pizzaRoutes);
app.use('/', rollRoutes);
app.use("/", IceCreamRouter);
app.use('/', Cart );

// Start the server on a dynamic port or 3000 as default
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
