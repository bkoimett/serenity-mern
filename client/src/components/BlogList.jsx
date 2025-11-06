// client/src/components/BlogList.jsx
import { useState, useEffect } from "react";
import { BlogCard } from "./BlogCard";
import { Search, Filter, Database, Laptop } from "lucide-react";

export function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [usingLocalData, setUsingLocalData] = useState(false);

  const API_BASE = "http://localhost:5000/api";

  // Fetch published blogs from API
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
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

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">Loading blogs...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recovery Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert advice, personal stories, and guidance for your recovery
            journey.
          </p>
        </div>

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
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "No blog posts available yet"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
