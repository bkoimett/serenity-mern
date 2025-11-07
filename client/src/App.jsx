// src/App.jsx - UPDATED VERSION
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { About } from "./pages/About";
import { Gallery } from "./pages/Gallery.jsx";
import { BlogPost } from "./components/BlogPost";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { Dashboard } from "./pages/admin/Dashboard";
import { BlogManager } from "./pages/admin/BlogManager";
import { AdminLayout } from "./components/admin/AdminLayout";
import { UserRegistration } from "./pages/admin/UserRegistration";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { GalleryManager } from "./pages/admin/GalleryManager.jsx";
import { Layout } from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/blog"
            element={
              <Layout>
                <Blog />
              </Layout>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Layout>
                <BlogPost />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/gallery"
            element={
              <Layout>
                <Gallery />
              </Layout>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Main Admin Layout - Accessible to both admin and staff */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={false}>
                {" "}
                {/* EXPLICIT: staff can access */}
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="users" element={<UserRegistration />} />
            <Route path="gallery" element={<GalleryManager />} />

            {/* Admin-only routes */}
            <Route
              path="contacts"
              element={
                <ProtectedRoute adminOnly={true}>
                  {" "}
                  {/* EXPLICIT: admin only */}
                  <div className="p-6">Contacts Manager - Coming Soon</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="messages"
              element={
                <ProtectedRoute adminOnly={true}>
                  {" "}
                  {/* EXPLICIT: admin only */}
                  <div className="p-6">Messages Manager - Coming Soon</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute adminOnly={true}>
                  {" "}
                  {/* EXPLICIT: admin only */}
                  <div className="p-6">Settings - Coming Soon</div>
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <Layout>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      404
                    </h1>
                    <p className="text-gray-600 mb-4">Page not found</p>
                    <a href="/" className="text-blue-600 hover:text-blue-700">
                      Return to Home
                    </a>
                  </div>
                </div>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
