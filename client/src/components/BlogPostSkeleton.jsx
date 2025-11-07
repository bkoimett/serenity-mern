// src/components/BlogPostSkeleton.jsx
export function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="w-24 h-6 bg-gray-200 rounded"></div>
        </div>

        {/* Article Container Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
          {/* Featured Image Skeleton */}
          <div className="h-64 bg-gray-300"></div>

          {/* Content Skeleton */}
          <div className="p-8">
            {/* Title Skeleton */}
            <div className="space-y-3 mb-6">
              <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
            </div>

            {/* Meta Information Skeleton */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-200">
              {/* Author Skeleton */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <div className="w-20 h-4 bg-gray-300 rounded mb-1"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Date Skeleton */}
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
              </div>

              {/* Read Time Skeleton */}
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
              </div>

              {/* Share Button Skeleton */}
              <div className="ml-auto w-16 h-6 bg-gray-300 rounded"></div>
            </div>

            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2 mb-8">
              <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
              <div className="w-14 h-6 bg-gray-300 rounded-full"></div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-4/5 h-4 bg-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
            </div>

            {/* Author Bio Skeleton */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="w-32 h-5 bg-gray-300 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-gray-200 rounded"></div>
                    <div className="w-4/5 h-3 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Skeleton */}
        <div className="mt-12">
          <div className="w-48 h-7 bg-gray-300 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 animate-pulse"
              >
                <div className="w-3/4 h-5 bg-gray-300 rounded mb-3"></div>
                <div className="space-y-2 mb-4">
                  <div className="w-full h-3 bg-gray-200 rounded"></div>
                  <div className="w-4/5 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-20 h-3 bg-gray-200 rounded"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section Skeleton */}
        <div className="mt-12">
          <div className="bg-gray-200 rounded-2xl p-8 animate-pulse">
            <div className="w-64 h-7 bg-gray-300 rounded mx-auto mb-4"></div>
            <div className="space-y-2 mb-6 max-w-2xl mx-auto">
              <div className="w-full h-3 bg-gray-300 rounded"></div>
              <div className="w-4/5 h-3 bg-gray-300 rounded mx-auto"></div>
              <div className="w-3/4 h-3 bg-gray-300 rounded mx-auto"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="w-32 h-12 bg-gray-300 rounded-lg"></div>
              <div className="w-28 h-12 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
