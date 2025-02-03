import React, { useState, useContext } from "react";
import { AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import default styles (can be customized)

import Log from './Log.jpg'; // Adjust the path to your image

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const navigate = useNavigate();

  const { setToken, setUser } = useContext(AuthContext); 
  // Get the setToken function from context

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if email and password are provided
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      const response = await fetch("https://mern-recipe-6.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        navigate("/"); // Redirect to homepage or dashboard
        toast.success("Login successful!"); // Display success toast
      } else {
        toast.error(data.message || "Login failed. Please try again."); // Display error toast
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later."); // Display error toast for unexpected errors
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Log})` }}
    >
      <div className="w-full max-w-lg mx-auto flex flex-col gap-8 rounded-xl bg-white bg-opacity-0 text-gray-800 p-6 md:p-8 lg:p-12 backdrop-blur-md shadow-[0_0_15px_5px_rgba(255,255,255,0.4)]">
        <h2 className="text-5xl font-serif font-bold mb-8 text-white text-center">Login</h2>
        
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="relative flex items-center">
            <AiOutlineUser className="absolute left-4 text-white text-xl transition-transform duration-300 ease-in-out hover:scale-110" />
            <input
              className="w-full font-semibold py-3 pl-12 pr-4 text-base font-sans md:text-lg text-white placeholder-white border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white transition-transform duration-300 bg-transparent"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
              autoComplete="off"
            />
          </div>
          <div className="relative flex items-center">
            <AiOutlineLock className="absolute left-4 text-white text-xl transition-transform duration-300 ease-in-out hover:scale-110" />
            <input
              className="w-full font-semibold py-3 pl-12 pr-12 text-base md:text-lg text-white placeholder-white border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white transition-transform duration-300 bg-transparent"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white hover:text-gray-300 transition-colors duration-300"
              aria-label="Toggle Password Visibility"
            >
              {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full mt-8 mx-auto py-3 px-2 text-sm md:text-lg font-bold text-gray-800 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Log in
          </button>
        </form>
        
        <p className="text-center text-xl font-bold text-white ">
          Don't have an account?{' '}
          <Link to="/SignUp" className="text-white font-bold text-xl">
            Register
          </Link>
        </p>
      </div>


      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ top: '80px' }} 
      />
    </div>
  );
}

export default Login;
