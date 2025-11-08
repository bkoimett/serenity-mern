import React, { useEffect } from "react";

export const OrganizationSchema = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "RehabilitationCenter",
      name: "Serenity Place",
      description:
        "Premier rehabilitation center in Nairobi, Kenya offering addiction treatment and recovery services",
      url: "https://theserenityplace.org",
      telephone: "+254-722-970951",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nairobi, Kenya",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "-1.1963609538261084",
        longitude: "36.952704893254044",
      },
      openingHours: "Mo-Su 24/7",
      medicalSpecialty: "Addiction Medicine",
      serviceType: "Rehabilitation Services",
      areaServed: ["Kenya", "Nairobi", "East Africa"],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export const ArticleSchema = ({ post }) => {
  useEffect(() => {
    if (!post) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt || post.content?.substring(0, 160) || "",
      image: post.image || "/images/og-image.jpg",
      datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      author: {
        "@type": "Organization",
        name: "Serenity Place",
      },
      publisher: {
        "@type": "Organization",
        name: "Serenity Place",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [post]);

  return null;
};
