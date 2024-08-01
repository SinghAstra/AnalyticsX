import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const fetchUser = async () => {
    try {
      setIsAuthenticating(true);
      const response = await axios.post(
        "http://localhost:5000/auth/user",
        {},
        { withCredentials: true }
      );
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log("user is ", user);
  return (
    <AuthContext.Provider value={{ user, isAuthenticating, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
