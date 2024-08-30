import React, { useState, useContext } from "react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setToken, setUser } = useContext(AuthContext); 
  // Get the setToken function from context

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
        setToken(data.token)
        setUser(data.user);
          console.log(data.token)
          console.log(data.user)
        navigate("/"); // Redirect to homepage or dashboard
      } else {
        setError(data.message); // Show error message if login fails
      }
    } catch (err) {
      setError("Something went wrong. Please try again later."); // Handle any unexpected errors
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <div className="flex items-center bg-gray-100 p-3 rounded-md transition duration-300">
              <AiOutlineUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Enter your email"
                className="bg-transparent focus:outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="flex items-center bg-gray-100 p-3 rounded-md transition duration-300">
              <AiOutlineLock className="text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                className="bg-transparent focus:outline-none w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Login
          </button>
          
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
