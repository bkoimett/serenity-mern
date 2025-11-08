// src/pages/Blog.jsx
import { BlogList } from "../components/BlogList";
import SEO from "../components/seo/SEO";

export function Blog() {

  return (
    <>
      <SEO
        title="Addiction Recovery Blog & Resources"
        description="Read our latest articles on addiction recovery, mental health, and rehabilitation insights. Expert advice from Serenity Place Nairobi."
        keywords="addiction recovery blog, mental health articles Kenya, rehabilitation resources, substance abuse education Nairobi"
        ogImage="/images/blog-image.jpg"
      />
      <BlogList />
    </>
  );
}
