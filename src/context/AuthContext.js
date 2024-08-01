import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
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

    fetchUser();
  }, []);

  console.log("user is ", user);
  return (
    <AuthContext.Provider value={{ user, isAuthenticating }}>
      {children}
    </AuthContext.Provider>
  );
};
