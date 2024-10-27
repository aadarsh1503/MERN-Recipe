import React, { useState, useEffect, useContext } from 'react';
import { FaTrashAlt, FaCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setCartCount } = useContext(AuthContext);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (user?._id) {
          const response = await fetch(`https://mern-recipe-5.onrender.com/cart/${user._id}`);
          const data = await response.json();
          setCartItems(data.items || []);
          setCartCount(data.items.length); // Update cart count
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user?._id, setCartCount]);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`https://mern-recipe-5.onrender.com/cart/${user._id}/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      // Remove item from local state
      const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCartItems);
      setCartCount(updatedCartItems.length); // Update cart count
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleCheckout = () => {
    // Navigate to the Buy Now page
    navigate('/buynow');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item, index) => (
          <motion.div
            key={item._id}
            className="p-6 bg-white shadow-lg rounded-lg transform transition duration-500 hover:scale-105"
            initial={{ opacity: 0, y: 20 }} // Initial state
            animate={{ opacity: 1, y: 0 }} // Final state
            transition={{ delay: index * 0.2 }} // Delay for each item
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="mt-4 text-xl font-serif font-semibold">{item.name}</h2>
            <p className="mt-2 font-semibold text-gray-600">{item.description}</p>
            <div className="mt-4">
              <p className="text-lg font-bold text-purple-700">Price: ${item.price}</p>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div className="flex justify-between items-center mt-6 space-x-4">
              <button
                className="flex items-center justify-center text-white bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out p-3 rounded-lg w-full shadow-lg transform hover:scale-105"
                onClick={() => handleRemoveItem(item._id)}
              >
                <FaTrashAlt className="mr-2 text-xl" />
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="flex items-center lg:h-0 justify-center text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out p-6 rounded-full shadow-2xl text-xl font-bold w-full max-w-lg transform hover:scale-110"
          onClick={handleCheckout}
        >
          <FaCreditCard className="mr-3 text-3xl" />
          <span>Proceed to Payment</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
