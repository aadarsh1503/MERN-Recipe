import React from 'react';
import { FaPizzaSlice, FaHamburger, FaIceCream } from 'react-icons/fa';
import { GiSandwich } from 'react-icons/gi';

// Import the background image
import Mc from "./Mc.jpeg"; // Path to your background image

const Favoritefood = () => {
    const items = [
        { name: 'Pizza', icon: <FaPizzaSlice className="text-6xl text-red-600" /> },
        { name: 'Burger', icon: <FaHamburger className="text-6xl text-yellow-600" /> },
        { name: 'Ice Cream', icon: <FaIceCream className="text-6xl text-blue-600" /> },
        { name: 'Rolls', icon: <GiSandwich className="text-6xl text-green-600" /> },
        { name: 'Pizza', icon: <FaPizzaSlice className="text-6xl text-red-600" /> },
        { name: 'Burger', icon: <FaHamburger className="text-6xl text-yellow-600" /> },
    ];

    return (
        <div className="flex min-h-screen bg-gray-900">
            {/* Left Section with Cards */}
            <div className="flex-1 py-8 px-6 flex flex-col items-center">
                <h2 className="text-7xl font-extrabold font-serif mt-10 text-center mb-12 text-gray-100">Our Favorite Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500 ease-in-out"
                        >
                            {/* Use placeholder or actual images for items */}
                            <img
                                src={item.image || 'https://via.placeholder.com/400x300'} // Placeholder for missing images
                                alt={item.name}
                                className="w-full h-48 object-cover transition-opacity duration-500 ease-in-out hover:opacity-75"
                            />
                            <div className="p-6 text-center bg-gray-100">
                                <div className="text-gray-700 mb-4">{item.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Right Section with Background Image */}
            <div className="flex-none w-2/5 relative">
                <img
                    src={Mc}
                    alt="Background"
                    className="absolute w-full h-full object-cover "
                    style={{ objectFit: 'cover', height: '100%' }} // Adjust the height here
                />
            </div>
        </div>
    );
};

export default Favoritefood;
