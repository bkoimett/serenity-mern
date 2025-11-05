// src/components/BlogList.jsx
import { useState, useEffect } from "react";
import { BlogCard } from "./BlogCard";
import { Search, Filter } from "lucide-react";

export function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with API call
  useEffect(() => {
    const mockBlogs = [
      {
        _id: "1",
        title: "Understanding Addiction Recovery",
        excerpt:
          "Learn about the journey of recovery and what to expect in the first 30 days of treatment.",
        content: "Full content about addiction recovery...",
        author: { name: "Dr. Sarah Johnson" },
        createdAt: new Date("2024-01-15"),
        tags: ["Recovery", "Treatment"],
        featuredImage: "/api/placeholder/400/250",
      },
      {
        _id: "2",
        title: "The Role of Family in Recovery",
        excerpt:
          "How family support can significantly impact the success of addiction treatment.",
        content: "Full content about family support...",
        author: { name: "Dr. Mike Chen" },
        createdAt: new Date("2024-01-10"),
        tags: ["Family", "Support"],
        featuredImage: "/api/placeholder/400/250",
      },
      {
        _id: "3",
        title: "Mindfulness Practices for Sobriety",
        excerpt:
          "Incorporating mindfulness techniques to maintain long-term sobriety and mental wellness.",
        content: "Full content about mindfulness...",
        author: { name: "Dr. Emily Rodriguez" },
        createdAt: new Date("2024-01-05"),
        tags: ["Mindfulness", "Wellness"],
        featuredImage: "/api/placeholder/400/250",
      },
    ];

    setBlogs(mockBlogs);
    setLoading(false);
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading blogs...</div>
          </div>
        </div>
      </div>
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
              Try adjusting your search terms or browse all articles.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
