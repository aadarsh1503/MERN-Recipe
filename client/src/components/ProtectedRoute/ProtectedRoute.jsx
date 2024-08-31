import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />; // Agar token nahi hai toh login page pe redirect karenge
  }

  return children; // Agar token hai toh protected page dikhaenge
}

export default ProtectedRoute;
