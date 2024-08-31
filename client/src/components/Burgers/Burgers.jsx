import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext'; // Importing AuthContext directly

const Burgers = () => {
    const { user } = useContext(AuthContext); // Use user from context
    console.log('User data:', user);

    const [burgerData, setBurgerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBurgers = async () => {
            console.log(user);
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
                console.log('Finished fetching burgers.');
            }
        };

        fetchBurgers();
    }, []);

    const addToCart = async (burger) => {
        console.log('Attempting to add burger to cart:', burger);

       
        if (!user?._id) { // If user is not authenticated
            alert('User not authenticated');
            console.log('User not authenticated:', user);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/carts/${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: burger.name,
                    description: burger.description,
                    image: burger.pic, 
                    price: burger.price,
                    quantity: 1, 
                    size: 'Medium',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to the cart');
            }

            const result = await response.json();
            console.log('Burger added to cart successfully:', result);
            alert('Burger added to cart successfully!');
        } catch (error) {
            console.error('Error adding burger to cart:', error);
            alert(`Error: ${error.message}`);
        }
    };

    if (loading) {
        return <div className="text-center text-gray-700">Loading...</div>;
    }

    if (error) {
        console.log('Error encountered:', error);
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
                            className="w-full h-48 object-cover rounded-t-xl"
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
