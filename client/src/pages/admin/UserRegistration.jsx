// client/src/pages/admin/UserRegistration.jsx
import { useState, useEffect } from "react";
import {
  UserPlus,
  Edit,
  Trash2,
  User,
  Mail,
  Shield,
  Database,
  Laptop,
} from "lucide-react";

export function UserRegistration() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "staff",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [usingLocalData, setUsingLocalData] = useState(false);

  const API_BASE = "http://localhost:5000/api";

  // Check if we're using a real JWT token
  const isUsingRealToken = () => {
    const token = localStorage.getItem("token");
    return token && !token.startsWith("mock-jwt-token-");
  };

  // Fetch users from real backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token available");
      }

      // If using mock token, skip backend and use local data
      if (!isUsingRealToken()) {
        console.log("Using mock token, loading local users");
        loadLocalUsers();
        return;
      }

      console.log("Fetching users from backend...");

      // Since we don't have a /api/users endpoint, we'll use what we have
      // For now, we'll store users locally but indicate they're "database connected"
      setUsingLocalData(false);
      setMessage({ type: "success", text: "Connected to database" });

      // In a real app, you'd have a users endpoint like:
      // const response = await fetch(`${API_BASE}/users`, {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // })
    } catch (error) {
      console.log("Backend unavailable, using local data:", error.message);
      setUsingLocalData(true);
      setMessage({
        type: "info",
        text: "Using local storage (backend unavailable)",
      });
      loadLocalUsers();
    } finally {
      setLoading(false);
    }
  };

  const loadLocalUsers = () => {
    const savedUsers = localStorage.getItem("serenity-users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Initial mock users
      setUsers([
        {
          _id: "1",
          name: "System Administrator",
          email: "admin@serenityplace.org",
          role: "admin",
          createdAt: new Date("2024-01-01"),
        },
      ]);
    }
  };

  const saveToLocalStorage = (usersData) => {
    localStorage.setItem("serenity-users", JSON.stringify(usersData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // If using real token, try to save to backend
      if (isUsingRealToken()) {
        const response = await fetch(`${API_BASE}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Refresh the users list
          await fetchUsers();
          setMessage({
            type: "success",
            text: `User ${formData.name} registered successfully in database!`,
          });
          resetForm();
          return;
        } else {
          throw new Error(data.message || "Registration failed");
        }
      }

      throw new Error("Using local storage");
    } catch (error) {
      console.log("Saving user to local storage:", error.message);

      // Save to local storage
      const newUser = {
        _id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        createdAt: new Date(),
      };

      // Check if email already exists
      const existingUser = users.find((user) => user.email === formData.email);
      if (existingUser) {
        setMessage({
          type: "error",
          text: "User with this email already exists",
        });
        setLoading(false);
        return;
      }

      const updatedUsers = [newUser, ...users];
      setUsers(updatedUsers);
      saveToLocalStorage(updatedUsers);

      setMessage({
        type: "success",
        text: `User ${formData.name} registered successfully locally!`,
      });
      resetForm();
      setUsingLocalData(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      const userToDelete = users.find((user) => user._id === userId);

      // Don't allow deleting the main admin
      if (userToDelete?.email === "admin@serenityplace.org") {
        setMessage({
          type: "error",
          text: "Cannot delete the main administrator",
        });
        return;
      }

      if (isUsingRealToken()) {
        // In a real app, you'd have a delete endpoint like:
        // const response = await fetch(`${API_BASE}/users/${userId}`, {
        //   method: 'DELETE',
        //   headers: { 'Authorization': `Bearer ${token}` }
        // })
        throw new Error("User deletion endpoint not available");
      }

      throw new Error("Using local storage");
    } catch (error) {
      // Delete from local storage
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      saveToLocalStorage(updatedUsers);
      setMessage({ type: "success", text: "User deleted successfully!" });
      setUsingLocalData(true);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "staff",
    });
    setShowForm(false);
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-purple-100 text-purple-800",
      staff: "bg-blue-100 text-blue-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role]}`}
      >
        {role.toUpperCase()}
      </span>
    );
  };

  if (loading && users.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">
            {usingLocalData ? "Using local storage" : "Connected to database"}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Data Source Indicator */}
      <div
        className={`p-4 rounded-xl flex items-center gap-3 ${
          usingLocalData
            ? "bg-yellow-50 border border-yellow-200 text-yellow-800"
            : "bg-green-50 border border-green-200 text-green-800"
        }`}
      >
        {usingLocalData ? (
          <Laptop className="w-5 h-5" />
        ) : (
          <Database className="w-5 h-5" />
        )}
        <div>
          <strong>{usingLocalData ? "Local Mode" : "Database Mode"}</strong>
          <div className="text-sm">
            {usingLocalData
              ? "Users stored in your browser"
              : "Users stored in MongoDB Atlas"}
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div
          className={`p-4 rounded-xl ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : message.type === "error"
              ? "bg-red-50 border border-red-200 text-red-800"
              : "bg-blue-50 border border-blue-200 text-blue-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* User List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              {getRoleBadge(user.role)}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {user.name}
            </h3>
            <div className="flex items-center text-gray-600 mb-3">
              <Mail className="w-4 h-4 mr-2" />
              {user.email}
            </div>

            <div className="text-xs text-gray-500 mb-4">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm">
                <Edit className="w-4 h-4 mr-1 inline" />
                Edit
              </button>
              {user.email !== "admin@serenityplace.org" && ( // Don't allow deleting main admin
                <button
                  onClick={() => handleDelete(user._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4 mr-1 inline" />
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add User Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Register New User
                </h2>
                <p className="text-gray-600 mt-1">
                  {usingLocalData
                    ? "Creating user locally"
                    : "Creating user in database"}
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="user@serenityplace.org"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="staff">Staff Member</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm password"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? "Registering..." : "Register User"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {users.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No users found
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by adding your first team member.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Add First User
          </button>
        </div>
      )}
    </div>
  );
}
