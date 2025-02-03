import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BuyNow = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setCartCount } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (user?._id) {
          const response = await fetch(`https://mern-recipe-6.onrender.com/cart/${user._id}`);
          const data = await response.json();

          // Aggregate items with the same properties
          const aggregatedItems = data.items.reduce((acc, item) => {
            const existingItem = acc.find((i) => i.name === item.name && i.price === item.price && i.image === item.image);
            if (existingItem) {
              existingItem.quantity += item.quantity;
              existingItem.totalPrice += item.price * item.quantity;
            } else {
              acc.push({
                ...item,
                totalPrice: item.price * item.quantity,
              });
            }
            return acc;
          }, []);

          setCartItems(aggregatedItems);
          setCartCount(aggregatedItems.length);
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
      const response = await fetch(`https://mern-recipe-6.onrender.com/cart/${user._id}/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCartItems);
      setCartCount(updatedCartItems.length);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2);
  };

  const handleProceedToPayment = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6 flex">
      {/* Products Section */}
      <div className="flex-1 mr-6">
        <h1 className="text-4xl mt-4 font-bold text-center font-serif mb-6">Delicious Selections</h1>
        <div className="flex flex-col gap-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center p-4 bg-white shadow-md rounded-lg transform transition duration-500 hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-lg font-bold text-purple-700">${item.price} x {item.quantity}</p>
                <button
                  className="mt-4 flex items-center justify-center text-white bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out p-2 rounded-lg shadow-md"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Section */}
{/* Bill Section */}
<div className="w-1/3 bg-white p-8 rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105 max-h-[calc(100vh-4rem)] overflow-y-auto">
  <h2 className="text-3xl font-bold text-center mb-6">Your Bill</h2>
  <div className="space-y-4">
    {cartItems.map((item) => (
      <div key={item._id} className="flex items-center justify-between border-b border-gray-300 pb-1 transition-transform duration-300 hover:translate-x-1">
        <div className="flex items-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          <span className="text-lg font-medium text-gray-800">{item.name}</span>
        </div>
        <span className="text-lg font-medium text-gray-800">${item.totalPrice.toFixed(2)}</span>
      </div>
    ))}
    <div className="flex justify-between items-center font-bold text-2xl mt-6 text-gray-800">
      <span>Total</span>
      <span>${calculateTotal()}</span>
    </div>
  </div>
  <div className="mt-8 flex justify-center">
    <button
      className="flex items-center justify-center text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 transition duration-300 ease-in-out p-4 rounded-full shadow-xl transform hover:scale-110"
      onClick={handleProceedToPayment}
    >
      Proceed to Payment
    </button>
  </div>
</div>

    </div>
  );
};

export default BuyNow;
