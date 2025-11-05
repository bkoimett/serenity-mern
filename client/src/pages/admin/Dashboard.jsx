// src/pages/admin/Dashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Eye,
  Calendar,
} from "lucide-react";

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalContacts: 0,
    totalMessages: 0,
    monthlyVisitors: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Mock data - replace with API calls
    setStats({
      totalBlogs: 12,
      totalContacts: 47,
      totalMessages: 23,
      monthlyVisitors: 1245,
    });

    setRecentActivity([
      {
        id: 1,
        action: "New blog post published",
        user: "You",
        time: "2 hours ago",
      },
      {
        id: 2,
        action: "Contact form submission",
        user: "John Doe",
        time: "4 hours ago",
      },
      { id: 3, action: "Blog post updated", user: "You", time: "1 day ago" },
      {
        id: 4,
        action: "New user registered",
        user: "Sarah Wilson",
        time: "2 days ago",
      },
    ]);
  }, []);

  const statCards = [
    {
      title: "Total Blog Posts",
      value: stats.totalBlogs,
      icon: FileText,
      color: "blue",
      change: "+2 this month",
    },
    {
      title: "Contact Submissions",
      value: stats.totalContacts,
      icon: Users,
      color: "green",
      change: "+5 today",
    },
    {
      title: "Unread Messages",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "orange",
      change: "3 urgent",
    },
    {
      title: "Monthly Visitors",
      value: stats.monthlyVisitors.toLocaleString(),
      icon: TrendingUp,
      color: "purple",
      change: "+12.5%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || "Admin"}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with Serenity Place today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          const colorClasses = {
            blue: "bg-blue-500",
            green: "bg-green-500",
            orange: "bg-orange-500",
            purple: "bg-purple-500",
          };

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${
                    colorClasses[card.color]
                  } rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {card.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {card.value}
              </h3>
              <p className="text-sm text-gray-600">{card.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{activity.user}</span>
                    <span className="mx-2">•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-left group">
              <FileText className="w-8 h-8 text-blue-600 mb-2" />
              <div className="font-medium text-gray-900">New Blog Post</div>
              <div className="text-sm text-gray-600">Create article</div>
            </button>

            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-left group">
              <Eye className="w-8 h-8 text-green-600 mb-2" />
              <div className="font-medium text-gray-900">View Site</div>
              <div className="text-sm text-gray-600">Visit website</div>
            </button>

            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-left group">
              <Users className="w-8 h-8 text-orange-600 mb-2" />
              <div className="font-medium text-gray-900">Contacts</div>
              <div className="text-sm text-gray-600">Manage leads</div>
            </button>

            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-left group">
              <Calendar className="w-8 h-8 text-purple-600 mb-2" />
              <div className="font-medium text-gray-900">Schedule</div>
              <div className="text-sm text-gray-600">View calendar</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
