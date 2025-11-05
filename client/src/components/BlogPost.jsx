// src/components/BlogPost.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, Tag, ArrowLeft, Clock, Share2 } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

export function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  // Mock data - replace with API call to fetch single blog post
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockBlog = {
          _id: id,
          title: "Understanding Addiction Recovery: A Comprehensive Guide",
          content: `
            <h2>The Journey Begins</h2>
            <p>Addiction recovery is a transformative journey that requires courage, commitment, and professional support. At Serenity Place, we believe that every individual has the strength to overcome addiction and rebuild their life.</p>
            
            <h2>What to Expect in Early Recovery</h2>
            <p>The first 30 days of treatment are crucial for establishing a solid foundation. During this period, clients can expect:</p>
            <ul>
              <li>Comprehensive medical assessment and detoxification if needed</li>
              <li>Individual therapy sessions with licensed professionals</li>
              <li>Group therapy to build community and shared understanding</li>
              <li>Introduction to coping strategies and relapse prevention</li>
              <li>Family education and involvement programs</li>
            </ul>
            
            <h2>The Role of Professional Support</h2>
            <p>Our team of addiction specialists, therapists, and medical professionals work together to create personalized treatment plans. Evidence-based approaches combined with compassionate care provide the best opportunity for lasting recovery.</p>
            
            <h2>Long-Term Success Strategies</h2>
            <p>Recovery doesn't end when treatment does. We focus on building skills and resources for long-term success, including aftercare planning, alumni programs, and ongoing support systems.</p>
            
            <blockquote>
              "Recovery is not about perfection; it's about progress. Every day sober is a victory worth celebrating."
            </blockquote>
          `,
          excerpt:
            "Learn about the journey of recovery and what to expect in the first 30 days of treatment.",
          author: {
            name: "Dr. Sarah Johnson",
            bio: "Board-certified addiction psychiatrist with 15 years of experience in substance abuse treatment.",
            image: "/api/placeholder/100/100",
          },
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-15"),
          readTime: "8 min read",
          tags: ["Recovery", "Treatment", "Mental Health", "Wellness"],
          featuredImage: "/api/placeholder/800/400",
          relatedPosts: ["2", "3"],
        };

        setBlog(mockBlog);

        // Mock related blogs
        const mockRelatedBlogs = [
          {
            _id: "2",
            title: "The Role of Family in Recovery",
            excerpt:
              "How family support can significantly impact the success of addiction treatment.",
            author: { name: "Dr. Mike Chen" },
            createdAt: new Date("2024-01-10"),
            tags: ["Family", "Support"],
            readTime: "6 min read",
          },
          {
            _id: "3",
            title: "Mindfulness Practices for Sobriety",
            excerpt:
              "Incorporating mindfulness techniques to maintain long-term sobriety.",
            author: { name: "Dr. Emily Rodriguez" },
            createdAt: new Date("2024-01-05"),
            tags: ["Mindfulness", "Wellness"],
            readTime: "5 min read",
          },
        ];

        setRelatedBlogs(mockRelatedBlogs);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog" className="btn-primary inline-flex items-center">
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
        {/* Back to Blog */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
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
                    {blog.author.name}
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
                {blog.readTime}
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

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none prose-blue prose-headings:font-bold prose-p:text-gray-700 prose-li:text-gray-700 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:italic prose-blockquote:text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    About {blog.author.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {blog.author.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
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
                    <span>{relatedBlog.author.name}</span>
                    <span>{relatedBlog.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
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
                href="tel:5551234357"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Call Now: (555) 123-HELP
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
      </div>
    </div>
  );
}
