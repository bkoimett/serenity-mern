// src/components/Hero.jsx (Enhanced with Animations)
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollAnimation } from "./animations/ScrollAnimation";

export function Hero() {
  // Floating animation variants
  const floatingAnimation = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Stagger animation for trust indicators
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating particles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/40 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, -15, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400/40 rounded-full"
          animate={{
            y: [0, 25, 0],
            x: [0, -10, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-36">
        {/* Announcement Banner */}
        <ScrollAnimation yOffset={30} duration={0.8}>
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <motion.div
              className="relative rounded-full px-3 py-1 text-sm/6 text-green-400 ring-1 ring-white/20 hover:ring-white/30 transition-all duration-200 bg-white/10 backdrop-blur-sm cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -left-1 -top-1"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </motion.div>
              Is Social Media to Blame for Increase in Addiction Cases?.{" "}
              <a
                href="/blog"
                className="font-semibold text-blue-200 hover:text-white transition-colors"
              >
                <span className="absolute inset-0" aria-hidden="true"></span>
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </motion.div>
          </div>
        </ScrollAnimation>

        {/* Main Content */}
        <div className="text-center">
          <ScrollAnimation yOffset={50} duration={1}>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Find Peace at
              <motion.span
                className="block bg-gradient-to-r from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                The Serenity Place
              </motion.span>
            </motion.h1>
          </ScrollAnimation>

          <ScrollAnimation yOffset={30} duration={0.8} delay={0.3}>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Your journey to recovery begins here. Professional, compassionate
              care in a tranquil environment designed for healing.
            </motion.p>
          </ScrollAnimation>

          {/* CTA Buttons */}
          <ScrollAnimation yOffset={40} duration={0.8} delay={0.4}>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="#contact"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center shadow-lg relative overflow-hidden group"
                  >
                    {/* Animated background shine */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%]"
                      whileHover={{ translateX: "200%" }}
                      transition={{ duration: 0.8 }}
                    />
                    <span className="relative z-10 flex items-center">
                      Get Help Now
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </motion.div>
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="tel:+254722970951"
                    className="border-2 border-white/80 text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center shadow-lg backdrop-blur-sm relative overflow-hidden group"
                  >
                    {/* Pulse animation for emergency button */}
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2 border-red-400/50"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="relative z-10 flex items-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Phone className="mr-2 w-5 h-5" />
                      </motion.div>
                      (+254) 722 970 951
                    </span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </ScrollAnimation>

          {/* Trust Indicators */}
          <ScrollAnimation yOffset={30} duration={0.8} delay={0.6}>
            <motion.div
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { number: "24/7", label: "Support Available" },
                { number: "100%", label: "Confidential" },
                { number: "10+", label: "Years Experience" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="text-2xl font-bold mb-2 text-white"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(255,255,255,0)",
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 0px rgba(255,255,255,0)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 1,
                    }}
                  >
                    {item.number}
                  </motion.div>
                  <div className="text-sm text-blue-200">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollAnimation>
        </div>

        {/* Scroll indicator */}
        <ScrollAnimation yOffset={20} duration={1} delay={1}>
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
