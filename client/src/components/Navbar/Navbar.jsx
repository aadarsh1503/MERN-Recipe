import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "./Image.jpg"; // Your main logo image
import chilli from "./chilli.jpg"; // Import the red chilli image
import { AuthContext } from "../context/AuthContext"; 

const Navbar = () => {
  const { token, handleClearAuth, user } = useContext(AuthContext); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch cart count from the backend when the user is logged in
  useEffect(() => {
    const fetchCartCount = async () => {
      if (user?._id) {
        try {
          const response = await fetch(`https://mern-recipe-5.onrender.com/cart/${user._id}`);
          const data = await response.json();
          const totalCount = data.items?.reduce((total, item) => total + item.quantity, 0) || 0;
          setCartCount(totalCount);
        } catch (error) {
          console.error("Error fetching cart count:", error);
          setCartCount(0); // Reset to 0 in case of error
        }
      } else {
        setCartCount(0); // Reset count if user is not logged in
      }
    };

    fetchCartCount();
  }, [user?._id]); // Depend on user._id

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="sticky z-[100] top-0">
      <div className="relative bg-white py-1 shadow-md">
        <div className="flex w-[90%] m-auto items-center justify-between max-[1000px]:w-full max-[1000px]:px-4">
          <div className="flex items-center">
            <div className="flex items-center gap-4">
              {/* Logo Image */}
              <div className="cursor-pointer mr-4">
                <a href="/">
                  <img
                    src={Image} 
                    alt="logo"
                    className="w-14 h-auto max-w-[40px] min-w-[35px]" // Responsive image
                  />
                </a>
              </div>
              {/* FusionX Text with Red Chilli */}
              <div className="cursor-pointer flex items-center">
                <a href="/">
                  <svg
                    width="200"
                    height="50"
                    viewBox="0 0 200 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="max-[640px]:w-[150px]" // Smaller text on mobile
                  >
                    <text
                      x="0"
                      y="43"
                      fill="black"
                      fontSize="45"
                      fontFamily="serif"
                      fontWeight="bold"
                    >
                      FusionX
                    </text>
                  </svg>
                </a>
                <img
                  src={chilli} 
                  alt="Red Chilli"
                  className="ml-[-1.5rem] w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24" // Increase size in md and lg
                />
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-row gap-6 items-center">
            {!token ? (
              <>
                <Link to="/login">
                  <button className="cursor-pointer py-3 px-8 rounded-lg bg-black text-white font-bold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="cursor-pointer py-3 px-8 rounded-lg border-2 border-black bg-white text-black font-bold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <>
                {/* Change text size on md screen */}
                <div className="text-4xl md:text-2xl lg:text-4xl font-bold">
                  <span className="text-black">Hii, </span>
                  <span className="text-red-500 font-extrabold bg-clip-text ">
                    {user.name}
                  </span>
                </div>
                <Link to="/cart" className="relative">
                  <button className="cursor-pointer py-3 px-4 rounded-full bg-gray-200 text-black hover:bg-gray-300 flex items-center">
                    <AiOutlineShoppingCart size={24} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </Link>
                <button
                  onClick={handleClearAuth}
                  className="cursor-pointer py-3 px-8 rounded-lg bg-red-600 text-white font-bold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-3xl">
              {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:hidden bg-white shadow-md mt-2 py-4`}>
          <div className="flex flex-col items-center space-y-4">
            {!token ? (
              <>
                <Link to="/login">
                  <button className="cursor-pointer py-3 px-8 rounded-lg bg-black text-white font-bold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="cursor-pointer py-3 px-8 rounded-lg border-2 border-black bg-white text-black font-bold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  <span className="text-black">Hii, </span>
                  <span className="text-red-500 font-extrabold bg-clip-text ">
                    {user.name}
                  </span>
                </div>
                <Link to="/cart" className="relative">
                  <button className="cursor-pointer py-3 px-4 rounded-full bg-gray-200 text-black hover:bg-gray-300 flex items-center">
                    <AiOutlineShoppingCart size={24} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </Link>
                <button
                  onClick={handleClearAuth}
                  className="cursor-pointer py-3 px-8 rounded-lg bg-red-600 text-white font-bold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
