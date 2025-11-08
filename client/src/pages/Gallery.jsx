// src/pages/Gallery.jsx
import { useState, useEffect } from "react";
import SEO from "../components/seo/SEO";
import { Filter, Search } from "lucide-react";
import { GalleryCardSkeleton } from "../components/GalleryCardSkeleton";
import {
  ScrollAnimation,
  QuickStaggerAnimation,
  StaggerItem,
} from "../components/animations/ScrollAnimation";

export function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "nature", label: "Nature" },
    { value: "wellness", label: "Wellness" },
    { value: "meditation", label: "Meditation" },
    { value: "retreat", label: "Retreat" },
    { value: "events", label: "Events" },
    { value: "facilities", label: "Facilities" },
  ];

  useEffect(() => {
    fetchGalleryItems();
  }, [selectedCategory]);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const url =
        selectedCategory === "all"
          ? `${API_BASE_URL}/api/gallery`
          : `${API_BASE_URL}/api/gallery?category=${selectedCategory}`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data.items);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = galleryItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <SEO
        title="Our Rehabilitation Center Gallery"
        description="View photos of Serenity Place facilities, treatment areas, and recovery environment. See our modern rehabilitation center in Nairobi."
        keywords="rehabilitation center photos, treatment facility gallery, recovery center images Nairobi, Serenity Place facilities"
        ogImage="https://collection.cloudinary.com/deci4v6zv/d6eeba09b5b973a82733c1b7d43654c4"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-teal-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollAnimation yOffset={30} duration={0.6}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our Gallery
              </h1>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1} yOffset={20} duration={0.6}>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Discover the serene beauty and peaceful moments from our
                wellness retreat
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filters and Search */}
            <ScrollAnimation delay={0.2} yOffset={20}>
              <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search gallery..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="sm:w-64">
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Gallery Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <GalleryCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredItems.length > 0 ? (
              <QuickStaggerAnimation staggerDelay={0.08}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, index) => (
                    <StaggerItem key={item._id}>
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-105">
                        <div className="aspect-w-16 aspect-h-9">
                          <img
                            src={item.image.secure_url}
                            alt={item.title}
                            className="w-full h-64 object-cover"
                            loading="lazy"
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h3>

                          {item.description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {item.description}
                            </p>
                          )}

                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </QuickStaggerAnimation>
            ) : (
              <ScrollAnimation>
                <div className="col-span-full text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No gallery items found
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm || selectedCategory !== "all"
                      ? "Try adjusting your search or filters"
                      : "No images have been added to the gallery yet"}
                  </p>
                  {(searchTerm || selectedCategory !== "all") && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("all");
                      }}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </ScrollAnimation>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
