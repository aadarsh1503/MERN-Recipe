import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart, AiOutlineSearch } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { postData } from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Rolls = () => {
    const { user } = useContext(AuthContext);
    const [rollsData, setRollsData] = useState([]);
    const [likedRolls, setLikedRolls] = useState(new Set());
    const [filteredRolls, setFilteredRolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRolls = async () => {
            try {
                const response = await fetch('https://mern-recipe-6.onrender.com/rolls'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRollsData(data);
                setFilteredRolls(data);
            } catch (error) {
                console.error('Error fetching rolls:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRolls();
    }, []);

    useEffect(() => {
        const results = rollsData
            .map(roll => ({
                ...roll,
                liked: likedRolls.has(roll._id)
            }))
            .sort((a, b) => b.liked - a.liked) // Sort so that liked rolls come first
            .filter(roll =>
                roll.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        setFilteredRolls(results);
    }, [searchTerm, rollsData, likedRolls]);

    const addToCart = async (roll) => {
        if (!user?._id) {
            toast.error('User not authenticated');
            return;
        }

        const cartData = {
            name: roll.name,
            description: roll.description,
            image: roll.pic,
            price: roll.price,
            quantity: 1,
            size: 'Medium',
        };

        try {
            const result = await postData(`https://mern-recipe-6.onrender.com/carts/${user._id}`, cartData);
            toast.success('Roll added to cart successfully!');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const toggleLike = (rollId) => {
        setLikedRolls(prevLikedRolls => {
            const newLikedRolls = new Set(prevLikedRolls);
            if (newLikedRolls.has(rollId)) {
                newLikedRolls.delete(rollId);
            } else {
                newLikedRolls.add(rollId);
            }
            return newLikedRolls;
        });
    };

    if (loading) {
        return <div className="text-center text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">Error: {error}</div>;
    }

    if (!Array.isArray(filteredRolls)) {
        return <div className="text-center text-red-600">Unexpected data format</div>;
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Delay between children appearing
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    Our Rolls
                </h1>
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search rolls..."
                        className="w-full p-3 pl-12 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                </div>
            </div>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {filteredRolls.map((roll) => (
                    <motion.div
                        key={roll._id}
                        className="bg-white rounded-xl shadow-lg transform hover:-translate-y-3 transition duration-300 ease-out"
                        variants={itemVariants}
                    >
                        <img
                            src={roll.pic}
                            alt={roll.name}
                            className="w-full h-64 object-cover rounded-t-xl"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{roll.name}</h2>
                            <p className="text-gray-600 mb-4">{roll.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-semibold text-green-600">${roll.price}</span>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600"
                                        onClick={() => addToCart(roll)}
                                    >
                                        <AiOutlineShoppingCart size={24} />
                                    </button>
                                    <button
                                        className={`p-2 rounded-full ${roll.liked ? 'bg-red-600' : 'bg-red-500'} text-white hover:bg-red-700 transition-colors duration-300`}
                                        onClick={() => toggleLike(roll._id)}
                                    >
                                        {roll.liked ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
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

export default Rolls;
