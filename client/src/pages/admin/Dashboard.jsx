// src/pages/admin/Dashboard.jsx - UPDATED FOR STAFF
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Eye,
  Calendar,
  Edit,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Dashboard() {
  const { user, isAdmin, isStaff } = useAuth();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalContacts: 0,
    totalMessages: 0,
    monthlyVisitors: 0,
    myBlogs: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Mock data - replace with API calls
    setStats({
      totalBlogs: isAdmin ? 12 : 3, // Staff only sees their count
      totalContacts: isAdmin ? 47 : 0, // Staff might not see contacts
      totalMessages: isAdmin ? 23 : 0,
      monthlyVisitors: isAdmin ? 1245 : 0,
      myBlogs: 3,
    });

    setRecentActivity([
      {
        id: 1,
        action: "New blog post published",
        user: "You",
        time: "2 hours ago",
      },
      { id: 2, action: "Blog post updated", user: "You", time: "1 day ago" },
      ...(isAdmin
        ? [
            {
              id: 3,
              action: "Contact form submission",
              user: "John Doe",
              time: "4 hours ago",
            },
          ]
        : []),
    ]);
  }, [isAdmin]);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          {isAdmin ? "Administrator Dashboard" : "Staff Dashboard"} •{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* My Blogs Stat - Visible to all */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">My Blog Posts</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.myBlogs}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Edit className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/admin/blog"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Manage my posts →
            </Link>
          </div>
        </div>

        {/* Total Blogs - Visible to all */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Blog Posts
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalBlogs}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Admin-only stats */}
        {isAdmin && (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contacts</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalContacts}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Monthly Visitors
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.monthlyVisitors}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/blog"
            className="bg-blue-50 hover:bg-blue-100 rounded-xl p-4 text-center transition-colors"
          >
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium text-gray-900">Manage Blogs</p>
            <p className="text-sm text-gray-600">Create and edit posts</p>
          </Link>

          {isAdmin && (
            <Link
              to="/admin/users"
              className="bg-green-50 hover:bg-green-100 rounded-xl p-4 text-center transition-colors"
            >
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Manage Users</p>
              <p className="text-sm text-gray-600">View team members</p>
            </Link>
          )}

          <Link
            to="/admin/blog?create=new"
            className="bg-purple-50 hover:bg-purple-100 rounded-xl p-4 text-center transition-colors"
          >
            <Plus className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="font-medium text-gray-900">New Blog Post</p>
            <p className="text-sm text-gray-600">Write a new article</p>
          </Link>

          {isAdmin && (
            <Link
              to="/admin/contacts"
              className="bg-orange-50 hover:bg-orange-100 rounded-xl p-4 text-center transition-colors"
            >
              <MessageSquare className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Contacts</p>
              <p className="text-sm text-gray-600">View inquiries</p>
            </Link>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">by {activity.user}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
