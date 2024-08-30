import React, { useEffect, useState } from 'react';
import { FaHamburger, FaPizzaSlice, FaIceCream } from 'react-icons/fa';
import { GiSandwich } from 'react-icons/gi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'; // Import filled and outlined star icons for hover effect
import Food from './Food.jpg'; // Ensure the image path is correct

const Hero = () => {
    const [showText, setShowText] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(0); // State to track the hovered star

    useEffect(() => {
        const textTimer = setTimeout(() => {
            setShowText(true);
        }, 400); // Time delay for text

        const contentTimer = setTimeout(() => {
            setShowContent(true);
        }, 800); // Time delay for content (after text)

        return () => {
            clearTimeout(textTimer);
            clearTimeout(contentTimer);
        };
    }, []);

    const recipes = [
        { name: 'Burgers', icon: <FaHamburger className="text-yellow-600" />, link: '/burgers' },
        { name: 'Pizza', icon: <FaPizzaSlice className="text-red-600" />, link: '/pizza' },
        { name: 'Ice Creams', icon: <FaIceCream  className="text-pink-500" />, link: '/icecreams' },
        { name: 'Rolls', icon: <GiSandwich className="text-red-500"  />, link: '/rolls' },
    ];

    const handleHover = (index) => {
        setHoveredStar(index);
    };

    return (
<div 
    className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center py-8 px-4 relative"
    style={{
        backgroundImage: `url(${Food})`,
    }}
>
           
            
            

            {/* Left-aligned Text and Quote */}
            <div className={`flex flex-col px-4 text-gray-300 sm:px-6 md:px-8 lg:px-12 xl:px-20  sm:-mt-20 md:-mt-24 lg:-mt-28 transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0'} text-center md:text-left`}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-2">Laughter</h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">is brightest</h2>
                <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">where</h4>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif">food is good</h3>

                {/* Star Ratings with Black Background */}
                <div className="flex  mt-12 space-x-1 justify-center md:space-x-4  shadow-lg  bg-white  p-1 rounded-full">
    <span className="text-gray-400 text-2xl md:text-5xl transition-transform duration-300 transform hover:scale-110 hover:text-gray-600  rounded-full">
        ★
    </span>
    <span className="text-gray-500 text-2xl md:text-5xl transition-transform duration-300 transform hover:scale-110 hover:text-gray-700  rounded-full">
        ★
    </span>
    <span className="text-gray-600 text-2xl md:text-5xl transition-transform duration-300 transform hover:scale-110 hover:text-yellow-400  rounded-full">
        ★
    </span>
    <span className="text-gray-800 text-2xl md:text-5xl transition-transform duration-300 transform hover:scale-110 hover:text-yellow-500  rounded-full">
        ★
    </span>
    <span className="text-yellow-500 text-2xl md:text-5xl transition-transform duration-300 transform hover:scale-110  rounded-full">
        ★
    </span>
</div>

<p className="text-gray-200 mt-2 text-base md:text-xl font-bold italic">"Because good food deserves a five-star rating!"</p>
</div>

            {/* Recipe Cards */}
            <div className={`relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                {recipes.map((recipe, index) => (
                    <a
                        href={recipe.link}
                        key={index}
                        className="group bg-white bg-opacity-80 rounded-2xl shadow-lg transform hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 ease-out p-4 sm:p-5 md:p-6 flex flex-col items-center"
                    >
                        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black mb-4 transition-transform duration-300 group-hover:scale-110">
                            {recipe.icon}
                        </div>
                        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2 group-hover:text-red-500 transition-colors duration-300">
                            {recipe.name}
                        </h2>
                        <span className="inline-block bg-indigo-100 text-indigo-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Explore More
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Hero;
