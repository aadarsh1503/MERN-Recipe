import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext for user authentication
import { postData } from '../utils/api'; // Import postData utility function

const IceCreams = () => {
    const { user } = useContext(AuthContext); // Get user from AuthContext
    const [iceCreamData, setIceCreamData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch ice cream data from the backend
    useEffect(() => {
        const fetchIceCreams = async () => {
            try {
                const response = await fetch('http://localhost:3000/icecreams'); // Replace with your backend API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setIceCreamData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIceCreams();
    }, []);

    // Add selected ice cream to the cart
    const addToCart = async (iceCream) => {
        if (!user?._id) { // Check if the user is authenticated
            alert('User not authenticated');
            return;
        }

        const cartData = {
            name: iceCream.name,
            description: iceCream.description,
            image: iceCream.image,
            price: iceCream.price,
            quantity: 1, // Default quantity
            size: iceCream.size || 'Medium', // Default size if not available
            flavors: iceCream.flavors.join(', '), // Combine flavors into a single string
        };

        try {
            const result = await postData(`http://localhost:3000/carts/${user._id}`, cartData);
            console.log('Ice cream added to cart successfully:', result);
            alert('Ice cream added to cart successfully!');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    if (loading) {
        return <div className="text-center text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">Our Ice Creams</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {iceCreamData.map((iceCream, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg transform hover:-translate-y-3 transition duration-300 ease-out">
                        <img
                            src={iceCream.image || 'https://via.placeholder.com/150?text=Ice+Cream'}
                            alt={iceCream.name}
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{iceCream.name}</h2>
                            <p className="text-gray-600 mb-4">{iceCream.description}</p>
                            <p className="text-gray-600 mb-4">Flavors: {iceCream.flavors.join(', ')}</p>
                            <p className="text-gray-600 mb-4">Size: {iceCream.size}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-semibold text-green-600">${iceCream.price}</span>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600"
                                        onClick={() => addToCart(iceCream)}
                                    >
                                        <AiOutlineShoppingCart size={24} />
                                    </button>
                                    <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                                        <AiOutlineHeart size={24} />
                                    </button>
                                    <button className="bg-yellow-400 text-white p-2 rounded-full hover:bg-yellow-500">
                                        <AiOutlineStar size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IceCreams;
