import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
      setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      const response = await fetch("http://192.168.1.57:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'XF-token': localStorage.getItem("token"),
          'user_id': localStorage.getItem("user_id"),
          'user_type': localStorage.getItem("user_type"),
          'XF-session-token': localStorage.getItem("XF-session-token"),
          Authorization: localStorage.getItem("token"),
        },
      });

      // Clear all auth-related items from localStorage
      localStorage.clear();
      
      // Clear the user state
    setUser(null);

      // Navigate to login page
      navigate("/login");

    } catch (error) {
      console.error("Logout error:", error);
      // Still clear everything even if the API call fails
      localStorage.clear();
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
 
