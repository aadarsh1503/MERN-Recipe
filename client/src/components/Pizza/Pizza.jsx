import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineSearch, AiFillHeart } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext';
import { postData } from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const Pizzas = () => {
    const { user } = useContext(AuthContext);

    const [pizzaData, setPizzaData] = useState([]);
    const [likedPizzas, setLikedPizzas] = useState(new Set());
    const [filteredPizzas, setFilteredPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch('http://localhost:3000/pizzas');
                if (!response.ok) {
                    throw new Error('Failed to fetch pizzas');
                }
                const data = await response.json();
                setPizzaData(data.pizzas);
                setFilteredPizzas(data.pizzas);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPizzas();
    }, []);

    useEffect(() => {
        const results = pizzaData
            .map(pizza => ({
                ...pizza,
                liked: likedPizzas.has(pizza._id)
            }))
            .sort((a, b) => b.liked - a.liked) // Sort so that liked pizzas come first
            .filter(pizza =>
                pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        setFilteredPizzas(results);
    }, [searchTerm, pizzaData, likedPizzas]);

    const addToCart = async (pizza) => {
        if (!user?._id) {
            toast.error('User not authenticated');
            return;
        }

        const cartData = {
            name: pizza.name,
            description: pizza.description,
            image: pizza.pic,
            price: pizza.price,
            quantity: 1,
            size: 'Medium',
        };

        try {
            const result = await postData(`http://localhost:3000/carts/${user._id}`, cartData);
            toast.success('Pizza added to cart successfully!');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const toggleLike = (pizzaId) => {
        setLikedPizzas(prevLikedPizzas => {
            const newLikedPizzas = new Set(prevLikedPizzas);
            if (newLikedPizzas.has(pizzaId)) {
                newLikedPizzas.delete(pizzaId);
            } else {
                newLikedPizzas.add(pizzaId);
            }
            return newLikedPizzas;
        });
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Delay between each child animation
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    if (loading) {
        return <div className="text-center text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    Our Pizzas
                </h1>
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search pizzas..."
                        className="w-full p-3 pl-12 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                </div>
            </div>

            {/* Motion container for staggered animations */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {filteredPizzas.map((pizza) => (
                    <motion.div
                        key={pizza._id}
                        className="bg-white rounded-xl shadow-lg"
                        variants={itemVariants}
                    >
                        <img
                            src={pizza.pic}
                            alt={pizza.name}
                            className="w-full h-52 object-cover rounded-t-xl"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{pizza.name}</h2>
                            <p className="text-gray-600 mb-4">{pizza.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-semibold text-green-600">${pizza.price}</span>
                                <div className="flex space-x-2">
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600"
                                        onClick={() => addToCart(pizza)}
                                    >
                                        <AiOutlineShoppingCart size={24} />
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        className={`p-2 rounded-full ${pizza.liked ? 'bg-red-600' : 'bg-red-500'} text-white hover:bg-red-700`}
                                        onClick={() => toggleLike(pizza._id)}
                                    >
                                        {pizza.liked ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <ToastContainer position="top-center" autoClose={1000} />
        </div>
    );
};

export default Pizzas;
