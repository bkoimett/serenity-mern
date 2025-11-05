// src/pages/Home.jsx
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { ContactForm } from "../components/ContactForm";
import { BlogPreview } from "../components/BlogPreview";

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <BlogPreview />
      <ContactForm />
    </>
  );
}
