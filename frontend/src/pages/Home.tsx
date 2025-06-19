import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchPosts } from '../services/api';
import CyberLogo from '../components/CyberLogo';

const Home: React.FC = () => {
  const { posts, loading, error, pagination } = useFetchPosts();

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="mb-16 text-center relative">
        <div className="cyber-grid absolute inset-0 opacity-5"></div>
        <div className="relative z-10">
          <h1 className="mb-6 inline-block relative">
            <CyberLogo text="404's Blog" size="xl" glitchIntensity="medium" className="font-cyber text-6xl" />
          </h1>
          <p className="text-light-600 dark:text-gray-400 mt-6 text-xl font-mono leading-relaxed max-w-2xl mx-auto">
            Cybersecurity research • Ethical hacking • Vulnerability analysis
          </p>
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-light-500 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-500 rounded-full animate-pulse"></span>
              <span className="font-mono">{loading ? '...' : `${pagination?.total || 0} Articles Published`}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-500 rounded-full animate-pulse"></span>
              <span className="font-mono">6 Active Categories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="mb-16">
        <div className="glass rounded-2xl p-8 shadow-xl hover-lift h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-start gap-6 mb-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-cyber-500 to-cyber-700 rounded-xl flex items-center justify-center shadow-lg animate-float">
                  <span className="text-3xl">🛡️</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-cyber font-bold text-light-800 dark:text-white mb-4">Welcome to the Posts</h2>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <p className="text-light-600 dark:text-gray-300 mb-6 leading-relaxed font-mono flex-1 overflow-hidden">
                <span className="line-clamp-4">
                  Dive deep into the world of cybersecurity with comprehensive guides on web vulnerabilities, 
                  penetration testing techniques, and cutting-edge security research. From XSS exploits to 
                  advanced authentication bypasses, explore the methodologies that keep the digital world secure.
                </span>
              </p>
              <div className="mt-auto">
                <Link 
                  to="/blog" 
                  className="cyber-btn inline-flex items-center gap-2"
                >
                  <span>Explore Posts</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Articles */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-cyber font-bold text-light-800 dark:text-white mb-2">Featured Research</h2>
            <p className="text-light-600 dark:text-gray-400 font-mono">Latest discoveries and security insights</p>
          </div>
          <Link 
            to="/blog" 
            className="flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors duration-200 font-mono font-medium"
          >
            <span>View all</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyber-500"></div>
              <div className="absolute inset-0 rounded-full border-2 border-cyber-500/20"></div>
            </div>
          </div>
        ) : error ? (
          <div className="glass rounded-2xl p-8 text-center shadow-lg border border-red-500/30 h-full">
            <div className="flex flex-col h-full justify-center">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-cyber font-bold text-red-300 mb-2">Error Loading Posts</h3>
              <p className="text-red-200/80 font-tech line-clamp-4 overflow-hidden">{error}</p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="glass-light rounded-2xl p-12 text-center shadow-lg h-full">
            <div className="flex flex-col h-full justify-center">
              <div className="text-light-400 dark:text-gray-500 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-cyber font-bold text-light-600 dark:text-gray-400 mb-2">No Posts Available</h3>
              <p className="text-light-500 dark:text-gray-500 font-tech line-clamp-4 overflow-hidden">Check back soon for new security research and tutorials.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
              <article 
                key={post.id} 
                className="group glass rounded-2xl overflow-hidden hover-lift card-glow transition-all duration-300"
              >
                <Link to={`/post/${post.id}`} className="block h-full">
                  <div className="p-6 flex flex-col h-full">
                    {/* Category & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-tech font-medium bg-cyber-100 dark:bg-cyber-900/50 border border-cyber-200 dark:border-cyber-600/30 text-cyber-700 dark:text-cyber-300 rounded-full">
                        {post.category.toUpperCase()}
                      </span>
                      <div className="w-10 h-10 bg-gradient-to-br from-cyber-500 to-cyber-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-cyber-500/50 transition-all duration-300">
                        <span className="text-lg">
                          {post.category === 'xss' ? '🔥' : 
                           post.category === 'sqli' ? '💉' :
                           post.category === 'csrf' ? '🔐' :
                           post.category === 'auth' ? '🗝️' : 
                           post.category === 'pentest' ? '⚔️' : '🛡️'}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-cyber font-bold text-light-800 dark:text-white mb-3 group-hover:text-cyber-600 dark:group-hover:text-cyber-300 transition-colors duration-200 line-clamp-2 flex-grow">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-light-600 dark:text-gray-400 text-sm font-tech leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between pt-4 border-t border-light-300 dark:border-cyber-600/20 mt-auto">
                      <div className="flex items-center gap-4 text-xs text-light-500 dark:text-gray-500">
                        <span className="font-mono">
                          {new Date(post.created_at).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit'
                          })}
                        </span>
                        <span className="font-mono">{calculateReadTime(post.excerpt)} min</span>
                      </div>
                      <div className="flex items-center gap-1 text-cyber-400 text-sm font-mono font-medium">
                        <span>Read</span>
                        <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="glass rounded-2xl p-8 hover-lift h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyber-500 to-cyber-700 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-xl leading-none">👤</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-cyber font-bold text-light-800 dark:text-white mb-3">About GnuTLam</h3>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <p className="text-light-600 dark:text-gray-300 mb-4 font-mono leading-relaxed flex-1 overflow-hidden">
                <span className="line-clamp-4">
                  Cybersecurity researcher with 5+ years of experience in web application security, 
                  vulnerability research, and penetration testing. Passionate about sharing knowledge 
                  and advancing security practices.
                </span>
              </p>
              <div className="mt-auto">
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-2 text-cyber-400 hover:text-cyber-300 transition-colors duration-200 font-mono font-medium"
                >
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-2xl p-8 hover-lift h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyber-500 to-cyber-700 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-xl leading-none">🔔</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-cyber font-bold text-light-800 dark:text-white mb-3">Stay Updated</h3>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <p className="text-light-600 dark:text-gray-300 mb-4 font-mono leading-relaxed flex-1 overflow-hidden">
                <span className="line-clamp-4">
                  Get notified about new research publications, security advisories, and 
                  in-depth technical analyses. No spam, just quality security content.
                </span>
              </p>
              <div className="mt-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="flex-1 px-4 py-2 bg-light-100 dark:bg-dark-800/80 border border-light-300 dark:border-cyber-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-500 text-light-800 dark:text-white placeholder-light-500 dark:placeholder-gray-400 font-mono text-sm"
                  />
                  <button className="px-6 py-2 bg-cyber-600 hover:bg-cyber-500 text-white rounded-lg transition-colors duration-200 font-mono font-medium text-sm whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 