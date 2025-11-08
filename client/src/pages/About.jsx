// src/pages/About.jsx - UPDATED WITH ANIMATIONS
import SEO from "../components/seo/SEO";
import {
  Heart,
  Eye,
  Shield,
  Users,
  Target,
  Star,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  ScrollAnimation,
  StaggerAnimation,
  StaggerItem,
} from "../components/animations/ScrollAnimation";
import { motion } from "framer-motion";

export function About() {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description:
        "We treat every individual with empathy, dignity, and respect throughout their recovery journey.",
    },

    {
      icon: Shield,
      title: "Safe Environment",
      description:
        "Our facility provides a secure, nurturing space where healing can truly begin and flourish.",
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "We believe in the power of shared experiences and supportive relationships in recovery.",
    },
    {
      icon: Target,
      title: "Evidence-Based Treatment",
      description:
        "We maintain the highest standards of care through proven treatments and continuous improvement.",
    },
  ];

  const team = [
    {
      name: "Dr. Elizabeth Mumbi, MBA",
      role: "Medical Director | Founder",
      bio: "Board-certified addiction psychiatrist with 15 years of experience in substance abuse treatment.",
      image: "/api/placeholder/200/200",
    },
    {
      name: "Parkes Owento, MA, CPsychol",
      role: "Counselling Psychologist",
      bio: "Licensed counselling psychologist specializing in addiction recovery, cognitive behavioral therapy, and mindfulness-based interventions for sustainable mental wellness.",
      image: "/api/placeholder/200/200",
    },
    {
      name: "Dr. Waithera Pauline",
      role: "Clinical Psychologist",
      bio: "PhD in Clinical Psychology with expertise in cognitive-behavioral therapy and mindfulness.",
      image: "/api/placeholder/200/200",
    },
    {
      name: "Allan Okoth, RN",
      role: "Head Nurse",
      bio: "Registered nurse with 12 years of experience in medical detox and patient care management.",
      image: "/api/placeholder/200/200",
    },
  ];

  const stats = [
    { number: "95%", label: "Patient Satisfaction Rate" },
    { number: "2,500+", label: "Lives Transformed" },
    { number: "15+", label: "Years of Experience" },
    { number: "24/7", label: "Support Available" },
  ];

  const treatments = [
    "Individual Therapy Sessions",
    "Group Counseling",
    "Medical Detoxification",
    "Family Therapy",
    "Relapse Prevention Planning",
    "Aftercare Support",
    "Holistic Wellness Programs",
    "Trauma-Informed Care",
  ];

  return (
    <>
      <SEO
        title="About Our Rehabilitation Center"
        description="Learn about Serenity Place's mission, values, and professional team. We provide compassionate addiction treatment in Nairobi, Kenya."
        keywords="about rehabilitation center, addiction treatment team, recovery mission Kenya, substance abuse professionals Nairobi"
        ogImage="https://collection.cloudinary.com/deci4v6zv/d6eeba09b5b973a82733c1b7d43654c4"
      />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-teal-600 text-white py-16">
          <ScrollAnimation yOffset={0} duration={1}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  About Serenity Place
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  For over 15 years, we've been a beacon of hope for individuals
                  and families affected by addiction, providing compassionate
                  care in a tranquil healing environment.
                </motion.p>
              </div>
            </div>
          </ScrollAnimation>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation yOffset={50} duration={0.8}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission & Vision
                </h2>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollAnimation yOffset={50} duration={0.8} delay={0.1}>
                <div>
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Our Mission
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      To provide comprehensive, compassionate addiction
                      treatment that empowers individuals to achieve lasting
                      recovery and rebuild fulfilling, purposeful lives. We
                      believe that everyone deserves the opportunity to heal,
                      grow, and thrive.
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold">
                      <Heart className="w-5 h-5 mr-2" />
                      Healing Lives, Restoring Hope
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation yOffset={50} duration={0.8} delay={0.2}>
                <div>
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Our Vision
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      To be the leading center for addiction recovery,
                      recognized for our innovative treatments, compassionate
                      care, and unwavering commitment to transforming lives and
                      strengthening communities through sustainable recovery.
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold">
                      <Eye className="w-5 h-5 mr-2" />
                      Empowering Recovery, Inspiring Hope
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerAnimation staggerDelay={0.15}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <StaggerItem key={index}>
                    <div className="text-center transform hover:scale-105 transition-transform duration-300">
                      <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation yOffset={50} duration={0.8}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Our Core Values
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  These principles guide everything we do at Serenity Place
                </p>
              </div>
            </ScrollAnimation>

            <StaggerAnimation staggerDelay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <StaggerItem key={index}>
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>

        {/* Treatment Approach */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollAnimation yOffset={50} duration={0.8}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Our Treatment Approach
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    We address addiction from all angles—physical,
                    psychological, emotional, and spiritual. Our integrated,
                    evidence-based approach ensures comprehensive healing and
                    lasting recovery.
                  </p>

                  <StaggerAnimation staggerDelay={0.08}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {treatments.map((treatment, index) => (
                        <StaggerItem key={index}>
                          <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{treatment}</span>
                          </div>
                        </StaggerItem>
                      ))}
                    </div>
                  </StaggerAnimation>
                </div>
              </ScrollAnimation>

              <ScrollAnimation yOffset={50} duration={0.8} delay={0.2}>
                <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Why Choose Serenity Place?
                  </h3>
                  <StaggerAnimation staggerDelay={0.1}>
                    <div className="space-y-4">
                      <StaggerItem>
                        <div className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                          <Award className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              Licensed & Certified
                            </h4>
                            <p className="text-gray-600">
                              All our staff are fully licensed and certified in
                              addiction treatment
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                          <Star className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              Proven Success
                            </h4>
                            <p className="text-gray-600">
                              Evidence-based treatments with demonstrated
                              success rates
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                          <Clock className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              Continuous Support
                            </h4>
                            <p className="text-gray-600">
                              Lifelong aftercare and alumni support programs
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                    </div>
                  </StaggerAnimation>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation yOffset={50} duration={0.8}>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Meet Our Expert Team
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Our multidisciplinary team includes licensed therapists,
                  medical doctors, and addiction specialists dedicated to your
                  recovery.
                </p>
              </div>
            </ScrollAnimation>

            <StaggerAnimation staggerDelay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <StaggerItem key={index}>
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-semibold mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <ScrollAnimation yOffset={50} duration={0.8}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Take the first step towards recovery today. Our compassionate
                team is here to help you 24/7.
              </p>
              <StaggerAnimation staggerDelay={0.1}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <StaggerItem>
                    <a
                      href="tel:+254722970951"
                      className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Call Now: (+254) 722 970 951-HELP
                    </a>
                  </StaggerItem>
                  <StaggerItem>
                    <a
                      href="#contact"
                      className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Contact Us
                    </a>
                  </StaggerItem>
                </div>
              </StaggerAnimation>
            </div>
          </ScrollAnimation>
        </section>
      </div>
    </>
  );
}
