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
        ogImage="https://collection.cloudinary.com/deci4v6zv/d6eeba09b5b973a82733c1b7d43654c4"
      />
      <BlogList />
    </>
  );
}
