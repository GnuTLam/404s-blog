import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const About = React.lazy(() => import('./pages/About'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Login = React.lazy(() => import('./pages/Login'));

// Loading component for Suspense fallback
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-20">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyber-500"></div>
      <div className="absolute inset-0 rounded-full border-2 border-cyber-500/20"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-light-100 dark:bg-dark-950 text-light-800 dark:text-white transition-colors duration-300 font-mono">
          <Header />
          <div className="flex-grow">
            <div className="container mx-auto px-4 py-8">
              <div className="flex gap-8">
                {/* Main Content */}
                <main className="flex-1 min-w-0">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/post/:id" element={<BlogPost />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/login" element={<Login />} />
                    </Routes>
                  </Suspense>
                </main>
                
                {/* Sidebar */}
                <Sidebar className="hidden lg:block" />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App; 