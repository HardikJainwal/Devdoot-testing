import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function Shimmer({ variant = 'profile' }) {
  if (variant === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Shimmer */}
        <section className="bg-gradient-to-r from-[#2C8C91] to-[#345268] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className={`${poppins.className} h-10 w-1/3 bg-gray-200 rounded animate-pulse mx-auto mb-4`} />
              <div className={`${poppins.className} h-6 w-1/2 bg-gray-200 rounded animate-pulse mx-auto`} />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar Shimmer */}
            <div className="w-full lg:w-80 bg-white rounded-lg shadow-sm p-6 h-fit">
              <div className="flex items-center justify-between mb-6">
                <div className={`${poppins.className} h-6 w-1/3 bg-gray-200 rounded animate-pulse`} />
                <div className={`${poppins.className} h-5 w-16 bg-gray-200 rounded animate-pulse`} />
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="mb-6">
                  <div className={`${poppins.className} h-5 w-1/2 bg-gray-200 rounded animate-pulse mb-2`} />
                  <div className={`${poppins.className} h-10 w-full bg-gray-200 rounded-md animate-pulse`} />
                </div>
              ))}
            </div>

            {/* Main Content Shimmer */}
            <div className="flex-1">
              {/* Search Bar Shimmer */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <div className={`${poppins.className} w-full h-12 bg-gray-200 rounded-lg animate-pulse`} />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`${poppins.className} h-10 w-24 bg-gray-200 rounded-lg animate-pulse`} />
                    <div className={`${poppins.className} h-5 w-32 bg-gray-200 rounded animate-pulse`} />
                  </div>
                </div>
              </div>

              {/* Doctors List Shimmer */}
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse" />
                        <div className="flex-1 space-y-3">
                          <div className={`${poppins.className} h-6 w-1/2 bg-gray-200 rounded animate-pulse`} />
                          <div className={`${poppins.className} h-5 w-1/3 bg-gray-200 rounded animate-pulse`} />
                          <div className={`${poppins.className} h-4 w-1/4 bg-gray-200 rounded animate-pulse`} />
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, j) => (
                              <div key={j} className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                            ))}
                          </div>
                          <div className={`${poppins.className} h-4 w-3/4 bg-gray-200 rounded animate-pulse`} />
                          <div className="flex flex-wrap gap-2">
                            {[...Array(3)].map((_, j) => (
                              <div key={j} className={`${poppins.className} h-6 w-16 bg-gray-200 rounded-full animate-pulse`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="sm:w-48 flex flex-col justify-between">
                        <div className="text-right space-y-2">
                          <div className={`${poppins.className} h-6 w-1/3 bg-gray-200 rounded animate-pulse ml-auto`} />
                          <div className={`${poppins.className} h-4 w-1/4 bg-gray-200 rounded animate-pulse ml-auto`} />
                        </div>
                        <div className={`${poppins.className} h-10 w-full bg-gray-200 rounded-lg animate-pulse`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Shimmer */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <div className={`${poppins.className} h-10 w-24 bg-gray-200 rounded-lg animate-pulse`} />
                <div className={`${poppins.className} h-6 w-32 bg-gray-200 rounded animate-pulse`} />
                <div className={`${poppins.className} h-10 w-24 bg-gray-200 rounded-lg animate-pulse`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className={`${poppins.className} h-10 w-1/3 bg-gray-200 rounded animate-pulse mx-auto mb-4`} />
            <div className={`${poppins.className} h-6 w-1/2 bg-gray-200 rounded animate-pulse mx-auto`} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
              >
                {/* Doctor Image Shimmer */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 animate-pulse" />
                  <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Doctor Info Shimmer */}
                <div className="text-center mb-4 space-y-2">
                  <div className={`${poppins.className} h-6 w-2/3 bg-gray-200 rounded animate-pulse mx-auto`} />
                  <div className={`${poppins.className} h-5 w-1/2 bg-gray-200 rounded animate-pulse mx-auto`} />
                  <div className={`${poppins.className} h-4 w-1/3 bg-gray-200 rounded animate-pulse mx-auto`} />
                </div>

                {/* Rating Shimmer */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                    ))}
                    <div className={`${poppins.className} h-4 w-8 bg-gray-200 rounded animate-pulse ml-2`} />
                  </div>
                </div>

                {/* Services Shimmer */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`${poppins.className} h-6 w-16 bg-gray-200 rounded-full animate-pulse`}
                    />
                  ))}
                </div>

                {/* Button Shimmer */}
                <div className={`${poppins.className} h-10 w-full bg-gray-200 rounded-lg animate-pulse`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Profile page shimmer (original)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Shimmer */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Card Shimmer */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-36 h-36 rounded-2xl bg-gray-200 animate-pulse" />
              <div className="flex-1 space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-xl animate-pulse" />
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* About Section Shimmer */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-6" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-full bg-gray-200 rounded animate-pulse mb-2" />
            ))}
          </div>
          {/* Reviews Section Shimmer */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Booking Sidebar Shimmer */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
            <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="space-y-6">
              <div className="h-24 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
              <div className="grid grid-cols-3 gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
              <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}