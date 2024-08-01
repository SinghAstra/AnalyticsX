import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import TopBar from "./TopBar";

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticating } = useContext(AuthContext);

  // Add spinner component
  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  return user ? (
    <>
      <TopBar />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
