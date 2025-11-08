// src/components/BackendStatus.jsx
import { useState, useEffect } from "react";
import { Server, Wifi, WifiOff } from "lucide-react";
import { API_BASE_URL } from "../config/api"; 

export function BackendStatus() {
  const [backendOnline, setBackendOnline] = useState(null);

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer mock-token`,
        },
      });
      // If we get any response (even 401), backend is running
      setBackendOnline(true);
    } catch (error) {
      setBackendOnline(false);
    }
  };

  if (backendOnline === null) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
        backendOnline
          ? "bg-green-100 text-green-800 border border-green-200"
          : "bg-red-100 text-red-800 border border-red-200"
      }`}
    >
      {backendOnline ? (
        <Wifi className="w-4 h-4" />
      ) : (
        <WifiOff className="w-4 h-4" />
      )}
      <span>Backend: {backendOnline ? "Online" : "Offline"}</span>
    </div>
  );
}
