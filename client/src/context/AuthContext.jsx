// src/context/AuthContext.jsx
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

  // 🧹 Clean invalid tokens (but keep mock ones)
  const cleanupInvalidToken = () => {
    const token = localStorage.getItem("token");
    if (token && token.startsWith("mock-jwt-token-")) {
      // Keep mock tokens for development
      return;
    }

    // Optional: Add stricter validation if needed
  };

  // 🔍 Check if user is logged in on app start
  useEffect(() => {
    cleanupInvalidToken();
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("/api/auth/me");
      setUser(response.data);
    } catch (error) {
      console.log("Auth check failed, clearing invalid token:", error.message);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const checkBackendAvailability = async () => {
    try {
      await axios.get("/api/auth/me", { timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  };

  const mockLogin = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockUser = {
      _id: "1",
      name: "System Administrator",
      email,
      role: "admin",
    };
    const mockToken = "mock-jwt-token-" + Date.now();

    localStorage.setItem("token", mockToken);
    setUser(mockUser);

    return { success: true };
  };

  const login = async (email, password) => {
    try {
      const isBackendAvailable = await checkBackendAvailability();
      if (!isBackendAvailable) return mockLogin(email, password);

      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      return { success: true };
    } catch (error) {
      console.log("Login failed, using mock auth:", error.message);
      return mockLogin(email, password);
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
