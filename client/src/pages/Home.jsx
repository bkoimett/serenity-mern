// src/pages/Home.jsx - UPDATED WITH ANIMATIONS
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { ContactForm } from "../components/ContactForm";
import { BlogPreview } from "../components/BlogPreview";
import { FeaturedGallery } from "../components/FeaturedGallery";
import { ScrollAnimation } from "../components/animations/ScrollAnimation";

export function Home() {
  return (
    <>
      <Hero />

      <ScrollAnimation yOffset={80} duration={0.8}>
        <Services />
      </ScrollAnimation>

      <ScrollAnimation yOffset={80} duration={0.8} delay={0.2}>
        <BlogPreview />
      </ScrollAnimation>

      <ScrollAnimation yOffset={80} duration={0.8} delay={0.3}>
        <FeaturedGallery />
      </ScrollAnimation>

      <ScrollAnimation yOffset={80} duration={0.8} delay={0.4}>
        <ContactForm />
      </ScrollAnimation>
    </>
  );
}
