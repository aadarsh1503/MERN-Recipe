const express = require('express');
const cors = require('cors');
const connectDB = require('./db.js');
const userRoutes = require('./Routes/user.route.js');
const authRoutes = require('./Routes/auth.route.js');

const pizzaRoutes = require('./Routes/pizza.route.js'); 
const rollRoutes = require('./Routes/rolls.route.js');
const iceCreamRoutes = require('./Routes/icecreams.route.js');
const burgerRoutes = require('./Routes/burger.route.js'); 
const Cart = require('./Routes/cart.route.js');



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
