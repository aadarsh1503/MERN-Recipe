import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "./Image.jpg";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const Navbar = () => {
  const { token } = useContext(AuthContext); // Access token from context
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sticky z-[100] top-0">
      <div className="relative bg-white -py-1 shadow-md">
        <div className="flex w-[90%] m-auto items-center justify-between max-[1000px]:w-full max-[1000px]:px-4">
          <div className="flex items-center">
            <div className="flex items-center gap-">
              {/* Logo Image */}
              <div className="w-full cursor-pointer  mr-4">
                <a href="/">
                  <img
                    src={Image} // Replace with your logo image URL
                    alt="logo"
                    className="w-14 h-auto -py-1"
                  />
                </a>
              </div>
              {/* FusionX Text */}
              <div className="w-full cursor-pointer">
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
            {/* Show Login and Sign Up Buttons if No Token */}
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
              // Show Cart Icon if Token is Present
              <Link to="/cart">
                <button className="cursor-pointer py-3 px-4 rounded-full bg-gray-200 text-black hover:bg-gray-300">
                  <AiOutlineShoppingCart size={24} />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
