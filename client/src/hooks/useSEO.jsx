import { useEffect } from "react";

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  structuredData,
}) => {
  useEffect(() => {
    // Update document title
    const siteTitle = "Serenity Place | Rehabilitation Center Nairobi";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    document.title = fullTitle;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    const defaultDescription =
      "Professional addiction treatment and rehabilitation services in Nairobi, Kenya. Get evidence-based care for alcohol and drug addiction.";
    const finalDescription = description || defaultDescription;

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content = finalDescription;
      document.head.appendChild(metaDescription);
    } else {
      metaDescription.content = finalDescription;
    }

    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    const defaultKeywords =
      "rehabs in Kenya, rehabs in Nairobi, addiction treatment Kenya, rehabilitation center Nairobi, drug rehab Kenya, alcohol treatment Nairobi, mental health Kenya, recovery center Kenya";
    const finalKeywords = keywords
      ? `${keywords}, ${defaultKeywords}`
      : defaultKeywords;

    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      metaKeywords.content = finalKeywords;
      document.head.appendChild(metaKeywords);
    } else {
      metaKeywords.content = finalKeywords;
    }

    // Update canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    const finalCanonical = canonical || "https://theserenityplace.org";

    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.rel = "canonical";
      linkCanonical.href = finalCanonical;
      document.head.appendChild(linkCanonical);
    } else {
      linkCanonical.href = finalCanonical;
    }

    // Update Open Graph tags
    const updateMetaTag = (property, content) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };

    updateMetaTag("og:title", fullTitle);
    updateMetaTag("og:description", finalDescription);
    updateMetaTag(
      "og:image",
      ogImage ||
        "https://collection.cloudinary.com/deci4v6zv/d6eeba09b5b973a82733c1b7d43654c4"
    );
    updateMetaTag("og:type", "website");
    updateMetaTag("og:url", finalCanonical);
    updateMetaTag("og:site_name", "Serenity Place");

    // Add structured data
    if (structuredData) {
      let scriptStructured = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (!scriptStructured) {
        scriptStructured = document.createElement("script");
        scriptStructured.type = "application/ld+json";
        document.head.appendChild(scriptStructured);
      }
      scriptStructured.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Reset to default SEO on component unmount if needed
      document.title = "Serenity Place | Rehabilitation Center Nairobi";
    };
  }, [title, description, keywords, canonical, ogImage, structuredData]);
};
