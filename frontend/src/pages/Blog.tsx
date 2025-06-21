import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetchPosts } from '../services/api';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const { posts, loading, error, pagination } = useFetchPosts(currentPage, activeCategory);
  
  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Mock function to calculate reading time
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  const categories = [
    { name: 'all', label: 'All Posts', count: pagination?.total || 0 },
    { name: 'xss', label: 'XSS', count: 0 }, // Will be updated with real API
    { name: 'sqli', label: 'SQL Injection', count: 0 },
    { name: 'csrf', label: 'CSRF', count: 0 },
    { name: 'auth', label: 'Authentication', count: 0 },
    { name: 'pentest', label: 'Penetration Testing', count: 0 },
  ];

  // Use API-provided posts directly (already filtered and paginated)
  const currentPosts = posts;
  const totalPages = pagination?.totalPages || 1;

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // setCurrentPage(1) is handled by useEffect
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Ultra-Slim Manga-Style Pagination Component
  const PaginationComponent = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-2 py-2">
        {/* Previous */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-7 h-7 flex items-center justify-center rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 dark:text-gray-500 hover:bg-cyber-500/10 hover:text-cyber-500"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Numbers - Ultra Compact */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const showPage = page === 1 || page === totalPages || 
                           (page >= currentPage - 1 && page <= currentPage + 1);
            
            if (!showPage) {
              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="w-6 text-center text-xs text-gray-500 dark:text-gray-600">
                    ⋯
                  </span>
                );
              }
              return null;
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-cyber-500 text-white'
                    : 'text-gray-700 dark:text-gray-400 hover:bg-cyber-500/10 hover:text-cyber-500'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-7 h-7 flex items-center justify-center rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-gray-600 dark:text-gray-500 hover:bg-cyber-500/10 hover:text-cyber-500"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>


      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="mb-12 text-center relative">
        <div className="cyber-grid absolute inset-0 opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-cyber font-bold text-gray-900 dark:text-white mb-6 clip-text">
            Posts
          </h1>
          <p className="text-gray-700 dark:text-gray-400 text-xl max-w-2xl mx-auto font-mono leading-relaxed">
            Deep dives into cybersecurity, vulnerability research, and ethical hacking techniques
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-500 rounded-full animate-pulse"></span>
              <span className="font-mono">{loading ? '...' : `${pagination?.total || 0}`} Articles</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-500 rounded-full animate-pulse"></span>
              <span className="font-mono">{loading ? '...' : `${categories.length - 1}`} Categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="glass-light rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-cyber font-bold text-gray-900 dark:text-white">Categories</h3>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              {pagination?.total || 0} post{(pagination?.total || 0) !== 1 ? 's' : ''} • Page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryChange(category.name)}
                className={`px-4 py-2 rounded-lg text-sm font-mono font-medium transition-all duration-200 ${
                  activeCategory === category.name
                    ? 'bg-cyber-600 text-white shadow-lg shadow-cyber-600/25'
                    : 'bg-light-200 dark:bg-dark-800/50 text-gray-800 dark:text-gray-300 hover:bg-cyber-100 dark:hover:bg-cyber-600/20 hover:text-cyber-700 dark:hover:text-cyber-300'
                }`}
              >
                {category.label}
                {category.count > 0 && (
                  <span className="ml-2 text-xs opacity-70">({category.count})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pagination */}
      {!loading && !error && currentPosts.length > 0 && (
        <div className="mb-8">
          <PaginationComponent />
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyber-500"></div>
            <div className="absolute inset-0 rounded-full border-2 border-cyber-500/20"></div>
          </div>
        </div>
      ) : error ? (
        <div className="glass rounded-2xl p-8 text-center shadow-lg border border-red-500/30">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-cyber font-bold text-red-300 mb-2">Error Loading Posts</h3>
          <p className="text-red-200/80 font-mono">{error}</p>
        </div>
      ) : currentPosts.length === 0 ? (
        <div className="glass-light rounded-2xl p-12 text-center shadow-lg">
          <div className="text-gray-500 dark:text-gray-500 text-6xl mb-4">📄</div>
          <h3 className="text-xl font-cyber font-bold text-gray-700 dark:text-gray-400 mb-2">No Posts Found</h3>
          <p className="text-gray-600 dark:text-gray-500 font-mono">
            {activeCategory === 'all' 
              ? 'No posts available yet.' 
              : `No posts found in the "${categories.find(c => c.name === activeCategory)?.label}" category.`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {currentPosts.map((post, index) => (
            <article 
              key={post.id} 
              className="group glass rounded-2xl overflow-hidden hover-lift card-glow transition-all duration-300"
            >
              <Link to={`/post/${post.id}`} className="block">
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Post Image/Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-cyber-500 to-cyber-700 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-cyber-500/50 transition-all duration-300">
                        <span className="text-2xl">
                          {post.category === 'xss' ? '🔥' : 
                           post.category === 'sqli' ? '💉' :
                           post.category === 'csrf' ? '🔐' :
                           post.category === 'auth' ? '🗝️' : 
                           post.category === 'pentest' ? '⚔️' : '🛡️'}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      {/* Category Badge */}
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-mono font-medium bg-cyber-100 dark:bg-cyber-900/50 border border-cyber-200 dark:border-cyber-600/30 text-cyber-700 dark:text-cyber-300 rounded-full">
                          {post.category.toUpperCase()}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-cyber font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyber-600 dark:group-hover:text-cyber-300 transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-700 dark:text-gray-400 text-sm font-mono leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Metadata */}
                      <div className="flex items-center justify-between pt-4 border-t border-light-300 dark:border-cyber-600/20">
                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-500">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-mono">
                              {new Date(post.created_at).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="font-mono">{calculateReadTime(post.excerpt)} min read</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            <span className="font-mono">{post.excerpt.split(' ').length} words</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-cyber-400 font-mono font-medium">
                          <span>Read more</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
                      ))}
          </div>
        )}

        {/* Bottom Pagination */}
        {!loading && !error && currentPosts.length > 0 && (
          <div className="mt-12">
            <PaginationComponent />
          </div>
        )}
      </div>
    );
  };

export default Blog; 