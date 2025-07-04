import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchPost } from '../services/api';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { post, loading, error } = useFetchPost(id);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex justify-center items-center py-16">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyber-500"></div>
          <div className="absolute inset-0 rounded-full border-2 border-cyber-500/20"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-xl p-6 text-center shadow-lg border border-red-500/30">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-300 mb-2">Error</h2>
          <p className="text-red-700 dark:text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-xl p-6 text-center shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Post Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The requested post could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-cyber-600 hover:text-cyber-500 dark:text-cyber-400 dark:hover:text-cyber-300 transition-colors duration-200 font-mono"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to blog
        </Link>
      </div>
      
      <article className="glass rounded-xl overflow-hidden shadow-lg">
        <header className="p-8 border-b border-light-300 dark:border-gray-700/50">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-cyber">{post.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4 font-mono leading-relaxed">
            Analyzing the 'evt' parameter in event handling for potential vulnerabilities.
          </p>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={post.created_at} className="font-mono">
                {new Date(post.created_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </time>
            </span>
            <span className="mx-3">•</span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-mono">{post.author}</span>
            </span>
          </div>
        </header>
        
        <div className="p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
        
        <div className="p-8 bg-light-100 dark:bg-gray-800/30 border-t border-light-300 dark:border-gray-700/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-cyber-600 hover:text-cyber-500 dark:text-cyber-400 dark:hover:text-cyber-300 transition-colors duration-200 font-mono"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all posts
            </Link>
            <div className="flex space-x-4">
              <button className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-mono">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
              <button className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-mono">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Bookmark
              </button>
            </div>
          </div>
        </div>
      </article>
      
      <div className="mt-12 glass rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-cyber">About the author</h3>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyber-500 to-cyber-700 flex items-center justify-center text-white text-xl font-bold mr-4">
            {post.author.charAt(0)}
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-medium font-mono">{post.author}</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-mono">Security Researcher</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost; 