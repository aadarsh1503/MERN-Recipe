import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './components/RootLayout/RootLayout.jsx';
import Login from './components/Register/Login.jsx';
import Signup from './components/Register/Signup.jsx';
import Home from './components/Home/Home.jsx';
import Burgers from './components/Burgers/Burgers.jsx';
import Pizzas from './components/Pizza/Pizza.jsx';
import Rolls from './components/Rolls/Rolls.jsx';
import IceCreams from './components/IceCreams/IceCreams.jsx';
import Cart from './components/Cart/Cart.jsx';
import BuyNow from './components/BuyNow/BuyNow.jsx'; // Import BuyNow
import { useAuth, AuthProvider } from './components/context/AuthContext'; 
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'; // Import ProtectedRoute
import './index.css';
import AdminPanel from './components/AdminPanel/AdminPanel.jsx';
import TermsOfService from './components/TermsofService/TermsOfService.jsx';
import AboutSection from './components/About/About.jsx';
import BlogPage from './components/Blogs/Blogs.jsx';
import PrivacyPolicyPage from './components/PrivacyPolicyPage/PrivacyPolicyPage.jsx';
import ContactUsPage from './components/Contact/Contact.jsx';

const App = () => {
  const { token,user } = useAuth(); // Using AuthContext to get token
  console.log("User:", user);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <Login />} // Redirect to home if already logged in
      />
      <Route
        path="/signup"
        element={token ? <Navigate to="/" /> : <Signup />} // Redirect to home if already logged in
      />

      {/* Food Category Routes */}
      <Route path="/burgers" element={<Burgers />} />
      <Route path="/pizza" element={<Pizzas />} />
      <Route path="/rolls" element={<Rolls />} />
      <Route path="/icecreams" element={<IceCreams />} />
      <Route path="/AdminPanel" element={<AdminPanel />} />
      <Route path="/TermsOfService"element={<TermsOfService />} />
      <Route path="/About"element={<AboutSection />} />
      <Route path="/Blog"element={<BlogPage />} />
      <Route path="/privacy"element={<PrivacyPolicyPage />} />
      <Route path="/contactus"element={<ContactUsPage />} />

      

      {/* Protected Routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } 
      />
      <Route
        path="/buynow"
        element={
          <ProtectedRoute>
            <BuyNow />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default function AppWrapper() {
  return (
    <AuthProvider>
      <RootLayout>
        <App />
      </RootLayout>
    </AuthProvider>
  );
}
