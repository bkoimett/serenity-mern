// src/components/BlogPreview.jsx
import { Link } from "react-router-dom";
import { BlogCard } from "./BlogCard";
import { ArrowRight } from "lucide-react";

export function BlogPreview() {
  // Sample featured blogs for homepage
  const featuredBlogs = [
    {
      _id: "1",
      title: "Understanding Addiction Recovery",
      excerpt:
        "Learn about the journey of recovery and what to expect in the first 30 days of treatment.",
      author: { name: "Dr. Sarah Johnson" },
      createdAt: new Date("2024-01-15"),
      tags: ["Recovery", "Treatment"],
    },
    {
      _id: "2",
      title: "The Role of Family in Recovery",
      excerpt:
        "How family support can significantly impact the success of addiction treatment.",
      author: { name: "Dr. Mike Chen" },
      createdAt: new Date("2024-01-10"),
      tags: ["Family", "Support"],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* CTA to Blog Page */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
          >
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
