'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

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
        const res = await fetch(`http://localhost:5000/api/v0/blogs/${id}`);
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

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="text-xl text-slate-600">Loading...</div></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen"><div className="text-center"><div className="text-lg text-red-700 mb-4">{error}</div><button onClick={() => window.history.back()} className="text-blue-600 hover:underline">Go Back</button></div></div>;
  if (!blog) return <div className="flex justify-center items-center min-h-screen"><div className="text-lg text-slate-600">Blog not found.</div></div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Full-width hero image */}
      {blog.featuredImage && (
        <div className="w-full h-80 md:h-[450px] lg:h-[500px] overflow-hidden">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
      {/* Main content */}
      <article className="w-full">
        <div className="w-full px-4 py-8 md:px-16 lg:px-32">
          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900">{blog.title}</h1>
            {blog.excerpt && <p className="text-lg md:text-xl text-slate-700 font-medium mb-4">{blog.excerpt}</p>}
            {/* ...meta details & tags... */}
          </header>
          <div className="border-t pt-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
