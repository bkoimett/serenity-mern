// src/components/admin/ProtectedRoute.jsx
import { useAuth } from "../../context/AuthContext";
import { AdminLogin } from "../../pages/admin/AdminLogin";

export function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, isStaff, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-9V4m0 7h.01M12 12h.01M12 12a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            Admin rights required for this section.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            You are logged in as {isStaff ? "Staff" : "User"}
          </p>
        </div>
      </div>
    );
  }

  return children;
}
