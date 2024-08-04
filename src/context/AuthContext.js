import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = async () => {
    try {
      setIsAuthenticating(true);
      const response = await axios.post(
        "http://localhost:5000/auth/user",
        {},
        { withCredentials: true }
      );
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("error is ", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticating, fetchUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
