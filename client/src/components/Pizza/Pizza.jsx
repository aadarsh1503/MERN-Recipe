import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext';
import { postData } from '../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pizzas = () => {
    const { user } = useContext(AuthContext);
    console.log('User data:', user);

    const [pizzaData, setPizzaData] = useState([]); // Ensure it's initialized as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch('http://localhost:3000/pizzas'); // Corrected URL
                if (!response.ok) {
                    throw new Error('Failed to fetch pizzas');
                }
                const data = await response.json();
                setPizzaData(data.pizzas);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPizzas();
    }, []);

    const addToCart = async (pizza) => {
        if (!user?._id) {
            toast.error('User not authenticated', {
                style: {
                    backgroundColor: '#dc3545', // Red color for error
                    color: 'white',
                    fontSize: '18px', // Increase font size
                    width: '400px', // Increase width
                    height: '100px', // Increase height
                    display: 'flex', // Flex display for alignment
                    alignItems: 'center', // Center align items
                    justifyContent: 'center', // Center align content
                },
                icon: <AiOutlineShoppingCart size={24} color="green" />,
            });
            return;
        }

        const cartData = {
            name: pizza.name,
            description: pizza.description,
            image: pizza.image,
            price: pizza.price,
            quantity: 1,
            size: 'Medium',
        };

        try {
            const result = await postData(`http://localhost:3000/carts/${user._id}`, cartData);
            console.log('Pizza added to cart successfully:', result);
            toast.success('Pizza added to cart successfully!', {
                style: {
                    backgroundColor: '#ffffff', // Green color for success
                    color: 'Black',
                    fontSize: '18px', // Increase font size
                    width: '400px', // Increase width
                    height: '100px', // Increase height
                    display: 'flex', // Flex display for alignment
                    alignItems: 'center', // Center align items
                    justifyContent: 'center', // Center align content
                },
                icon: <AiOutlineShoppingCart size={24} color="green" />,
            });
        } catch (error) {
            toast.error(`Error: ${error.message}`, {
                style: {
                    backgroundColor: '#dc3545', // Red color for error
                    color: 'white',
                    fontSize: '18px', // Increase font size
                    width: '400px', // Increase width
                    height: '100px', // Increase height
                    display: 'flex', // Flex display for alignment
                    alignItems: 'center', // Center align items
                    justifyContent: 'center', // Center align content
                },
            });
        }
    };

    if (loading) {
        return <div className="text-center text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">Error: {error}</div>;
    }

    // Ensure pizzaData is an array before calling .map
    if (!Array.isArray(pizzaData)) {
        return <div className="text-center text-red-600">Unexpected data format</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">Our Pizzas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {pizzaData.map((pizza, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg transform hover:-translate-y-3 transition duration-300 ease-out">
                        <img
                            src={pizza.image}
                            alt={pizza.name}
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{pizza.name}</h2>
                            <p className="text-gray-600 mb-4">{pizza.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-semibold text-green-600">{pizza.price}</span>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600"
                                        onClick={() => addToCart(pizza)}
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

export default Pizzas;
