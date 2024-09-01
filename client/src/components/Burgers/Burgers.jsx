import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext';
import { postData } from '../utils/api'; // Import the reusable POST function

const Burgers = () => {
    const { user } = useContext(AuthContext); // Use user from context
    console.log('User data:', user);

    const [burgerData, setBurgerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBurgers = async () => {
            try {
                const response = await fetch('http://localhost:3000/burgers'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBurgerData(data);
            } catch (error) {
                console.error('Error fetching burgers:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBurgers();
    }, []);

    const addToCart = async (burger) => {
        if (!user?._id) { // If user is not authenticated
            alert('User not authenticated');
            return;
        }

        const cartData = {
            name: burger.name,
            description: burger.description,
            image: burger.pic,
            price: burger.price,
            quantity: 1, // Set default quantity
            size: 'Medium', // Set default size
        };

        try {
            const result = await postData(`http://localhost:3000/carts/${user._id}`, cartData);
            console.log('Burger added to cart successfully:', result);
            alert('Burger added to cart successfully!');
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
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">Our Burgers</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {burgerData.map((burger, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg transform hover:-translate-y-3 transition duration-300 ease-out">
                        <img
                            src={burger.pic} // Updated to use the correct field
                            alt={burger.name}
                            className="w-full h-64 object-cover rounded-t-xl"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{burger.name}</h2>
                            <p className="text-gray-600 mb-4">{burger.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-semibold text-green-600">{burger.price}</span>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600"
                                        onClick={() => addToCart(burger)}
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

export default Burgers;
