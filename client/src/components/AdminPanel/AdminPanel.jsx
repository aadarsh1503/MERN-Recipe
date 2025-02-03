import React, { useState } from 'react';
import { FaHamburger, FaPizzaSlice, FaIceCream, FaBreadSlice } from 'react-icons/fa';

const AdminPanel = () => {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [pic, setPic] = useState('');
    const [size, setSize] = useState('');
    const [toppings, setToppings] = useState([]);
    const [flavors, setFlavors] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, description, price, pic, size, toppings, flavors, ingredients };

        try {
            const response = await fetch(getApiUrl(category), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Data submitted successfully!');
                resetForm();
            } else {
                alert('Error submitting data.');
            }
        } catch (error) {
            alert('Request failed.');
        }
    };

    const getApiUrl = (category) => {
        switch (category) {
            case 'burger':
                return 'https://mern-recipe-6.onrender.com/burger';
            case 'pizza':
                return 'https://mern-recipe-6.onrender.com/pizza';
            case 'icecream':
                return 'https://mern-recipe-6.onrender.com/icecreams';
            case 'roll':
                return 'https://mern-recipe-6.onrender.com/rolls';
            default:
                return '';
        }
    };

    const resetForm = () => {
        setCategory('');
        setName('');
        setDescription('');
        setPrice('');
        setPic('');
        setSize('');
        setToppings([]);
        setFlavors([]);
        setIngredients([]);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex space-x-6 mb-6">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            value="burger"
                            checked={category === 'burger'}
                            onChange={() => setCategory('burger')}
                            className="form-radio"
                        />
                        <span className="flex items-center">
                            <FaHamburger className="text-xl" />
                            <span className="ml-2">Burger</span>
                        </span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            value="pizza"
                            checked={category === 'pizza'}
                            onChange={() => setCategory('pizza')}
                            className="form-radio"
                        />
                        <span className="flex items-center">
                            <FaPizzaSlice className="text-xl" />
                            <span className="ml-2">Pizza</span>
                        </span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            value="icecream"
                            checked={category === 'icecream'}
                            onChange={() => setCategory('icecream')}
                            className="form-radio"
                        />
                        <span className="flex items-center">
                            <FaIceCream className="text-xl" />
                            <span className="ml-2">Ice Cream</span>
                        </span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            value="roll"
                            checked={category === 'roll'}
                            onChange={() => setCategory('roll')}
                            className="form-radio"
                        />
                        <span className="flex items-center">
                            <FaBreadSlice className="text-xl" />
                            <span className="ml-2">Roll</span>
                        </span>
                    </label>
                </div>
                
                {/* Common Fields */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border rounded-lg p-2"
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border rounded-lg p-2"
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Price:
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 block w-full border rounded-lg p-2"
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Picture URL:
                        <input
                            type="text"
                            value={pic}
                            onChange={(e) => setPic(e.target.value)}
                            className="mt-1 block w-full border rounded-lg p-2"
                        />
                    </label>
                </div>

                {/* Pizza-Specific Fields */}
                {category === 'pizza' && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Size:
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="mt-1 block w-full border rounded-lg p-2"
                                    required
                                >
                                    <option value="">Select Size</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Toppings:
                                <input
                                    type="text"
                                    value={toppings.join(', ')}
                                    onChange={(e) => setToppings(e.target.value.split(',').map(t => t.trim()))}
                                    className="mt-1 block w-full border rounded-lg p-2"
                                    placeholder="Enter toppings separated by commas"
                                />
                            </label>
                        </div>
                    </>
                )}

                {/* Ice Cream-Specific Fields */}
                {category === 'icecream' && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Size:
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="mt-1 block w-full border rounded-lg p-2"
                                    required
                                >
                                    <option value="">Select Size</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Flavors:
                                <input
                                    type="text"
                                    value={flavors.join(', ')}
                                    onChange={(e) => setFlavors(e.target.value.split(',').map(f => f.trim()))}
                                    className="mt-1 block w-full border rounded-lg p-2"
                                    placeholder="Enter flavors separated by commas"
                                />
                            </label>
                        </div>
                    </>
                )}

                {/* Roll-Specific Fields */}
                {category === 'roll' && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Size:
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="mt-1 block w-full border rounded-lg p-2"
                                    required
                                >
                                    <option value="">Select Size</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Ingredients:
                                <input
                                    type="text"
                                    value={ingredients.join(', ')}
                                    onChange={(e) => setIngredients(e.target.value.split(',').map(i => i.trim()))}
                                    className="mt-1 block w-full border rounded-lg p-2"
                                    placeholder="Enter ingredients separated by commas"
                                />
                            </label>
                        </div>
                    </>
                )}

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminPanel;
