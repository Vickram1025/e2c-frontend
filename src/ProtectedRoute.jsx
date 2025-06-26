
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const token = localStorage.getItem("token");

  return isLoggedIn && token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
