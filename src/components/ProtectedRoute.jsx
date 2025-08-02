// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(AppContext);
//   const isAuthenticated = user || localStorage.getItem("user");

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

// Simulate authentication check
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Or use any auth state
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
