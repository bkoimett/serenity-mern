// src/context/AuthContext.jsx - Silent version (no API calls)
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

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

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");

    if (token) {
      // For development, always use mock user
      const mockUser = {
        _id: "1",
        name: "System Administrator",
        email: "admin@serenityplace.org",
        role: "admin",
      };
      setUser(mockUser);
    }

    setLoading(false);
  };

  const login = async (email, password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Accept any credentials for development
    const mockUser = {
      _id: "1",
      name: "System Administrator",
      email: email,
      role: "admin",
    };

    const mockToken = "mock-jwt-token-" + Date.now();
    localStorage.setItem("token", mockToken);
    setUser(mockUser);

    return { success: true };
  };

  const register = async (userData) => {
    // Mock registration for development
    return { success: true, data: { user: userData } };
  };

  const logout = () => {
    localStorage.removeItem("token");
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
