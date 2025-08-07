"use client";

import {
  ClockIcon,
  UserIcon,
  TagIcon,
  EyeIcon,
  ArrowRightIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

// Blog Card Component
const BlogCard = ({ post, featured = false }) => {
  const cardClass = featured
    ? "bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    : "bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1";

  const calculateReadTime = (content) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const wordCount = content.split(" ").length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <article className={cardClass}>
      <div className="relative">
        {post.featuredImage ? (
          <img
            src={post.featuredImage}
            alt={post.title}
            className={`w-full object-cover ${featured ? 'h-64' : 'h-48'}`}
          />
        ) : (
          <div className={`w-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center ${featured ? 'h-64' : 'h-48'}`}>
            <TagIcon className="w-16 h-16 text-gray-400" />
          </div>
        )}

        <div className="absolute top-4 left-4">
          <span className="bg-[#C42323] text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>
      
      <div className={`p-6 ${featured ? 'p-8' : ''}`}>
        <h3 className={`font-bold text-[#2B2B2A] mb-3 line-clamp-2 hover:text-[#C42323] transition-colors duration-200 ${featured ? 'text-2xl' : 'text-lg'}`}>
          {/* FIXED: Use ID instead of slug, and correct path */}
          <a href={`/blogs/${post.id}`}>
            {post.title}
          </a>
        </h3>
        
        <p className={`text-gray-600 mb-4 line-clamp-3 ${featured ? 'text-base' : 'text-sm'}`}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <UserIcon className="w-4 h-4" />
              <span>{post.author?.name || post.author || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{calculateReadTime(post.content)}</span>
            </div>
            <div className="flex items-center gap-1">
              <EyeIcon className="w-4 h-4" />
              <span>{post.views || 0}</span>
            </div>
          </div>
        </div>
        
        {/* FIXED: Use ID instead of slug, and correct path */}
        <a 
          href={`/blogs/${post.id}`}
          className="inline-flex items-center gap-2 text-[#2C8C91] hover:text-[#345268] font-medium transition-colors duration-200"
        >
          Read More
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}

// Category Filter Component
const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            activeCategory === category
              ? "bg-[#2C8C91] text-white shadow-lg"
              : "bg-white text-gray-600 border border-gray-300 hover:border-[#2C8C91] hover:text-[#2C8C91]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          hasPrev
            ? "bg-white text-gray-600 border border-gray-300 hover:border-[#2C8C91] hover:text-[#2C8C91]"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
            currentPage === page
              ? "bg-[#2C8C91] text-white"
              : "bg-white text-gray-600 border border-gray-300 hover:border-[#2C8C91] hover:text-[#2C8C91]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          hasNext
            ? "bg-white text-gray-600 border border-gray-300 hover:border-[#2C8C91] hover:text-[#2C8C91]"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

// Main Blog Page Component
export default function BlogPage() {
  const [blogData, setBlogData] = useState(null);
  const [categories, setCategories] = useState(["All Posts"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [pagination, setPagination] = useState(null);

  // Fetch blog data from your API
  const fetchBlogData = async (page = 1, category = null) => {
    try {
      setLoading(true);
      setError(null);

      // Build API URL with query parameters
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      let apiUrl = `${baseUrl}/api/v0/blogs?page=${page}&limit=8`;

      if (category && category !== "All Posts") {
        apiUrl += `&category=${encodeURIComponent(category)}`;
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Note: No credentials needed for public blog endpoints
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setBlogData(result.data || []);
        setPagination(result.pagination);
      } else {
        throw new Error(result.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setError(error.message);
      setBlogData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from your API
  const fetchCategories = async () => {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/v0/blogs/categories`);

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const allCategories = ["All Posts", ...result.data];
          setCategories(allCategories);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Keep default categories if API fails
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchBlogData(1);
    fetchCategories();
  }, []);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    fetchBlogData(1, category);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBlogData(page, activeCategory);
  };

  // Get featured post (first post or most viewed)
  const featuredPost = blogData && blogData.length > 0 ? blogData[0] : null;
  const regularPosts =
    blogData && blogData.length > 1 ? blogData.slice(1) : blogData || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8 mx-auto"></div>
            <div className="h-64 bg-gray-300 rounded-2xl mb-8"></div>
            <div className="flex gap-3 mb-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-300 rounded-full w-20"
                ></div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-300 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2B2B2A] mb-4">
            Error Loading Blogs
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchBlogData(1)}
            className="px-6 py-3 bg-[#2C8C91] text-white rounded-lg hover:bg-[#345268] transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2B2B2A] mb-4">Blogs</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover insights, tips, and stories to help you grow and succeed
          </p>
        </div>

        {/* Featured Post - Show only if we have posts */}
        {featuredPost && (
          <div className="mb-12">
            <BlogCard post={featuredPost} featured={true} />
          </div>
        )}

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Blog Grid */}
        {blogData && blogData.length > 0 ? (
          <>
            {regularPosts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {regularPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <Pagination
                currentPage={pagination.current}
                totalPages={pagination.pages}
                hasNext={pagination.hasNext}
                hasPrev={pagination.hasPrev}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <TagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No blog posts found
            </h3>
            <p className="text-gray-500">
              {activeCategory !== "All Posts"
                ? "Try selecting a different category or check back later."
                : "Check back later for new content."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
