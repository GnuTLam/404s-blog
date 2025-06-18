import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchPosts } from '../services/api';
import CyberLogo from '../components/CyberLogo';

const Home: React.FC = () => {
  const { posts, loading, error } = useFetchPosts();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="mb-3 inline-block relative">
          <CyberLogo text="404's Blog" size="xl" glitchIntensity="medium" className="clip-text" />
        </h1>
        <p className="text-gray-400 mt-4 text-xl cyber-text-rajdhani">Web security blog</p>
      </div>

      <div className="mb-16">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg border border-gray-700/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome to 404's Blog</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Explore the latest in web security, vulnerability research, and ethical hacking. 
            Our blog covers everything from XSS exploits to browser security and modern protection techniques.
          </p>
          <div className="flex justify-end">
            <Link 
              to="/blog" 
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md"
            >
              Explore Articles
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Articles</h2>
          <Link to="/blog" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
            View all →
          </Link>
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
            {posts.slice(0, 3).map((post) => (
              <article 
                key={post.id} 
                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl"
              >
                <Link to={`/post/${post.id}`} className="block h-full">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden h-full border border-gray-700/50 shadow-md">
                    <div className="p-6 flex flex-col h-full">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4">About The Author</h3>
          <p className="text-gray-300 mb-4">
            Security researcher and web developer with over 10 years of experience in finding and exploiting web vulnerabilities.
          </p>
          <Link to="/about" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
            Learn more →
          </Link>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4">Subscribe to Updates</h3>
          <p className="text-gray-300 mb-4">
            Get notified when new security articles are published.
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 