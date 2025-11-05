// src/components/admin/AdminLayout.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react";

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Contacts", href: "/admin/contacts", icon: Users },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <span className="text-lg font-semibold text-gray-900">
                Admin Panel
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="mt-4 px-4 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
          {/* Sidebar Header */}
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-gray-900">Admin</span>
              <span className="block text-xs text-gray-500">
                Serenity Place
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-3 text-sm focus:outline-none"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {user?.name?.charAt(0) || "A"}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="font-medium text-gray-900">
                    {user?.name || "Admin"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.role || "Administrator"}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="font-medium text-gray-900">
                      {user?.name}
                    </div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
