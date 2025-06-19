import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 dark:bg-dark-900/90 backdrop-blur-xl border-b border-light-200 dark:border-cyber-600/20 sticky top-0 z-50 shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="mr-6 transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-cyber-500 to-cyber-700 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg mr-3 group-hover:shadow-cyber-500/50 transition-all duration-300">
                  <span className="text-white text-xl animate-pulse">⚡</span>
                </div>
                <span className="text-light-800 dark:text-white text-xl font-cyber font-bold clip-text">404's</span>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-1">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg font-mono font-medium transition-all duration-200 ${
                  isActive('/') 
                    ? 'text-cyber-600 dark:text-cyber-300 bg-cyber-50 dark:bg-cyber-600/20 border border-cyber-200 dark:border-cyber-500/30' 
                    : 'text-light-700 dark:text-gray-300 hover:text-light-800 dark:hover:text-white hover:bg-light-200 dark:hover:bg-cyber-600/10'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className={`px-4 py-2 rounded-lg font-mono font-medium transition-all duration-200 ${
                  isActive('/blog') 
                    ? 'text-cyber-600 dark:text-cyber-300 bg-cyber-50 dark:bg-cyber-600/20 border border-cyber-200 dark:border-cyber-500/30' 
                    : 'text-light-700 dark:text-gray-300 hover:text-light-800 dark:hover:text-white hover:bg-light-200 dark:hover:bg-cyber-600/10'
                }`}
              >
                Posts
              </Link>
              <Link 
                to="/about" 
                className={`px-4 py-2 rounded-lg font-mono font-medium transition-all duration-200 ${
                  isActive('/about') 
                    ? 'text-cyber-600 dark:text-cyber-300 bg-cyber-50 dark:bg-cyber-600/20 border border-cyber-200 dark:border-cyber-500/30' 
                    : 'text-light-700 dark:text-gray-300 hover:text-light-800 dark:hover:text-white hover:bg-light-200 dark:hover:bg-cyber-600/10'
                }`}
              >
                About
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-light-200 dark:bg-cyber-600/10 border border-light-300 dark:border-cyber-600/20 text-light-600 dark:text-gray-300 hover:text-cyber-600 dark:hover:text-cyber-300 hover:bg-light-300 dark:hover:bg-cyber-600/20 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-64 px-4 py-2 rounded-lg bg-light-100 dark:bg-dark-800/80 text-light-800 dark:text-white border border-light-300 dark:border-cyber-600/30 focus:outline-none focus:ring-2 focus:ring-cyber-500 focus:border-cyber-500 transition-all duration-200 placeholder-light-500 dark:placeholder-gray-400 font-mono"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-500 dark:text-gray-400 hover:text-cyber-600 dark:hover:text-cyber-300 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-light-200 dark:bg-cyber-600/10 border border-light-300 dark:border-cyber-600/20 text-light-600 dark:text-gray-300 hover:text-cyber-600 dark:hover:text-cyber-300 hover:bg-light-300 dark:hover:bg-cyber-600/20 transition-all duration-200"
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
          <div className="md:hidden py-4 border-t border-light-200 dark:border-cyber-600/20">
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block px-4 py-3 rounded-lg text-light-700 dark:text-gray-300 hover:text-light-800 dark:hover:text-white hover:bg-light-200 dark:hover:bg-cyber-600/10 font-mono font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="block px-4 py-3 rounded-lg text-light-700 dark:text-gray-300 hover:text-light-800 dark:hover:text-white hover:bg-light-200 dark:hover:bg-cyber-600/10 font-mono font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Posts
              </Link>
              <Link 
                to="/about" 
                className="block px-4 py-3 rounded-lg text-light-700 dark:text-gray-300 hover:text-light-800 dark:hover:text-white hover:bg-light-200 dark:hover:bg-cyber-600/10 font-mono font-medium transition-all duration-200"
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
                  className="w-full px-4 py-2 rounded-lg bg-light-100 dark:bg-dark-800/80 text-light-800 dark:text-white border border-light-300 dark:border-cyber-600/30 focus:outline-none focus:ring-2 focus:ring-cyber-500 placeholder-light-500 dark:placeholder-gray-400 font-mono"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-500 dark:text-gray-400 hover:text-cyber-600 dark:hover:text-cyber-300">
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
});

export default Header; 