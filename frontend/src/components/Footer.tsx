import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900/95 backdrop-blur-xl border-t border-cyber-600/20 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-cyber-500 to-cyber-700 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg mr-3">
                <span className="text-white text-xl animate-pulse">⚡</span>
              </div>
              <span className="text-white text-xl font-cyber font-bold clip-text">404's Blog</span>
            </div>
            <p className="text-gray-400 font-tech leading-relaxed mb-6 max-w-md">
              Advancing cybersecurity through research, education, and responsible disclosure. 
              Building a more secure digital world, one vulnerability at a time.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-cyber-600/20 border border-cyber-600/30 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyber-300 hover:bg-cyber-600/30 transition-all duration-200"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-cyber-600/20 border border-cyber-600/30 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyber-300 hover:bg-cyber-600/30 transition-all duration-200"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-cyber-600/20 border border-cyber-600/30 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyber-300 hover:bg-cyber-600/30 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-cyber-600/20 border border-cyber-600/30 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyber-300 hover:bg-cyber-600/30 transition-all duration-200"
                aria-label="RSS Feed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-cyber font-bold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="block text-gray-400 hover:text-cyber-300 transition-colors duration-200 font-tech"
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="block text-gray-400 hover:text-cyber-300 transition-colors duration-200 font-tech"
              >
                Archives
              </Link>
              <Link 
                to="/about" 
                className="block text-gray-400 hover:text-cyber-300 transition-colors duration-200 font-tech"
              >
                About
              </Link>
              <a 
                href="#" 
                className="block text-gray-400 hover:text-cyber-300 transition-colors duration-200 font-tech"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-cyber font-bold mb-4">Categories</h3>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-gray-400 hover:text-cyber-300 transition-colors duration-200 font-tech"
              >
                CTF Writeups
              </a>
              <a 
                href="#" 
                className="block text-gray-400 hover:text-cyber-300 transition-colors duration-200 font-tech"
              >
                IoT Security
              </a>
              <a 
                href="#" 
                className="block text-gray-400 hover:text-cyber-300 transition-colors duration-200 font-tech"
              >
                Web Security
              </a>
              <a 
                href="#" 
                className="block text-gray-400 hover:text-cyber-300 transition-colors duration-200 font-tech"
              >
                Digital Forensics
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-cyber-600/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-tech">All systems operational</span>
              </div>
              <span className="font-tech">© {currentYear} 404's Blog</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a 
                href="#" 
                className="hover:text-cyber-300 transition-colors duration-200 font-tech"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="hover:text-cyber-300 transition-colors duration-200 font-tech"
              >
                Terms of Use
              </a>
              <a 
                href="#" 
                className="hover:text-cyber-300 transition-colors duration-200 font-tech"
              >
                Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 