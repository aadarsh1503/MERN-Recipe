import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "./Image.jpg";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const Navbar = () => {
  const { token, handleClearAuth, user } = useContext(AuthContext); // Access token and user from context
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cartCount, setCartCount] = useState(0); // State for cart item count

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
          const response = await fetch(`http://localhost:3000/cart/${user._id}`);
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
                    src={Image} // Replace with your logo image URL
                    alt="logo"
                    className="w-14 h-auto"
                  />
                </a>
              </div>
              {/* FusionX Text */}
              <div className="cursor-pointer">
                <a href="/">
                  <svg
                    width="200"
                    height="50"
                    viewBox="0 0 200 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-6 items-center">
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
                <Link to="/cart" className="relative">
                  <button className="cursor-pointer py-3 px-4 rounded-full bg-gray-200 text-black hover:bg-gray-300">
                    <AiOutlineShoppingCart size={24} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </Link>
                <button
                  onClick={handleClearAuth}  // Call handleClearAuth to logout
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
