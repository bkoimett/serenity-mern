// src/components/Footer.jsx
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import logo from "/the-serenity-place-logo-2026.svg";

export function Footer() {
  // tiktok icon
  const TikTokIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center">
                <img
                  src={logo}
                  alt="The Serenity Place Logo"
                  className="h-12 object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                  The Serenity Place
                </span>
                <span className="block text-sm text-blue-300">
                  Rehabilitation Center Nairobi
                </span>
              </div>
            </Link>
            <p className="text-blue-100 mb-4 max-w-md leading-relaxed">
              Providing compassionate, professional addiction treatment in a
              tranquil environment. Your journey to recovery starts here.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/theserenityplacerehab"
                className="text-blue-200 hover:text-white transition-all duration-200 hover:scale-110 p-2 rounded-full bg-white/5 hover:bg-white/10"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/_SerenityPlace_"
                className="text-blue-200 hover:text-white transition-all duration-200 hover:scale-110 p-2 rounded-full bg-white/5 hover:bg-white/10"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/theserenityplacerehab"
                className="text-blue-200 hover:text-white transition-all duration-200 hover:scale-110 p-2 rounded-full bg-white/5 hover:bg-white/10"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@theserenityplace"
                className="text-blue-200 hover:text-white transition-all duration-200 hover:scale-110 p-2 rounded-full bg-white/5 hover:bg-white/10"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-blue-200 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-blue-200 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-blue-200 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-blue-200 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center group">
                <div className="p-2 bg-blue-500/20 rounded-lg mr-3 group-hover:bg-blue-500/30 transition-colors">
                  <Phone className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-blue-200 group-hover:text-white transition-colors">
                  +254722 970951
                </span>
              </div>
              <div className="flex items-center group">
                <div className="p-2 bg-blue-500/20 rounded-lg mr-3 group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-blue-200 group-hover:text-white transition-colors">
                  help@serenityplace.org
                </span>
              </div>
              <div className="flex items-start group">
                <div className="p-2 bg-blue-500/20 rounded-lg mr-3 group-hover:bg-blue-500/30 transition-colors mt-1">
                  <MapPin className="w-4 h-4 text-blue-300" />
                </div>
                <span className="text-blue-200 group-hover:text-white transition-colors leading-relaxed">
                  Kahawa Sukari, Kiu River Road, 2nd South Avenue
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800/50 mt-8 pt-8 text-center">
          <p className="text-blue-200 text-sm">
            © 2024 The Serenity Place Rehabilitation Centre Nairobi. <br />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
