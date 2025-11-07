// src/components/Header.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import logo from "/the-serenity-place-logo-2026.svg"; // path goes UP one level from components to src

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" }, // ADDED GALLERY LINK
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center">
              <img
                src={logo}
                alt="The Serenity Place Logo"
                className="h-12 object-contain" // Tailwind styles
              />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">
                The Serenity Place
              </span>
              <span className="block text-sm text-primary-600">
                Rehabilitation Center Nairobi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === item.href
                    ? "text-primary-600"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+254722970951"
              className="flex items-center text-gray-600 hover:text-primary-600"
            >
              <Phone className="w-4 h-4 mr-2" />
              (+254) 722 970 951-HELP
            </a>
            <Link to="/#contact" className="btn-primary">
              Get Help
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-50"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="tel:+254722970951"
                  className="flex items-center px-3 py-2 text-gray-600"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (+254) 722 970 951-HELP
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
