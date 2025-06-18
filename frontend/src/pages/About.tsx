import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">About Me</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
            {/* Profile image placeholder */}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">404's Blog</h2>
            <p className="text-gray-600 mb-4">Web Developer & Security Researcher</p>
            <div className="flex space-x-4 mb-4">
              <a href="https://twitter.com/the404blog" className="text-blue-600 hover:underline">Twitter</a>
              <a href="https://github.com/the404blog" className="text-blue-600 hover:underline">GitHub</a>
              <a href="https://linkedin.com/in/the404blog" className="text-blue-600 hover:underline">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-4">
            Welcome to my personal blog! I'm passionate about web development, security research, and sharing knowledge with others.
          </p>
          
          <p className="mb-4">
            This blog is built with React, TypeScript, and Tailwind CSS for the frontend, with a Flask backend.
            The entire application is containerized using Docker for easy deployment and development.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">My Expertise</h3>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Frontend Development (React, TypeScript, Tailwind CSS)</li>
            <li className="mb-2">Backend Development (Python, Flask, Node.js)</li>
            <li className="mb-2">DevOps (Docker, CI/CD)</li>
            <li className="mb-2">Web Security</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Contact</h3>
          <p>
            Feel free to reach out to me via email at <a href="mailto:contact@the404blog.com" className="text-blue-600 hover:underline">contact@the404blog.com</a> or connect with me on social media.
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
      </div>
    </div>
  );
};

export default About; 