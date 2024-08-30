import React, { useState, useEffect, useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Trash icon for removing items
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const { user } = useContext(AuthContext); // Get the user from context

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                if (user?._id) {
                    const response = await fetch(`http://localhost:3000/cart/${user._id}`);
                    const data = await response.json();
                    console.log(data)
                    setCartItems(data.items || []); 
                    console.log(data.items)// Ensure cartItems is always an array
                } else {
                    setCartItems([]); // Clear cartItems if no user ID
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
                setCartItems([]); // Set cartItems to an empty array in case of error
            } finally {
                setLoading(false); // Update loading status
            }
        };

        fetchCartItems();
    }, [user?._id]); // Depend on user._id

    if (loading) {
        return <p>Loading...</p>; // Show a loading state if the data is still fetching
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
                            onClick={() => console.log("Remove item", item.id)}
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
