// src/pages/admin/BlogManager.jsx
export function BlogManager() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Manager</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          + New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">
          Blog management interface coming soon...
        </p>
        <p className="text-sm text-gray-500 mt-2">
          This is where you'll create, edit, and manage blog posts.
        </p>
      </div>
    </div>
  );
}
