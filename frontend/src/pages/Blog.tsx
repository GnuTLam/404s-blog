import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchPosts } from '../services/api';

const Blog: React.FC = () => {
  const { posts, loading, error } = useFetchPosts();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          404's Blog
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Deep dives into web security, vulnerability research, and ethical hacking techniques
        </p>
      </div>

      <div className="mb-8 flex items-center justify-center flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setActiveCategory('xss')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === 'xss'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          XSS
        </button>
        <button
          onClick={() => setActiveCategory('sqli')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === 'sqli'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          SQL Injection
        </button>
        <button
          onClick={() => setActiveCategory('csrf')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === 'csrf'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          CSRF
        </button>
        <button
          onClick={() => setActiveCategory('auth')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === 'auth'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Authentication
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-900/30 backdrop-blur-sm border border-red-700 rounded-xl p-6 text-center shadow-lg">
          <p className="text-red-200">{error}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center border border-gray-700">
          <p className="text-gray-400">No posts available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts
            .filter(post => activeCategory === 'all' || post.category === activeCategory)
            .map((post) => (
              <article 
                key={post.id} 
                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl"
              >
                <Link to={`/post/${post.id}`} className="block h-full">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden h-full border border-gray-700/50 shadow-md">
                    <div className="p-6 flex flex-col h-full">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-900/50 text-blue-300 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
                        <span className="text-sm text-gray-400">
                          {new Date(post.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="text-blue-400 text-sm font-medium">Read more</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
        </div>
      )}
    </div>
  );
};

export default Blog; 