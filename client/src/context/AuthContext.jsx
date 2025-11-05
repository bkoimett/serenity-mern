// src/context/AuthContext.jsx - Replace the entire file
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Set base URL for API calls
axios.defaults.baseURL = "http://localhost:5000";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get("/api/auth/me");
        setUser(response.data);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
