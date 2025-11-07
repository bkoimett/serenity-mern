// src/components/animations/ScrollAnimation.jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function ScrollAnimation({
  children,
  delay = 0,
  duration = 0.4,
  yOffset = 30,
  className = "",
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94], // smoother ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger animation for lists
export function StaggerAnimation({
  children,
  delay = 0,
  staggerDelay = 0.08, // reduced stagger delay
  className = "",
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child component for stagger animations
export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 }, // reduced y offset
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94], // smoother ease-out
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Faster variant for when you need quick animations
export function QuickScrollAnimation({
  children,
  delay = 0,
  duration = 0.3,
  yOffset = 20,
  className = "",
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // lower threshold for earlier trigger
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut", // simpler easing for speed
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Quick stagger for lists
export function QuickStaggerAnimation({
  children,
  delay = 0,
  staggerDelay = 0.06, // even faster stagger
  className = "",
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delay: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
