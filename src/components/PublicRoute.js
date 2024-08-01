import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, isAuthenticating } = useContext(AuthContext);

  // Add spinner component
  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  return user ? <Navigate to="/" /> : children;
};

export default PublicRoute;
