// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

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

  // Mock admin credentials for development
  const mockAdmin = {
    _id: "1",
    name: "Admin User",
    email: "admin@serenityplace.org",
    role: "admin",
  };

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // For development, just set the mock admin
        setUser(mockAdmin);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Mock authentication for development
      // In production, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      // For development, accept any credentials or use specific ones
      const validCredentials = [
        { email: "admin@serenityplace.org", password: "admin123" },
        { email: "admin@test.com", password: "test" },
        { email: "demo@demo.com", password: "demo" },
      ];

      const isValid = validCredentials.some(
        (cred) => cred.email === email && cred.password === password
      );

      if (isValid || email.includes("@")) {
        // For development, accept any email
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem("token", token);
        setUser(mockAdmin);

        return { success: true };
      } else {
        return {
          success: false,
          message:
            "Invalid credentials. Try: admin@serenityplace.org / admin123",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Login failed. Please try again.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
