// src/pages/Home.jsx - UPDATED WITH ANIMATIONS
import React from "react";
import SEO from "../components/seo/SEO";
import { OrganizationSchema } from "../components/seo/StructuredData";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { ContactForm } from "../components/ContactForm";
import { BlogPreview } from "../components/BlogPreview";
import { FeaturedGallery } from "../components/FeaturedGallery";
import { ScrollAnimation } from "../components/animations/ScrollAnimation";

export function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Serenity Place | Premier Rehabilitation Center in Nairobi, Kenya",
    description:
      "Get professional addiction treatment at Serenity Place, one of the leading rehabs in Kenya. Evidence-based rehabilitation services in Nairobi.",
    url: "https://theserenityplace.org",
  };

  return (
    <>
      <SEO
        title="Premier Rehabilitation Center in Nairobi, Kenya"
        description="Serenity Place offers professional addiction treatment and rehabilitation services in Nairobi, Kenya. Get evidence-based care for alcohol and drug addiction. One of the top rehabs in Kenya."
        keywords="rehabs in Kenya, rehabs in Nairobi, addiction treatment Kenya, rehabilitation center Nairobi, drug rehab Kenya, alcohol treatment Nairobi, recovery center Kenya"
        ogImage="https://collection.cloudinary.com/deci4v6zv/d6eeba09b5b973a82733c1b7d43654c4"
        structuredData={structuredData}
      />
      <OrganizationSchema />

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
