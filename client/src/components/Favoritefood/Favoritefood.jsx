import React, { useState, useEffect, useContext } from 'react';
import { FaPizzaSlice, FaHamburger, FaIceCream, FaCartPlus } from 'react-icons/fa';
import { GiSandwich } from 'react-icons/gi';
import Mc from "./Mc.jpeg"; // Path to your background image
import { postData } from '../utils/api'; // Import the postData function
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom'; // React Router for redirection
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Favoritefood = () => {
    const { user, cartCount, setCartCount } = useContext(AuthContext);

    const [burgers, setBurgers] = useState([]);
    const [pizzas, setPizzas] = useState([]);
    const [iceCreams, setIceCreams] = useState([]);
    const [rolls, setRolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Initialize navigate for redirection

    useEffect(() => {
        const fetchBurgers = async () => {
            try {
                const response = await fetch('https://mern-recipe-6.onrender.com/burgers'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBurgers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBurgers();
    }, []);

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch('https://mern-recipe-6.onrender.com/pizzas');
                if (!response.ok) {
                    throw new Error('Failed to fetch pizzas');
                }
                const data = await response.json();
                setPizzas(data.pizzas);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPizzas();
    }, []);

    useEffect(() => {
        const fetchIceCreams = async () => {
            try {
                const response = await fetch('https://mern-recipe-6.onrender.com/icecreams'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setIceCreams(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIceCreams();
    }, []);

    useEffect(() => {
        const fetchRolls = async () => {
            try {
                const response = await fetch('https://mern-recipe-6.onrender.com/rolls'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRolls(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRolls();
    }, []);

    const items = [
        ...burgers.map(item => ({ name: 'Burger', icon: <FaHamburger className="text-4xl md:text-6xl text-yellow-600" />, ...item })),
        ...pizzas.map(item => ({ name: 'Pizza', icon: <FaPizzaSlice className="text-4xl md:text-6xl items-center text-red-600" />, ...item })),
        ...iceCreams.map(item => ({ name: 'Ice Cream', icon: <FaIceCream className="text-4xl md:text-6xl text-blue-600" />, ...item })),
        ...rolls.map(item => ({ name: 'Rolls', icon: <GiSandwich className="text-4xl md:text-6xl text-green-600" />, ...item }))
    ];

    const shuffleAndSliceArray = (array, count) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.slice(0, count);
    };

    const displayedItems = shuffleAndSliceArray(items, 8);

    const handleAddToCart = async (item) => {
        if (!user?._id) {
            toast.error('Please log in first!', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                style: {
                    top: '80%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'serif',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    padding: '20px',
                    width: '300px',
                    textAlign: 'center'
                }
            });
    
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }

        const cartData = {
            name: item.name,
            image: item.pic,
            price: item.price,
            quantity: 1,
        };

        try {
            const result = await postData(`https://mern-recipe-6.onrender.com/carts/${user._id}`, cartData);
            console.log('Item added to cart:', result);
            
            toast.success(`Added ${item.name} to cart!`, {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                style: {
                    top: '80%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'serif',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    padding: '20px',
                    width: '300px',
                    textAlign: 'center'
                }
            });

            setCartCount(cartCount + 1);
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add item to cart.', {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                style: {
                    top: '80%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'serif',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    padding: '20px',
                    width: '300px',
                    textAlign: 'center'
                }
            });
        }
    };

    if (loading) {
        return <div className="text-center text-gray-100">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900">
            {/* Left Section with Cards */}
            <div className="flex-1 py-8 px-6 flex flex-col items-center lg:items-start">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold font-serif mt-10 text-center lg:text-left mb-12 text-gray-100">Our Favorite Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {displayedItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500 ease-in-out relative"
                        >
                            {/* Product Image */}
                            <img
                                src={item.pic}
                                alt={item.name}
                                className="w-full h-48 object-cover"
                            />

                            {/* Add to Cart Button */}
                            <button
                                className="absolute top-4 right-4 bg-yellow-400 p-3 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
                                onClick={() => handleAddToCart(item)}
                            >
                                <FaCartPlus className="text-white text-xl md:text-2xl" />
                            </button>

                            {/* Product Details */}
                            <div className="p-4 lg:p-6 text-center ">
                                <div className="text-gray-700 mb-2 flex justify-center items-center md:mb-4">{item.icon}</div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800">{item.name}</h3>
                                <p className="text-lg md:text-xl text-gray-800">${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Right Section with Background Image */}
            <div className="flex-none w-full top-44 p-2 lg:h-[900px] lg:w-2/5 relative">
                <img
                    src={Mc}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectFit: 'fill' }}
                />
            </div>

            {/* Toast Container for showing toasts */}
            <ToastContainer />
        </div>
    );
};

export default Favoritefood;
