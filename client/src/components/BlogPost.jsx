// src/components/BlogPost.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Clock,
  Share2,
  Database,
  Laptop,
} from "lucide-react";
import { format } from "date-fns";
import {
  ScrollAnimation,
  QuickStaggerAnimation,
  StaggerItem,
} from "../components/animations/ScrollAnimation";
import { BlogPostSkeleton } from "./BlogPostSkeleton"; // Add this import
import { API_BASE_URL } from "../config/api"; 

export function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [usingLocalData, setUsingLocalData] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = `${API_BASE_URL}/api`; 

  // Fetch single blog post from backend
  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      console.log(`Fetching blog post ${id} from backend...`);
      const response = await fetch(`${API_BASE}/blog/${id}`);

      if (response.ok) {
        const blogData = await response.json();
        setBlog(blogData);
        setUsingLocalData(false);

        // Fetch related blogs (other published blogs)
        fetchRelatedBlogs(blogData);
        console.log("✅ Loaded blog post from database");
      } else if (response.status === 404) {
        throw new Error("Blog post not found");
      } else {
        throw new Error("Backend request failed");
      }
    } catch (error) {
      console.log("Backend unavailable, trying local data:", error.message);
      setUsingLocalData(true);

      // Try to find in local storage
      const savedBlogs = localStorage.getItem("serenity-blogs");
      if (savedBlogs) {
        const allBlogs = JSON.parse(savedBlogs);
        const foundBlog = allBlogs.find(
          (blog) => blog._id === id && blog.status === "published"
        );

        if (foundBlog) {
          setBlog(foundBlog);
          // Get related blogs from local storage
          const related = allBlogs
            .filter((b) => b._id !== id && b.status === "published")
            .slice(0, 2);
          setRelatedBlogs(related);
        } else {
          setError("Blog post not found");
        }
      } else {
        setError("Blog post not found");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (currentBlog) => {
    try {
      const response = await fetch(`${API_BASE}/blog`);
      if (response.ok) {
        const data = await response.json();
        const blogs = data.blogs || data;
        const related = blogs
          .filter((b) => b._id !== currentBlog._id && b.status === "published")
          .slice(0, 2);
        setRelatedBlogs(related);
      }
    } catch (error) {
      console.log("Could not fetch related blogs:", error.message);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return <BlogPostSkeleton />;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            {error || "The blog post you're looking for doesn't exist."}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Data Source Indicator */}
        {usingLocalData && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 text-yellow-800">
              <Laptop className="w-5 h-5" />
              <div className="text-sm">
                <strong>Local Mode</strong> - Showing locally stored blog post
              </div>
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <ScrollAnimation delay={0.1} yOffset={20} duration={0.6}>
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </ScrollAnimation>

        {/* Article Header */}
        <ScrollAnimation delay={0.2} yOffset={30} duration={0.6}>
          <article className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Featured Image */}
            <div className="h-64 bg-gradient-to-br from-blue-500 to-teal-500 relative">
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Article Content */}
            <div className="p-8">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
                {/* Author */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {blog.author?.name || "Serenity Place Team"}
                    </div>
                    <div className="text-xs text-gray-500">
                      Addiction Specialist
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
                </div>

                {/* Read Time */}
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {blog.readTime || "5 min read"}
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="flex items-center text-gray-500 hover:text-blue-600 transition-colors ml-auto"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none prose-blue prose-headings:font-bold prose-p:text-gray-700 prose-li:text-gray-700 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:italic prose-blockquote:text-gray-700"
                dangerouslySetInnerHTML={{
                  __html:
                    blog.content ||
                    `<p>${blog.excerpt}</p><p>Full content coming soon...</p>`,
                }}
              />

              {/* Author Bio */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      About {blog.author?.name || "Our Team"}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {blog.author?.bio ||
                        "Our team of addiction specialists at Serenity Place is dedicated to providing compassionate, evidence-based treatment for substance abuse and mental health disorders."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </ScrollAnimation>

        {/* Related Articles */}
        <ScrollAnimation delay={0.2} yOffset={20}>
          {relatedBlogs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog._id}
                    to={`/blog/${relatedBlog._id}`}
                    className="block bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {relatedBlog.author?.name || "Serenity Place"}
                      </span>
                      <span>{relatedBlog.readTime || "5 min read"}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </ScrollAnimation>

        {/* CTA Section */}
        <ScrollAnimation delay={0.3} yOffset={20}>
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need Immediate Help?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you or a loved one is struggling with addiction, our
                compassionate team is available 24/7 to provide support and
                guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+254722970951"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Call Now: (+254) 722 970951
                </a>
                <Link
                  to="/#contact"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
