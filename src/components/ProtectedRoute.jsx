import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  const isAuthenticated = user || localStorage.getItem("user");

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
