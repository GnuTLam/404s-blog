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
    <aside className={`w-80 flex-shrink-0 ${className}`}>
      <div className="sticky top-24 space-y-6">
        {/* Profile Section */}
        <div className="glass rounded-2xl p-6 hover-lift">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyber-500 to-cyber-700 flex items-center justify-center shadow-xl animate-float">
              <span className="text-3xl">🕷️</span>
            </div>
            <h2 className="text-xl font-cyber font-bold text-white mb-2">Spid3r</h2>
            <p className="text-gray-400 text-sm font-tech">I'm a little spider</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="glass-light rounded-2xl p-6 hover-lift">
          <nav className="space-y-2">
            <Link 
              to="/" 
              className="flex items-center px-4 py-3 text-white bg-cyber-600 rounded-lg font-tech font-medium transition-all duration-200 hover:bg-cyber-500"
            >
              <span className="mr-3">🏠</span>
              Home
            </Link>
            <Link 
              to="/blog" 
              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-cyber-600/20 rounded-lg font-tech font-medium transition-all duration-200"
            >
              <span className="mr-3">📚</span>
              Archives
            </Link>
            <Link 
              to="/about" 
              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-cyber-600/20 rounded-lg font-tech font-medium transition-all duration-200"
            >
              <span className="mr-3">👤</span>
              About
            </Link>
            <button className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-cyber-600/20 rounded-lg font-tech font-medium transition-all duration-200 w-full text-left">
              <span className="mr-3">🏆</span>
              Achievements
            </button>
          </nav>
        </div>

        {/* Stats */}
        <div className="glass-light rounded-2xl p-6 hover-lift">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyber-400 font-cyber">{stats.posts}</div>
              <div className="text-xs text-gray-400 font-tech">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyber-400 font-cyber">{stats.categories}</div>
              <div className="text-xs text-gray-400 font-tech">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyber-400 font-cyber">{stats.tags}</div>
              <div className="text-xs text-gray-400 font-tech">Tags</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="glass-light rounded-2xl p-6 hover-lift">
          <h3 className="text-lg font-bold text-white mb-4 font-cyber">Categories</h3>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-cyber-600/10 transition-colors">
                <span className="text-gray-300 font-tech">{category.name}</span>
                <span className="text-cyber-400 font-mono text-sm">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="glass-light rounded-2xl p-6 hover-lift">
          <h3 className="text-lg font-bold text-white mb-4 font-cyber">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-cyber-900/50 border border-cyber-600/30 text-cyber-300 rounded-full text-xs font-tech hover:bg-cyber-600/20 hover:border-cyber-500/50 transition-all cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Music Player */}
        <div className="glass-light rounded-2xl p-6 hover-lift">
          <h3 className="text-lg font-bold text-white mb-4 font-cyber flex items-center">
            <span className="mr-2">🎵</span>
            Now Playing
          </h3>
          <div className="space-y-2">
            {musicTracks.map((track, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  track.playing 
                    ? 'bg-cyber-600/20 border border-cyber-500/30' 
                    : 'hover:bg-cyber-600/10'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className={`font-tech font-medium truncate ${
                    track.playing ? 'text-cyber-300' : 'text-gray-300'
                  }`}>
                    {track.title}
                  </div>
                  <div className="text-xs text-gray-400 truncate">{track.artist}</div>
                </div>
                {track.playing && (
                  <div className="ml-2">
                    <div className="flex space-x-1">
                      <div className="w-1 h-4 bg-cyber-400 rounded animate-pulse"></div>
                      <div className="w-1 h-4 bg-cyber-400 rounded animate-pulse" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-4 bg-cyber-400 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
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