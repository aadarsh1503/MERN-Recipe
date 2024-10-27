import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
    InstagramOutlined, 
    TwitterOutlined, 
    LinkedinOutlined 
} from '@ant-design/icons';
import Nav from './Nav.jpg'; // Import your background image

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const fusionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing after element is visible
                }
            },
            { threshold: 0.5 }
        );

        if (fusionRef.current) {
            observer.observe(fusionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div 
            className="bg-gray-950 h-96 px-4 py-8 max-[768px]:h-fit relative" 
            style={{
                backgroundImage: `url(${Nav})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay for better contrast */}
            <div className="relative z-10 flex justify-around items-center h-full p-4 text-white max-[900px]:p-0 max-[768px]:flex-col max-[768px]:p-4 max-[768px]:justify-center max-[450px]:p-0">
                <div 
                    className={`h-full w-3/5 p-4 flex flex-col justify-between items-center max-[900px]:p-0 max-[768px]:justify-center max-[768px]:h-2/5 max-[768px]:w-full transition-transform duration-1000 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`} 
                    ref={fusionRef}
                >
                    <div className="w-full h-3/5 p-4 flex justify-start items-center text-6xl font-extrabold transition-transform duration-700 ease-in-out hover:scale-105 max-[768px]:text-5xl max-[639px]:text-4xl max-[550px]:text-3xl">
                        FusionX
                    </div>
                    <div className="w-full h-2/5 px-4 py-1 flex flex-col justify-start items-start text-base gap-1 max-[768px]:hidden">
                        <div>Noida, Uttar Pradesh</div>
                        <div>&copy; 2024 FusionX</div>
                    </div>
                </div>
                <div className="h-full w-2/5 p-4 flex flex-col max-[900px]:pr-0 max-[900px]:pl-6 max-[825px]:pl-7 max-[800px]:pl-12 max-[768px]:p-4 max-[768px]:w-full max-[768px]:h-3/5 max-[639px]:gap-4">
                    <div className="h-3/5 text-lg font-medium flex justify-center gap-1 max-[768px]:p-4 max-[450px]:pr-0 max-[400px]:pl-0">
                        <div className="w-1/2 flex flex-col justify-evenly gap-2 max-[768px]:gap-4">
                            <Link to="/about" className="hover:text-gray-300 transition-all duration-300 ease-in-out">About</Link>
                            <Link to="/contactus" className="hover:text-gray-300 transition-all duration-300 ease-in-out">Contact Us</Link>
                            <Link to="/termsOfService" className="hover:text-gray-300 transition-all duration-300 ease-in-out">Terms Of Service</Link>
                        </div>
                        <div className="w-1/2 flex flex-col justify-evenly gap-2 max-[768px]:gap-4">
                            <Link to="/pricing" className="hover:text-gray-300 transition-all duration-300 ease-in-out">Pricing</Link>
                            <Link to="/blog" className="hover:text-gray-300 transition-all duration-300 ease-in-out">Blogs</Link>
                            <Link to="/privacy" className="hover:text-gray-300 transition-all duration-300 ease-in-out">Privacy</Link>
                            <Link to="/user" className="hover:text-gray-300 transition-all duration-300 ease-in-out">Users</Link>
                        </div>
                    </div>
                    <div className="h-2/5 w-full flex max-[768px]:flex-col">
                        <div className="w-fit h-fit py-1 flex justify-between gap-12 text-4xl max-[768px]:w-full max-[768px]:justify-center max-[639px]:text-3xl">
                            <a href="https://in.linkedin.com/" className="hover:text-gray-300 transition-transform duration-300 ease-in-out hover:scale-110">
                                <LinkedinOutlined />
                            </a>
                            <a href="https://twitter.com/?lang=en" className="hover:text-gray-300 transition-transform duration-300 ease-in-out hover:scale-110">
                                <TwitterOutlined />
                            </a>
                            <a href="https://www.instagram.com/" className="hover:text-gray-300 transition-transform duration-300 ease-in-out hover:scale-110">
                                <InstagramOutlined />
                            </a>
                        </div>
                        <div className="text-base flex flex-col items-center p-4 min-[768px]:hidden">
                            <div>Noida, Uttar Pradesh</div>
                            <div>&copy; 2024 FusionX</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
