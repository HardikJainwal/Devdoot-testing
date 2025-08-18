'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  EyeIcon,
  TagIcon,
  ArrowLeftIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/api/v0/blogs/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const response = await res.json();
        if (response.success && response.data) {
          setBlog(response.data);
        } else {
          throw new Error(response.message || 'Blog not found');
        }
      } catch (err) {
        setError(err.message || 'Could not load blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const calculateReadTime = (content) => {
    if (!content) return "5 min read";
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const getAuthorName = () => {
    if (!blog?.author) return 'Anonymous';
    if (typeof blog.author === 'string') return blog.author;
    if (typeof blog.author === 'object') return blog.author.name || 'Anonymous';
    return 'Anonymous';
  };

  const getPublishedDate = () => {
    try {
      const date = blog?.publishedAt || blog?.createdAt;
      if (!date) return '';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  const getBlogImage = () => {
    return blog?.featuredImage || blog?.oldUrl || blog?.image || blog?.imageUrl || blog?.thumbnail || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Banner skeleton */}
        <div className="w-full h-64 md:h-80 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse"></div>
        
        <div className="px-8 py-12">
          <div className="animate-pulse">
            {/* Image skeleton */}
            <div className="w-full h-80 bg-gray-200 rounded-2xl mb-8"></div>
              
              {/* Content skeleton */}
              <div className="h-12 bg-gray-200 rounded-lg w-3/4 mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
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
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
            <TagIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h2>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const blogImage = getBlogImage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Common Banner for all blogs */}
      <div className="w-full h-64 md:h-80 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat bg-center" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               }}>
          </div>
        </div>
        
        {/* Banner content */}
        <div className="relative h-full flex items-center px-8">
          <div className="w-full">
            <nav className="mb-8">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="font-medium">Back to Blog</span>
              </button>
            </nav>
            
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Blog Article
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Dive deep into insights, stories, and expertise from our community
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-12">
        <article className="w-full">
          {/* Blog Featured Image - Square/Better Proportioned */}
          {blogImage && (
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
  <img
    src={blogImage}
    alt={blog.title}
    className="w-full h-64 object-cover"
    onError={(e) => {
      console.error('Image failed to load:', blogImage);
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'flex';
    }}
    onLoad={() => {
      console.log('Image loaded successfully:', blogImage);
    }}
  />
  <div 
    className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center"
    style={{ display: 'none' }}
  >
    <TagIcon className="w-20 h-20 text-white/70" />
  </div>
</div>

          )}

          {/* Article Header */}
          <header className="mb-12">
            <div className="mb-6">
              {blog.category && (
                <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {blog.category}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              {blog.title}
            </h1>
            
            {blog.excerpt && (
              <p className="text-xl text-gray-600 font-medium mb-8 leading-relaxed">
                {blog.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 border-y border-gray-200 py-6">
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                <span className="font-medium">{getAuthorName()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{getPublishedDate()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>{calculateReadTime(blog.content)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <EyeIcon className="w-5 h-5" />
                <span>{blog.views || 0} views</span>
              </div>

              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200">
                <ShareIcon className="w-5 h-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div
              className="prose prose-lg prose-gray max-w-none 
                         prose-headings:text-gray-900 prose-headings:font-bold
                         prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                         prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-gray-900 prose-strong:font-semibold
                         prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                         prose-blockquote:border-l-4 prose-blockquote:border-blue-600 
                         prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 
                         prose-blockquote:rounded-r-lg prose-blockquote:my-8
                         prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                         prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl
                         prose-ul:my-6 prose-ol:my-6 prose-li:my-2"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{getAuthorName()}</p>
                  <p className="text-sm text-gray-600">Published on {getPublishedDate()}</p>
                </div>
              </div>
              
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                <ShareIcon className="w-5 h-5" />
                Share Article
              </button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}