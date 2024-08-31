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

const app = express();

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
app.use("/", iceCreamRoutes);
app.use('/', Cart );

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port: 3000');
});
