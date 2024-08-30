import React from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';

const Pizzas = () => {
    const pizzaData = [
        {
            name: 'Margherita Pizza',
            description: 'A simple classic with fresh mozzarella, tomatoes, and basil.',
            price: '$12.99',
            image: 'https://via.placeholder.com/150?text=Margherita+Pizza',
        },
        {
            name: 'Pepperoni Pizza',
            description: 'Topped with spicy pepperoni slices and a rich tomato sauce.',
            price: '$14.99',
            image: 'https://via.placeholder.com/150?text=Pepperoni+Pizza',
        },
        {
            name: 'BBQ Chicken Pizza',
            description: 'Tangy BBQ sauce, grilled chicken, and red onions on a crispy crust.',
            price: '$15.49',
            image: 'https://via.placeholder.com/150?text=BBQ+Chicken+Pizza',
        },
        {
            name: 'Veggie Supreme Pizza',
            description: 'Loaded with bell peppers, olives, onions, and mushrooms.',
            price: '$13.99',
            image: 'https://via.placeholder.com/150?text=Veggie+Supreme+Pizza',
        },
        {
            name: 'Hawaiian Pizza',
            description: 'A sweet and savory mix of ham, pineapple, and mozzarella cheese.',
            price: '$14.49',
            image: 'https://via.placeholder.com/150?text=Hawaiian+Pizza',
        },
    ];

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

export default Pizzas;
