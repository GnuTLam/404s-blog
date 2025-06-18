import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Blog from './pages/Blog';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-950 text-white">
      <Header />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/post/:id" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            
            {/* Sidebar */}
            <Sidebar className="hidden lg:block" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App; 