// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { About } from "./pages/About";
import { BlogPost } from "./components/BlogPost";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { Dashboard } from "./pages/admin/Dashboard";
import { BlogManager } from "./pages/admin/BlogManager";
import { AdminLayout } from "./components/admin/AdminLayout";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
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

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="blog" element={<BlogManager />} />
            <Route
              path="contacts"
              element={
                <div className="p-6">Contacts Manager - Coming Soon</div>
              }
            />
            <Route
              path="messages"
              element={
                <div className="p-6">Messages Manager - Coming Soon</div>
              }
            />
            <Route
              path="settings"
              element={<div className="p-6">Settings - Coming Soon</div>}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
