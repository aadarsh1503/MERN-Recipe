import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineStar, AiFillHeart, AiOutlineSearch } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext';
import { postData } from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'; // Import framer-motion

const IceCreams = () => {
    const { user } = useContext(AuthContext);
    const [iceCreamData, setIceCreamData] = useState([]);
    const [likedIceCreams, setLikedIceCreams] = useState(new Set());
    const [filteredIceCreams, setFilteredIceCreams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchIceCreams = async () => {
            try {
                const response = await fetch('http://localhost:3000/icecreams'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setIceCreamData(data);
                setFilteredIceCreams(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIceCreams();
    }, []);

    useEffect(() => {
        const results = iceCreamData
            .map(iceCream => ({
                ...iceCream,
                liked: likedIceCreams.has(iceCream._id)
            }))
            .sort((a, b) => b.liked - a.liked) // Sort by liked first
            .filter(iceCream =>
                iceCream.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        setFilteredIceCreams(results);
    }, [searchTerm, iceCreamData, likedIceCreams]);

    const addToCart = async (iceCream) => {
        if (!user?._id) {
            toast.error('User not authenticated', { icon: <AiOutlineShoppingCart size={24} color="green" /> });
            return;
        }

        const cartData = {
            name: iceCream.name,
            description: iceCream.description,
            image: iceCream.pic,
            price: iceCream.price,
            quantity: 1,
            size: 'Medium',
        };

        try {
            const result = await postData(`http://localhost:3000/carts/${user._id}`, cartData);
            toast.success('Ice cream added to cart successfully!', { icon: <AiOutlineShoppingCart size={24} color="green" /> });
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const toggleLike = (iceCreamId) => {
        setLikedIceCreams(prevLikedIceCreams => {
            const newLikedIceCreams = new Set(prevLikedIceCreams);
            if (newLikedIceCreams.has(iceCreamId)) {
                newLikedIceCreams.delete(iceCreamId);
            } else {
                newLikedIceCreams.add(iceCreamId);
            }
            return newLikedIceCreams;
        });
    };

    if (loading) {
        return <div className="text-center text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">Error: {error}</div>;
    }

    if (!Array.isArray(filteredIceCreams)) {
        return <div className="text-center text-red-600">Unexpected data format</div>;
    }

    // Framer motion variants for staggered animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Time delay between the animations of child elements
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    Our Ice Creams
                </h1>
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search ice creams..."
                        className="w-full p-3 pl-12 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                </div>
            </div>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {filteredIceCreams.map((iceCream) => (
                    <motion.div
                        key={iceCream._id}
                        className="bg-white rounded-xl shadow-lg transform transition duration-300 ease-out"
                        variants={itemVariants}
                    >
                        <img
                            src={iceCream.pic}
                            alt={iceCream.name}
                            className="w-full h-64 object-cover rounded-t-xl"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{iceCream.name}</h2>
                            <p className="text-gray-600 mb-4">{iceCream.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-semibold text-green-600">${iceCream.price}</span>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600"
                                        onClick={() => addToCart(iceCream)}
                                    >
                                        <AiOutlineShoppingCart size={24} />
                                    </button>
                                    <button
                                        className={`p-2 rounded-full ${iceCream.liked ? 'bg-red-600' : 'bg-red-500'} text-white hover:bg-red-700 transition-colors duration-300`}
                                        onClick={() => toggleLike(iceCream._id)}
                                    >
                                        {iceCream.liked ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
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

export default IceCreams;
