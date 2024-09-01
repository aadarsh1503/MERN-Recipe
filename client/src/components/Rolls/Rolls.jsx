import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext for user authentication
import { postData } from '../utils/api'; // Import postData utility function
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

const Rolls = () => {
    const { user } = useContext(AuthContext); // Get user from AuthContext
    const [rollsData, setRollsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch rolls data from the backend
    useEffect(() => {
        const fetchRolls = async () => {
            try {
                const response = await fetch('http://localhost:3000/rolls'); // Replace with your backend API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setRollsData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRolls();
    }, []);

    // Add selected roll to the cart
    const addToCart = async (roll) => {
        if (!user?._id) { // Check if the user is authenticated
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
                icon: <AiOutlineShoppingCart size={24} color="white" />,
            });
            return;
        }

        const cartData = {
            name: roll.name,
            description: roll.description,
            image: roll.image,
            price: roll.price,
            quantity: 1, // Default quantity
            size: roll.size || 'Medium', // Default size if not available
            flavors: Array.isArray(roll.flavors) ? roll.flavors.join(', ') : 'N/A', // Ensure flavors is an array
        };

        try {
            const result = await postData(`http://localhost:3000/carts/${user._id}`, cartData);
            console.log('Roll added to cart successfully:', result);
            toast.success('Roll added to cart successfully!', {
                style: {
                    backgroundColor: '#28a745', // Green color for success
                    color: 'white',
                    fontSize: '18px', // Increase font size
                    width: '400px', // Increase width
                    height: '100px', // Increase height
                    display: 'flex', // Flex display for alignment
                    alignItems: 'center', // Center align items
                    justifyContent: 'center', // Center align content
                },
                icon: <AiOutlineShoppingCart size={24} color="white" />, // Custom icon for success
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

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">Our Rolls</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {rollsData.map((roll, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg transform hover:-translate-y-3 transition duration-300 ease-out">
                        <img
                            src={roll.image || 'https://via.placeholder.com/150?text=Roll'}
                            alt={roll.name}
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{roll.name}</h2>
                            <p className="text-gray-600 mb-4">{roll.description}</p>
                            <p className="text-gray-600 mb-4">Flavors: {Array.isArray(roll.flavors) ? roll.flavors.join(', ') : 'N/A'}</p>
                            <p className="text-gray-600 mb-4">Size: {roll.size}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-semibold text-green-600">${roll.price}</span>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600"
                                        onClick={() => addToCart(roll)}
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

export default Rolls;
