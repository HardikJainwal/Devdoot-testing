"use client";

import {
  ClockIcon,
  UserIcon,
  TagIcon,
  EyeIcon,
  ArrowRightIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

// Blog Card Component - Clean and modern
const BlogCard = ({ post }) => {
  if (!post || typeof post !== 'object') {
    return null;
  }

  const calculateReadTime = (content) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const wordCount = content.split(" ").length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const getAuthorName = () => {
    if (!post.author) return 'Anonymous';
    if (typeof post.author === 'string') return post.author;
    if (typeof post.author === 'object') return post.author.name || 'Anonymous';
    return 'Anonymous';
  };

  const getPublishedDate = () => {
    try {
      const date = post.publishedAt || post.createdAt;
      if (!date) return '';
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  const getImageUrl = () => {
    const url = post.featuredImage || post.image || post.imageUrl || post.thumbnail || null;
    return url;
  };

  const imageUrl = getImageUrl();

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="relative h-64 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={post.title || 'Blog post image'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        <div 
          className="w-full h-full bg-[#2C8C91] flex items-center justify-center"
          style={{ display: imageUrl ? 'none' : 'flex' }}
        >
          <TagIcon className="w-16 h-16 text-white/70" />
        </div>

        <div className="absolute top-4 right-4">
          <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
            {post.category || 'Article'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
          <a href={`/blogs/${post.id || post._id || ''}`}>
            {post.title || 'Untitled Post'}
          </a>
        </h3>
        
        <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
          {post.excerpt || 'Discover insights and stories that matter...'}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <UserIcon className="w-4 h-4" />
              <span className="font-medium">{getAuthorName()}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{getPublishedDate()}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
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
        
        <a 
          href={`/blogs/${post.id || post._id || ''}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-all duration-300 text-sm group/link"
        >
          Read Full Article
          <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      </div>
    </article>
  );
};

// Category Filter Component
const CategoryFilter = ({ categories = [], activeCategory, onCategoryChange }) => {
  if (!Array.isArray(categories)) return null;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-8 py-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-[#C42323] text-white shadow-lg shadow-blue-600/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  hasNext = false,
  hasPrev = false,
}) => {
  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
    if (totalPages <= 7) return i + 1;
    if (currentPage <= 4) return i + 1;
    if (currentPage >= totalPages - 3) return totalPages - 6 + i;
    return currentPage - 3 + i;
  });

  return (
    <div className="bg-white border-t border-gray-200 px-8 py-8">
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          className={`p-3 rounded-lg font-medium transition-all duration-200 ${
            hasPrev
              ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-12 h-12 rounded-lg font-medium transition-all duration-200 ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className={`p-3 rounded-lg font-medium transition-all duration-200 ${
            hasNext
              ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
            }`}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Header Component
const BlogHeader = ({ totalPosts, activeCategory }) => {
  return (
    <div className="bg-[#2C8C91] text-white">
      <div className="px-8 py-16">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Explore Our Blog
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Discover the latest insights, tutorials, and stories from our community of experts and thought leaders.
          </p>
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <TagIcon className="w-5 h-5" />
              <span>{totalPosts} Articles</span>
            </div>
            <div className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              <span>Expert Authors</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span>Regular Updates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Blog Page Component
export default function BlogPage() {
  const [blogData, setBlogData] = useState([]);
  const [categories, setCategories] = useState(["All Posts"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    hasNext: false,
    hasPrev: false,
  });

  // Format blog data from API
  const formatBlogData = (data) => {
    if (!Array.isArray(data)) return [];
    
    return data.map(post => ({
      id: post._id || post.id || '',
      title: post.title || 'Untitled Post',
      excerpt: post.excerpt || '',
      content: post.content || '',
      featuredImage: post.featuredImage || post.oldUrl || '',
      status: post.status || 'draft',
      author: post.author || 'Anonymous',
      publishedAt: post.publishedAt || post.createdAt || new Date(),
      views: post.views || 0,
      category: post.category || 'Uncategorized'
    }));
  };

  // Fetch blog data from API
  const fetchBlogData = async (page = 1, category = null) => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      let apiUrl = `${baseUrl}/api/v0/blogs?page=${page}&limit=12`;

      if (category && category !== "All Posts") {
        apiUrl += `&category=${encodeURIComponent(category)}`;
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setBlogData(formatBlogData(result.data));
        setPagination(result.pagination || {
          current: page,
          pages: 1,
          hasNext: false,
          hasPrev: false,
        });
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

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header skeleton */}
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900">
          <div className="px-8 py-16">
            <div className="animate-pulse">
              <div className="h-12 bg-white/20 rounded-lg w-96 mb-6"></div>
              <div className="h-6 bg-white/10 rounded w-2/3 mb-8"></div>
              <div className="flex gap-8">
                <div className="h-4 bg-white/10 rounded w-24"></div>
                <div className="h-4 bg-white/10 rounded w-32"></div>
                <div className="h-4 bg-white/10 rounded w-28"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category filters skeleton */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="animate-pulse flex gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-full w-24"></div>
            ))}
          </div>
        </div>
        
        {/* Grid skeleton */}
        <div className="px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-t-2xl mb-4"></div>
                <div className="px-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-lg max-w-md mx-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <TagIcon className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchBlogData(1);
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <BlogHeader totalPosts={blogData.length} activeCategory={activeCategory} />
      
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Main Content */}
      <div className="px-8 py-12">
        {blogData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogData.map((post) => (
              <BlogCard key={post.id || post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <TagIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No articles found
            </h3>
            <p className="text-gray-600 text-lg">
              {activeCategory !== "All Posts"
                ? "Try selecting a different category."
                : "Check back soon for new content!"}
            </p>
          </div>
        )}
      </div>

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
    </div>
  );
}