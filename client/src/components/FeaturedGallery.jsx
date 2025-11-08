// src/components/FeaturedGallery.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_BASE_URL } from "../config/api";

export function FeaturedGallery() {
  const [featuredImages, setFeaturedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedImages();
  }, []);

  const fetchFeaturedImages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery/featured`);
      if (response.ok) {
        const data = await response.json();
        setFeaturedImages(data);
      }
    } catch (error) {
      console.error("Error fetching featured images:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredImages.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse bg-gray-200 h-8 w-48 mx-auto mb-4 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-64 mx-auto mb-8 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-96 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (featuredImages.length === 0) {
    return null; // Don't show anything if no featured images
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the serene beauty and peaceful moments from our wellness
            retreat
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredImages.map((image, index) => (
                <div key={image._id} className="w-full flex-shrink-0">
                  <div className="relative aspect-w-16 aspect-h-9">
                    <img
                      src={image.image.secure_url}
                      alt={image.title}
                      className="w-full h-96 object-cover"
                      loading="lazy" // Add this
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/1200x800/3B82F6/FFFFFF?text=${encodeURIComponent(
                          image.title
                        )}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">
                          {image.title}
                        </h3>
                        {image.description && (
                          <p className="text-lg opacity-90">
                            {image.description}
                          </p>
                        )}
                        <span className="inline-block mt-2 px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                          {image.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {featuredImages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Indicators */}
          {featuredImages.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {featuredImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View Gallery Link */}
        <div className="text-center mt-8">
          <Link
            to="/gallery"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
          >
            View Full Gallery
            <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
