// src/components/GalleryCardSkeleton.jsx
export function GalleryCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-64 bg-gray-300"></div>

      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="space-y-2 mb-3">
          <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="w-full h-3 bg-gray-200 rounded"></div>
          <div className="w-4/5 h-3 bg-gray-200 rounded"></div>
        </div>

        {/* Category badge skeleton */}
        <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
