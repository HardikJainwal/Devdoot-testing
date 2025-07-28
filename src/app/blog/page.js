'use client';

import { 
  ClockIcon, 
  UserIcon, 
  TagIcon,
  EyeIcon,
  ArrowRightIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

// Mock API data - Replace with your actual API call
const mockBlogData = {
  featured: {
    id: 1,
    title: "Boost Your Productivity with TaskMaster",
    excerpt: "Learn how to maximize your efficiency and achieve your goals with our comprehensive guide to productivity techniques.",
    image: "/api/placeholder/400/250",
    category: "Featured",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    views: 1250
  },
  categories: [
    "All Posts",
    "Health Categories",
    "Productivity", 
    "Wellness",
    "Technology",
    "Lifestyle"
  ],
  posts: [
    {
      id: 2,
      title: "Mastering Time Management Tips and Tricks",
      excerpt: "Discover strategies for effective time management and boost your daily productivity.",
      image: "/api/placeholder/300/200",
      category: "Health Categories",
      author: "Mike Chen",
      date: "2024-01-12",
      readTime: "4 min read",
      views: 892
    },
    {
      id: 3,
      title: "The Ultimate Guide to Task Prioritization",
      excerpt: "Learn how to prioritize your tasks effectively and tackle what matters most first.",
      image: "/api/placeholder/300/200",
      category: "Health Categories", 
      author: "Emma Davis",
      date: "2024-01-10",
      readTime: "6 min read",
      views: 1105
    },
    {
      id: 4,
      title: "Achieving Work-Life Balance: A Practical Approach",
      excerpt: "Practical strategies for achieving better work-life balance and improving your overall well-being.",
      image: "/api/placeholder/300/200",
      category: "Health Categories",
      author: "Alex Rodriguez",
      date: "2024-01-08",
      readTime: "7 min read", 
      views: 743
    },
    {
      id: 5,
      title: "The Power of Mindfulness in Productivity",
      excerpt: "Discover how mindfulness can enhance your focus and improve your daily performance.",
      image: "/api/placeholder/300/200",
      category: "Health Categories",
      author: "Lisa Thompson",
      date: "2024-01-05",
      readTime: "5 min read",
      views: 967
    }
  ]
};

// Blog Card Component
const BlogCard = ({ post, featured = false }) => {
  const cardClass = featured 
    ? "bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    : "bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1";

  return (
    <article className={cardClass}>
      <div className="relative">
        <img 
          src={post.image} 
          alt={post.title}
          className={`w-full object-cover ${featured ? 'h-64' : 'h-48'}`}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#C42323] text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className={`p-6 ${featured ? 'p-8' : ''}`}>
        <h3 className={`font-bold text-[#2B2B2A] mb-3 line-clamp-2 hover:text-[#C42323] transition-colors duration-200 ${featured ? 'text-2xl' : 'text-lg'}`}>
          <a href={`/blog/${post.id}`}>
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
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <EyeIcon className="w-4 h-4" />
              <span>{post.views}</span>
            </div>
          </div>
        </div>
        
        <a 
          href={`/blog/${post.id}`}
          className="inline-flex items-center gap-2 text-[#2C8C91] hover:text-[#345268] font-medium transition-colors duration-200"
        >
          Read More
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
};

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
              ? 'bg-[#2C8C91] text-white shadow-lg'
              : 'bg-white text-gray-600 border border-gray-300 hover:border-[#2C8C91] hover:text-[#2C8C91]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
            currentPage === page
              ? 'bg-[#2C8C91] text-white'
              : 'bg-white text-gray-600 border border-gray-300 hover:border-[#2C8C91] hover:text-[#2C8C91]'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

// Main Blog Page Component
export default function BlogPage() {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [filteredPosts, setFilteredPosts] = useState([]);

  // API Integration - Replace with your actual API endpoint
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call
        // const response = await fetch('/api/blogs');
        // const data = await response.json();
        
        // Using mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        setBlogData(mockBlogData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  // Filter posts by category
  useEffect(() => {
    if (blogData) {
      const filtered = activeCategory === 'All Posts' 
        ? blogData.posts 
        : blogData.posts.filter(post => post.category === activeCategory);
      setFilteredPosts(filtered);
      setCurrentPage(1); // Reset to first page when category changes
    }
  }, [blogData, activeCategory]);

  // Pagination logic
  const postsPerPage = 8;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-300 rounded-2xl mb-8"></div>
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

  if (!blogData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2B2B2A] mb-4">Failed to load blog posts</h2>
          <p className="text-gray-600">Please try again later.</p>
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

        {/* Featured Post */}
        {blogData.featured && (
          <div className="mb-12">
            <BlogCard post={blogData.featured} featured={true} />
          </div>
        )}

        {/* Category Filter */}
        <CategoryFilter 
          categories={blogData.categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Blog Grid */}
        {currentPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <TagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
            <p className="text-gray-500">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
}