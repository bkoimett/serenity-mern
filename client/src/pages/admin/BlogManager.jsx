// client/src/pages/admin/BlogManager.jsx
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { API_BASE_URL } from "../../config/api"; 

export function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    status: "draft",
  });
  const [message, setMessage] = useState("");

  const API_BASE = `${API_BASE_URL}/api`; 

  // Fetch blogs from real backend
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/blog/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
        setMessage("");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        // Fallback to local storage if backend fails
        const savedBlogs = localStorage.getItem("serenity-blogs");
        if (savedBlogs) {
          setBlogs(JSON.parse(savedBlogs));
        }
      }
    } catch (error) {
      console.error("Backend unavailable, using local data");
      setMessage("Backend connection failed. Using local data.");
      // Fallback to local storage
      const savedBlogs = localStorage.getItem("serenity-blogs");
      if (savedBlogs) {
        setBlogs(JSON.parse(savedBlogs));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const url = editingBlog
        ? `${API_BASE}/blog/${editingBlog._id}`
        : `${API_BASE}/blog`;

      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchBlogs(); // Refresh the list
        resetForm();
        setMessage(
          editingBlog
            ? "Blog updated successfully!"
            : "Blog created successfully!"
        );

        // Also save to local storage as backup
        const updatedBlogs = editingBlog
          ? blogs.map((blog) => (blog._id === editingBlog._id ? data : blog))
          : [data, ...blogs];
        localStorage.setItem("serenity-blogs", JSON.stringify(updatedBlogs));
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("Network error. Saving locally instead.");
      // Fallback to local storage
      const blogData = {
        _id: editingBlog ? editingBlog._id : Date.now().toString(),
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        status: formData.status,
        author: { name: "You" },
        createdAt: editingBlog ? editingBlog.createdAt : new Date(),
        updatedAt: new Date(),
      };

      if (editingBlog) {
        const updatedBlogs = blogs.map((blog) =>
          blog._id === editingBlog._id ? blogData : blog
        );
        setBlogs(updatedBlogs);
        localStorage.setItem("serenity-blogs", JSON.stringify(updatedBlogs));
      } else {
        const updatedBlogs = [blogData, ...blogs];
        setBlogs(updatedBlogs);
        localStorage.setItem("serenity-blogs", JSON.stringify(updatedBlogs));
      }
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      tags: blog.tags ? blog.tags.join(", ") : "",
      status: blog.status,
    });
    setShowForm(true);
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog post?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/blog/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchBlogs();
        setMessage("Blog deleted successfully!");
        // Also update local storage
        const updatedBlogs = blogs.filter((blog) => blog._id !== blogId);
        localStorage.setItem("serenity-blogs", JSON.stringify(updatedBlogs));
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("Network error. Deleting locally.");
      // Fallback to local deletion
      const updatedBlogs = blogs.filter((blog) => blog._id !== blogId);
      setBlogs(updatedBlogs);
      localStorage.setItem("serenity-blogs", JSON.stringify(updatedBlogs));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      tags: "",
      status: "draft",
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  const getStatusBadge = (status) => {
    const styles = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status}
      </span>
    );
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

  if (loading && blogs.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse">Loading blogs from database...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">
            Create and manage blog posts in database
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </button>
      </div>

      {/* Message Alert */}
      {message && (
        <div
          className={`p-4 rounded-xl ${
            message.includes("Error")
              ? "bg-red-50 border border-red-200 text-red-800"
              : message.includes("locally")
              ? "bg-yellow-50 border border-yellow-200 text-yellow-800"
              : "bg-green-50 border border-green-200 text-green-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* Rest of the component remains the same as before */}
      {/* Blog Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter blog post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the blog post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Full blog post content"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="comma, separated, tags"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editingBlog
                  ? "Update Post"
                  : "Create Post"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Blogs List */}
      <div className="space-y-4">
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Blogs List */}
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Blog Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {blog.title}
                  </h3>
                  {getStatusBadge(blog.status)}
                </div>

                <p className="text-gray-600 mb-3 line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {blog.author?.name || "Unknown Author"}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                  </div>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center text-red-600 hover:text-red-700 font-medium py-2 px-3 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredBlogs.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No blog posts found
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first blog post.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Create First Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
