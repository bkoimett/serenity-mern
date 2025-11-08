// client/src/components/BlogList.jsx
import { useState, useEffect } from "react";
import { BlogCard } from "./BlogCard";
import { BlogCardSkeleton } from "./BlogCardSkeleton";
import { Search, Filter, Laptop } from "lucide-react";
import {
  ScrollAnimation,
  QuickStaggerAnimation,
  StaggerItem,
} from "../components/animations/ScrollAnimation";
import { API_BASE_URL } from "../config/api"; 

export function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [usingLocalData, setUsingLocalData] = useState(false);

  const API_BASE = `${API_BASE_URL}/api`; 

  // Fetch published blogs from API
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching published blogs from backend...");
      const response = await fetch(`${API_BASE}/blog`);

      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs || []);
        setUsingLocalData(false);
        console.log("✅ Loaded published blogs from database");
      } else {
        throw new Error("Backend request failed");
      }
    } catch (error) {
      console.log("Backend unavailable, using local data:", error.message);
      setError(error.message);
      setUsingLocalData(true);
      // Fallback to local storage
      const savedBlogs = localStorage.getItem("serenity-blogs");
      if (savedBlogs) {
        const allBlogs = JSON.parse(savedBlogs);
        // Only show published blogs
        const publishedBlogs = allBlogs.filter(
          (blog) => blog.status === "published"
        );
        setBlogs(publishedBlogs);
      } else {
        setBlogs([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.tags &&
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  if (error && blogs.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-2xl mx-auto mb-6">
            <div className="text-red-600 mb-4">Error: {error}</div>
            <button
              onClick={fetchBlogs}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-teal-600 text-white py-16 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation yOffset={30} duration={0.6}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Recovery Insights
            </h1>
          </ScrollAnimation>

          <ScrollAnimation delay={0.1} yOffset={20} duration={0.6}>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Expert advice, personal stories, and guidance for your recovery
              journey.
            </p>
          </ScrollAnimation>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}

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

        {/* Search Bar */}
        {!loading && blogs.length > 0 && (
          <ScrollAnimation delay={0.2} yOffset={20}>
            <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search articles by title, content, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </ScrollAnimation>
        )}

        {/* Blog Grid */}
        <ScrollAnimation delay={0.2} yOffset={20}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
            {loading ? (
              // Show 6 skeleton cards while loading
              Array.from({ length: 6 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))
            ) : filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <BlogCard key={blog._id || blog.id} blog={blog} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchTerm ? "No articles found" : "No blog posts yet"}
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Check back later for new content."}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
