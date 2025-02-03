import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart, AiOutlineSearch } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext';
import { postData } from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'; // Import framer-motion

const Burgers = () => {
    const { user } = useContext(AuthContext);
    const [burgerData, setBurgerData] = useState([]);
    const [likedBurgers, setLikedBurgers] = useState(new Set());
    const [filteredBurgers, setFilteredBurgers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBurgers = async () => {
            try {
                const response = await fetch('https://mern-recipe-6.onrender.com/burgers'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBurgerData(data);
                setFilteredBurgers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBurgers();
    }, []);

    useEffect(() => {
      
        const updatedBurgers = burgerData.map(burger => ({
            ...burger,
            liked: likedBurgers.has(burger._id),
        })).sort((a, b) => b.liked - a.liked); // Sort so that liked burgers come first
    
     
        const filtered = updatedBurgers.filter(burger =>
            burger.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setFilteredBurgers(filtered);
    }, [searchTerm, burgerData, likedBurgers]);
    
    const addToCart = async (burger) => {
        if (!user?._id) {
            toast.error('User not authenticated');
            return;
        }

        const cartData = {
            name: burger.name,
            description: burger.description,
            image: burger.pic,
            price: burger.price,
            quantity: 1,
            size: 'Medium',
        };

        try {
            const result = await postData(`https://mern-recipe-6.onrender.com/carts/${user._id}`, cartData);
            toast.success('Burger added to cart successfully!');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const toggleLike = (burgerId) => {
        setLikedBurgers(prevLikedBurgers => {
            const newLikedBurgers = new Set(prevLikedBurgers);
            if (newLikedBurgers.has(burgerId)) {
                newLikedBurgers.delete(burgerId);
            } else {
                newLikedBurgers.add(burgerId);
            }
            return newLikedBurgers;
        });
    };

    if (loading) {
        return <div className="text-center text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">Error: {error}</div>;
    }

    if (!Array.isArray(filteredBurgers)) {
        return <div className="text-center text-red-600">Unexpected data format</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    Our Burgers
                </h1>
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search burgers..."
                        className="w-full p-3 pl-12 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredBurgers.map((burger, index) => (
                    <motion.div
                        key={burger._id}
                        className="bg-white rounded-xl shadow-lg transform hover:-translate-y-3 transition duration-300 ease-out"
                        initial={{ opacity: 0, translateY: 50 }} // Start with invisible and moved down
                        animate={{ opacity: 1, translateY: 0 }} // Animate to visible and normal position
                        transition={{ duration: 0.5, delay: index * 0.2 }} // Apply delay based on index
                    >
                        <img
                            src={burger.pic}
                            alt={burger.name}
                            className="w-full h-64 object-cover rounded-t-xl"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{burger.name}</h2>
                            <p className="text-gray-600 mb-4">{burger.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-semibold text-green-600">${burger.price}</span>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600"
                                        onClick={() => addToCart(burger)}
                                    >
                                        <AiOutlineShoppingCart size={24} />
                                    </button>
                                    <button
                                        className={`p-2 rounded-full ${burger.liked ? 'bg-red-600' : 'bg-red-500'} text-white hover:bg-red-700 transition-colors duration-300`}
                                        onClick={() => toggleLike(burger._id)}
                                    >
                                        {burger.liked ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Burgers;
