import React, { useEffect, useState, useContext } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext'; // Importing AuthContext

const Rolls = () => {
    const { user } = useContext(AuthContext); // Get user from context

    const [rolls, setRolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRolls = async () => {
            try {
                const response = await fetch('http://localhost:3000/rolls');
                if (!response.ok) {
                    throw new Error('Failed to fetch rolls');
                }
                const data = await response.json();
                setRolls(data);
                console.log(user)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRolls();
    }, []);

    const addToCart = async (roll) => {
        console.log('Attempting to add roll to cart:', user);

        if (!user?._id) {
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
                    name: roll.name,
                    description: roll.description,
                    image: roll.image,
                    price: roll.price,
                    quantity: 1,
                    size: roll.size || 'Medium', // Default size or dynamic size
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add roll to the cart');
            }

            const result = await response.json();
            console.log('Roll added to cart successfully:', result);
            alert('Roll added to cart successfully!');
        } catch (error) {
            console.error('Error adding roll to cart:', error);
            alert(`Error: ${error.message}`);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">Our Rolls</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {rolls.map((roll, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg transform hover:-translate-y-3 transition duration-300 ease-out">
                        <img
                            src={roll.image}
                            alt={roll.name}
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{roll.name}</h2>
                            <p className="text-gray-600 mb-4">{roll.description}</p>
                            <p className="text-sm text-gray-500 mb-4">Size: {roll.size}</p>
                            <p className="text-sm text-gray-500 mb-4">Ingredients: {roll.ingredients.join(', ')}</p>
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
        </div>
    );
};

export default Rolls;
