import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const stats = {
    posts: 12,
    categories: 2,
    tags: 5
  };

  const categories = [
    { name: 'CTF', count: 8 },
    { name: 'IoT', count: 4 }
  ];

  const tags = [
    'Cryptography', 'Reverse Engineering', 'Web Security', 
    'Digital Forensics', 'Network Security'
  ];

  const musicTracks = [
    { title: 'Stay With Me', artist: 'Miki Matsubara', playing: true },
    { title: '時のネス', artist: 'Rokudenashi', playing: false },
    { title: 'Midnight Pretenders', artist: 'Tomoko Aran', playing: false },
    { title: '夏美', artist: 'AKASANT', playing: false },
    { title: 'F・L・Y', artist: 'Spectrum', playing: false }
  ];

  return (
    <aside className={`w-48 md:w-50 lg:w-60 xl:w-72 flex-shrink-0 ${className}`}>
      <div className="sticky top-24 space-y-4 md:space-y-6">
        {/* Profile Section */}
        <div className="glass rounded-xl md:rounded-2xl p-4 md:p-6 hover-lift">
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-br from-cyber-500 to-cyber-700 flex items-center justify-center shadow-xl animate-float">
              <span className="text-xl md:text-2xl lg:text-3xl">🕷️</span>
            </div>
            <h2 className="text-lg md:text-xl font-cyber font-bold text-light-800 dark:text-white mb-1 md:mb-2">GnuTLam</h2>
            <p className="text-light-600 dark:text-gray-400 text-xs md:text-sm font-mono">Hacker Tap Su</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="glass-light rounded-xl md:rounded-2xl p-4 md:p-6 hover-lift">
          <nav className="space-y-1 md:space-y-2">
            <Link 
              to="/" 
              className="flex items-center px-3 md:px-4 py-2 md:py-3 text-white bg-cyber-600 rounded-lg font-mono text-sm md:text-base font-medium transition-all duration-200 hover:bg-cyber-500"
            >
              <span className="mr-2 md:mr-3">🏠</span>
              <span className="truncate">Home</span>
            </Link>
            <Link 
              to="/blog" 
              className="flex items-center px-3 md:px-4 py-2 md:py-3 text-light-700 dark:text-gray-300 hover:text-light-800 dark:hover:text-white hover:bg-light-200 dark:hover:bg-cyber-600/20 rounded-lg font-mono text-sm md:text-base font-medium transition-all duration-200"
            >
              <span className="mr-2 md:mr-3">📚</span>
              <span className="truncate">Posts</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center px-3 md:px-4 py-2 md:py-3 text-light-700 dark:text-gray-300 hover:text-light-800 dark:hover:text-white hover:bg-light-200 dark:hover:bg-cyber-600/20 rounded-lg font-mono text-sm md:text-base font-medium transition-all duration-200"
            >
              <span className="mr-2 md:mr-3">👤</span>
              <span className="truncate">About</span>
            </Link>
            <button className="flex items-center px-3 md:px-4 py-2 md:py-3 text-light-700 dark:text-gray-300 hover:text-light-800 dark:hover:text-white hover:bg-light-200 dark:hover:bg-cyber-600/20 rounded-lg font-mono text-sm md:text-base font-medium transition-all duration-200 w-full text-left">
              <span className="mr-2 md:mr-3">🏆</span>
              <span className="truncate">Achievements</span>
            </button>
          </nav>
        </div>

        {/* Stats */}
        <div className="glass-light rounded-xl md:rounded-2xl p-4 md:p-6 hover-lift">
          <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
            <div>
              <div className="text-lg md:text-2xl font-bold text-cyber-400 font-cyber">{stats.posts}</div>
              <div className="text-xs text-light-500 dark:text-gray-400 font-mono">Posts</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold text-cyber-400 font-cyber">{stats.categories}</div>
              <div className="text-xs text-light-500 dark:text-gray-400 font-mono">Categories</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold text-cyber-400 font-cyber">{stats.tags}</div>
              <div className="text-xs text-light-500 dark:text-gray-400 font-mono">Tags</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="glass-light rounded-xl md:rounded-2xl p-4 md:p-6 hover-lift">
          <h3 className="text-base md:text-lg font-bold text-light-800 dark:text-white mb-3 md:mb-4 font-cyber">Categories</h3>
          <div className="space-y-1 md:space-y-2">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between py-1 md:py-2 px-2 md:px-3 rounded-lg hover:bg-light-200 dark:hover:bg-cyber-600/10 transition-colors">
                <span className="text-light-700 dark:text-gray-300 font-mono text-sm md:text-base truncate">{category.name}</span>
                <span className="text-cyber-400 font-mono text-xs md:text-sm flex-shrink-0 ml-2">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="glass-light rounded-xl md:rounded-2xl p-4 md:p-6 hover-lift">
          <h3 className="text-base md:text-lg font-bold text-light-800 dark:text-white mb-3 md:mb-4 font-cyber">Tags</h3>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 md:px-3 py-1 bg-cyber-100 dark:bg-cyber-900/50 border border-cyber-200 dark:border-cyber-600/30 text-cyber-700 dark:text-cyber-300 rounded-full text-xs font-mono hover:bg-cyber-200 dark:hover:bg-cyber-600/20 hover:border-cyber-300 dark:hover:border-cyber-500/50 transition-all cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Music Player */}
        <div className="glass-light rounded-xl md:rounded-2xl p-4 md:p-6 hover-lift">
          <h3 className="text-base md:text-lg font-bold text-light-800 dark:text-white mb-3 md:mb-4 font-cyber flex items-center">
            <span className="mr-2">🎵</span>
            <span className="truncate">Now Playing</span>
          </h3>
          <div className="space-y-1 md:space-y-2">
            {musicTracks.map((track, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-2 md:p-3 rounded-lg transition-all ${
                  track.playing 
                    ? 'bg-cyber-100 dark:bg-cyber-600/20 border border-cyber-200 dark:border-cyber-500/30' 
                    : 'hover:bg-light-200 dark:hover:bg-cyber-600/10'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className={`font-mono text-xs md:text-sm font-medium truncate ${
                    track.playing ? 'text-cyber-700 dark:text-cyber-300' : 'text-light-700 dark:text-gray-300'
                  }`}>
                    {track.title}
                  </div>
                  <div className="text-xs text-light-500 dark:text-gray-400 truncate font-mono">{track.artist}</div>
                </div>
                {track.playing && (
                  <div className="ml-2 flex-shrink-0">
                    <div className="flex space-x-1">
                      <div className="w-1 h-3 md:h-4 bg-cyber-400 rounded animate-pulse"></div>
                      <div className="w-1 h-3 md:h-4 bg-cyber-400 rounded animate-pulse" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-3 md:h-4 bg-cyber-400 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 