// src/pages/admin/UserRegistration.jsx
import { useState, useEffect } from "react";
import {
  UserPlus,
  Edit,
  Trash2,
  Search,
  User,
  Mail,
  Shield,
} from "lucide-react";

export function UserRegistration() {
  // CHANGED: Export UserRegistration instead of UserManagement
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "staff",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  // Load users from localStorage on component mount
  useEffect(() => {
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
        {
          _id: "2",
          name: "John Therapist",
          email: "john@serenityplace.org",
          role: "staff",
          createdAt: new Date("2024-01-05"),
        },
      ]);
    }
  }, []);

  // Save to localStorage whenever users change
  useEffect(() => {
    localStorage.setItem("serenity-users", JSON.stringify(users));
  }, [users]);

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
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create new user (without password for security)
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

      // Add to local state
      setUsers((prev) => [newUser, ...prev]);

      setMessage({
        type: "success",
        text: `User ${formData.name} registered successfully!`,
      });

      // Reset form and close modal
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "staff",
      });
      setShowForm(false);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      // Don't allow deleting the main admin
      const userToDelete = users.find((user) => user._id === userId);
      if (userToDelete?.email === "admin@serenityplace.org") {
        setMessage({
          type: "error",
          text: "Cannot delete the main administrator",
        });
        return;
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Remove from local state
      setUsers((prev) => prev.filter((user) => user._id !== userId));

      setMessage({
        type: "success",
        text: "User deleted successfully!",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to delete user.",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage staff and admin accounts</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Development Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-blue-800 text-sm">
          <strong>Development Mode:</strong> Users are stored locally in your
          browser.
        </p>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div
          className={`p-4 rounded-xl ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
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
                  Create new staff or admin account
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
