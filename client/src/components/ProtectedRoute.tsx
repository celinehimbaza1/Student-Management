import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token"); // Check if JWT token exists

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the children components (protected page)
  return <>{children}</>;
};

export default ProtectedRoute;
