// src/components/BlogPreview.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "./BlogCard";
import { ArrowRight, Database, Laptop } from "lucide-react";
import { API_BASE_URL } from "../config/api"; 

export function BlogPreview() {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingLocalData, setUsingLocalData] = useState(false);

  const API_BASE = `${API_BASE_URL}/api`; 

  // Fetch latest published blogs from backend
  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
      console.log("Fetching featured blogs from backend...");
      const response = await fetch(`${API_BASE}/blog`);

      if (response.ok) {
        const data = await response.json();
        const blogs = data.blogs || data;

        // Get only the 2 most recent published blogs
        const recentBlogs = blogs
          .filter((blog) => blog.status === "published")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 2);

        setFeaturedBlogs(recentBlogs);
        setUsingLocalData(false);
        console.log("✅ Loaded featured blogs from database");
      } else {
        throw new Error("Backend request failed");
      }
    } catch (error) {
      console.log("Backend unavailable, using local data:", error.message);
      setUsingLocalData(true);

      // Fallback to local storage
      const savedBlogs = localStorage.getItem("serenity-blogs");
      if (savedBlogs) {
        const allBlogs = JSON.parse(savedBlogs);
        const publishedBlogs = allBlogs.filter(
          (blog) => blog.status === "published"
        );
        const recentBlogs = publishedBlogs
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 2);
        setFeaturedBlogs(recentBlogs);
      } else {
        // Ultimate fallback - sample data
        setFeaturedBlogs([
          {
            _id: "1",
            title: "Understanding Addiction Recovery",
            excerpt:
              "Learn about the journey of recovery and what to expect in the first 30 days of treatment.",
            author: { name: "Dr. Sarah Johnson" },
            createdAt: new Date("2024-01-15"),
            tags: ["Recovery", "Treatment"],
            status: "published",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Data Source Indicator */}
        {usingLocalData && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 text-yellow-800">
              <Laptop className="w-5 h-5" />
              <div className="text-sm">
                <strong>Local Mode</strong> - Showing locally stored blog posts
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover helpful articles and resources for your recovery journey.
          </p>
        </div>

        {/* Featured Blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        {/* Show message if no blogs */}
        {featuredBlogs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No blog posts available yet.</p>
            <Link
              to="/admin/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create your first blog post
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        )}

        {/* CTA to Blog Page - Only show if we have blogs */}
        {featuredBlogs.length > 0 && (
          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
            >
              View All Articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
