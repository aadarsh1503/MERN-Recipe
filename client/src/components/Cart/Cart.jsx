import React, { useState, useEffect, useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext'; 

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setCartCount } = useContext(AuthContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (user?._id) {
          const response = await fetch(`http://localhost:3000/cart/${user._id}`);
          const data = await response.json();
          setCartItems(data.items || []);
          setCartCount(data.items.length);  // Update cart count
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-lg transform transition duration-500 hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="mt-4 text-xl font-semibold">{item.name}</h2>
            <p className="mt-2 text-gray-600">{item.description}</p>
            <div className="mt-4">
              <p className="text-lg font-bold text-purple-700">Price: ${item.price}</p>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <button
              className="mt-6 flex items-center justify-center text-white bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out p-2 rounded-lg w-full"
              onClick={() => {
                // Remove item logic here
                console.log("Remove item", item.id);
                const updatedCartItems = cartItems.filter((i) => i.id !== item.id);
                setCartItems(updatedCartItems);
                setCartCount(updatedCartItems.length);  // Update cart count
              }}
            >
              <FaTrashAlt className="mr-2" />
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
