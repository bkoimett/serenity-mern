// src/components/Hero.jsx
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        {/* Main Content */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Peace at
            <span className="block text-blue-100">Serenity Place</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Your journey to recovery begins here. Professional, compassionate
            care in a tranquil environment designed for healing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="#contact"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center"
            >
              Get Help Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>

            <a
              href="tel:5551234357"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Now: (555) 123-HELP
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto text-blue-100">
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
    </section>
  );
}
