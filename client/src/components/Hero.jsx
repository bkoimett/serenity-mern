// src/components/Hero.jsx
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden">
      {/* Background Blobs with inline styles */}
      <div
        className="absolute -top-40 -right-40 w-80 h-80 bg-teal-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        style={{
          animation: "blob 7s infinite",
        }}
      ></div>
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        style={{
          animation: "blob 7s infinite 2s",
        }}
      ></div>
      <div
        className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        style={{
          animation: "blob 7s infinite 4s",
        }}
      ></div>

      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-40">
        {/* Announcement Banner */}
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-blue-100 ring-1 ring-white/20 hover:ring-white/30 transition-all duration-200 bg-white/10 backdrop-blur-sm">
            Is Social Media to Blame for Addiction?.{" "}
            <a
              href="/blog"
              className="font-semibold text-blue-200 hover:text-white transition-colors"
            >
              <span className="absolute inset-0" aria-hidden="true"></span>
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Peace at
            <span className="block text-blue-100">The Serenity Place</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Your journey to recovery begins here. Professional, compassionate
            care in a tranquil environment designed for healing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="#contact"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
            >
              Get Help Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>

            <a
              href="tel:+254722970951"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
            >
              <Phone className="mr-2 w-5 h-5" />
              (+254) 722 970 951-HELP
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-0 max-w-2xl mx-auto text-blue-100">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">100%</div>
              <div className="text-sm">Confidential</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">10+</div>
              <div className="text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add style tag for the animation */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </section>
  );
}