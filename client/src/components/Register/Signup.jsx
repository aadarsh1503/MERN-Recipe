import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Sign from './Sign.jpg'; // Adjust the path to your image

function Signup() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    description: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = "Full name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters!";
    } else if (values.password.length > 20) {
      errors.password = "Password cannot exceed 20 characters!";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await fetch('https://mern-recipe-6.onrender.com/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        const result = await res.json();
        if (res.ok) {
          console.log("RESPONSE: ", result);
          navigate('/login');
        } else {
          console.error(result.message);
        }
      } catch (e) {
        console.error("Error during registration:", e.message);
      }
    }
  };
  

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Sign})` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Sign Up</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Username</label>
            <div className="flex items-center bg-gray-100 p-3 rounded-md transition duration-300">
              <AiOutlineUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="bg-transparent focus:outline-none w-full"
                value={values.username}
                onChange={handleChange}
              />
            </div>
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <div className="flex items-center bg-gray-100 p-3 rounded-md transition duration-300">
              <AiOutlineMail className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="bg-transparent focus:outline-none w-full"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <div className="flex items-center bg-gray-100 p-3 rounded-md transition duration-300">
              <AiOutlineUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="description"
                placeholder="Enter a short description"
                className="bg-transparent focus:outline-none w-full"
                value={values.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="flex items-center bg-gray-100 p-3 rounded-md transition duration-300">
              <AiOutlineLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="bg-transparent focus:outline-none w-full"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
          
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
