import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { join } from "path";

const generateSitemap = async () => {
  try {
    // Define your base URL
    const baseUrl = "https://theserenityplace.org";

    // Create sitemap stream
    const sitemap = new SitemapStream({ hostname: baseUrl });

    // Add static pages
    const staticPages = [
      { url: "/", changefreq: "weekly", priority: 1.0 },
      { url: "/about", changefreq: "monthly", priority: 0.8 },
      { url: "/blog", changefreq: "daily", priority: 0.9 },
      { url: "/gallery", changefreq: "monthly", priority: 0.7 },
    ];

    // Add static pages to sitemap
    staticPages.forEach((page) => {
      sitemap.write({
        url: page.url,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: new Date().toISOString(),
      });
    });

    // In a real app, you would fetch dynamic content here
    // For example, blog posts from your API
    // const blogPosts = await fetchBlogPosts();
    // blogPosts.forEach(post => {
    //   sitemap.write({
    //     url: `/blog/${post.slug}`,
    //     changefreq: 'monthly',
    //     priority: 0.6,
    //     lastmod: post.updatedAt
    //   });
    // });

    sitemap.end();

    // Generate sitemap XML
    const sitemapXML = await streamToPromise(sitemap);

    // Write sitemap to public directory
    const sitemapPath = join(process.cwd(), "public", "sitemap.xml");
    createWriteStream(sitemapPath).write(sitemapXML);

    console.log("✅ Sitemap generated successfully!");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
};

export default generateSitemap;
