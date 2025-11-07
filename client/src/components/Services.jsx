// src/components/Services.jsx
import {
  Heart,
  Users,
  Clock,
  Shield,
  Home,
  Activity,
  Phone,
} from "lucide-react";

export function Services() {
  const services = [
    {
      icon: Heart,
      title: "Individual Therapy",
      description:
        "One-on-one sessions with licensed therapists specializing in addiction recovery and mental health.",
    },
    {
      icon: Users,
      title: "Group Support",
      description:
        "Connect with others on similar journeys in our supportive and confidential group therapy sessions.",
    },
    {
      icon: Clock,
      title: "24/7 Medical Care",
      description:
        "Round-the-clock medical supervision and emotional support when you need it most.",
    },
    {
      icon: Shield,
      title: "Aftercare Planning",
      description:
        "Comprehensive discharge planning and ongoing support for your continued recovery journey.",
    },
    {
      icon: Home,
      title: "Residential Program",
      description:
        "Live-in treatment in our tranquil facility designed for complete focus on recovery.",
    },
    {
      icon: Activity,
      title: "Wellness Programs",
      description:
        "Holistic approaches including yoga, meditation, and fitness for complete wellness.",
    },
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Comprehensive Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a complete range of evidence-based treatments tailored to
            your unique journey to recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <service.icon
                  className="w-7 h-7 text-white"
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Take the first step towards recovery. Our compassionate team is
              here to help you 24/7.
            </p>

            <a
              href="tel:+254722970951" // consider international format: tel:+<countrycode><number>
              aria-label="Call now for immediate help"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
              Call Now for Immediate Help
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
