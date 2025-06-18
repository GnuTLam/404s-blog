import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-dark-900/90 backdrop-blur-xl border-b border-cyber-600/20 sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="mr-6 transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-cyber-500 to-cyber-700 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg mr-3 group-hover:shadow-cyber-500/50 transition-all duration-300">
                  <span className="text-white text-xl animate-pulse">⚡</span>
                </div>
                <span className="text-white text-xl font-cyber font-bold clip-text">404's</span>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-1">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg font-tech font-medium transition-all duration-200 ${
                  isActive('/') 
                    ? 'text-cyber-300 bg-cyber-600/20 border border-cyber-500/30' 
                    : 'text-gray-300 hover:text-white hover:bg-cyber-600/10'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className={`px-4 py-2 rounded-lg font-tech font-medium transition-all duration-200 ${
                  isActive('/blog') 
                    ? 'text-cyber-300 bg-cyber-600/20 border border-cyber-500/30' 
                    : 'text-gray-300 hover:text-white hover:bg-cyber-600/10'
                }`}
              >
                Archives
              </Link>
              <Link 
                to="/about" 
                className={`px-4 py-2 rounded-lg font-tech font-medium transition-all duration-200 ${
                  isActive('/about') 
                    ? 'text-cyber-300 bg-cyber-600/20 border border-cyber-500/30' 
                    : 'text-gray-300 hover:text-white hover:bg-cyber-600/10'
                }`}
              >
                About
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button className="p-2 rounded-lg bg-cyber-600/10 border border-cyber-600/20 text-gray-300 hover:text-cyber-300 hover:bg-cyber-600/20 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-64 px-4 py-2 rounded-lg bg-dark-800/80 text-white border border-cyber-600/30 focus:outline-none focus:ring-2 focus:ring-cyber-500 focus:border-cyber-500 transition-all duration-200 placeholder-gray-400 font-tech"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyber-300 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* RSS */}
            <button className="p-2 rounded-lg bg-cyber-600/10 border border-cyber-600/20 text-gray-300 hover:text-cyber-300 hover:bg-cyber-600/20 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-cyber-600/10 border border-cyber-600/20 text-gray-300 hover:text-cyber-300 hover:bg-cyber-600/20 transition-all duration-200"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyber-600/20">
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-cyber-600/10 font-tech font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-cyber-600/10 font-tech font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Archives
              </Link>
              <Link 
                to="/about" 
                className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-cyber-600/10 font-tech font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
            <div className="mt-4 px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full px-4 py-2 rounded-lg bg-dark-800/80 text-white border border-cyber-600/30 focus:outline-none focus:ring-2 focus:ring-cyber-500 placeholder-gray-400 font-tech"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyber-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 