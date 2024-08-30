import React, { useState, useEffect } from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';

const IceCreams = () => {
    const [iceCreamData, setIceCreamData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch ice cream data from the backend
    useEffect(() => {
        const fetchIceCreams = async () => {
            try {
                const response = await fetch('http://localhost:3000/icecreams'); // Replace with your backend API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setIceCreamData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIceCreams();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-20">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">Our Ice Creams</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {iceCreamData.map((iceCream, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg transform hover:-translate-y-3 transition duration-300 ease-out">
                        <img
                            src={iceCream.image || 'https://via.placeholder.com/150?text=Ice+Cream'}
                            alt={iceCream.name}
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{iceCream.name}</h2>
                            <p className="text-gray-600 mb-4">{iceCream.description}</p>
                            <p className="text-gray-600 mb-4">Flavors: {iceCream.flavors.join(', ')}</p>
                            <p className="text-gray-600 mb-4">Size: {iceCream.size}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-semibold text-green-600">${iceCream.price}</span>
                                <div className="flex space-x-2">
                                    <button className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600">
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

export default IceCreams;
