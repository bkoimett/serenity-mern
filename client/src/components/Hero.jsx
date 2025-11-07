// src/components/Hero.jsx (Simpler version)
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      {/* Simple background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

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
            <span className="block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              The Serenity Place
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Your journey to recovery begins here. Professional, compassionate
            care in a tranquil environment designed for healing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="#contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Help Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>

            <a
              href="tel:+254722970951"
              className="border-2 border-white/80 text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
            >
              <Phone className="mr-2 w-5 h-5" />
              (+254) 722 970 951
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2 text-white">24/7</div>
              <div className="text-sm text-blue-200">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2 text-white">100%</div>
              <div className="text-sm text-blue-200">Confidential</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2 text-white">10+</div>
              <div className="text-sm text-blue-200">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
