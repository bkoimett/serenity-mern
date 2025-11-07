// src/components/BlogCard.jsx
import { Link } from "react-router-dom";
import { Calendar, User, Tag } from "lucide-react";
import { format } from "date-fns";

export function BlogCard({ blog }) {
  return (
    <article className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Featured Image */}
      <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-500 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
            Featured
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {blog.author?.name || "Dr.Elizabeth Koimett"}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {format(new Date(blog.createdAt), "MMM dd, yyyy")}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {blog.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <Link
          to={`/blog/${blog._id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        >
          Read More
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
