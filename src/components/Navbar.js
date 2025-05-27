import React from "react";
import { BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Home page navbar
  const HomeNavbar = () => (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">StudyMind</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="text-gray-500 hover:text-gray-900 font-medium transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );

  // Signup page navbar
  const SignupNavbar = () => (
    <div className="bg-white/50 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">StudyMind</span>
          </Link>
          <div className="text-sm text-gray-600">
            Already have an account? 
            <Link 
              to="/login" 
              className="text-purple-600 hover:text-purple-700 font-medium ml-1"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // Login page navbar
  const LoginNavbar = () => (
    <header className="bg-white/50 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">StudyMind</span>
          </Link>
          <div className="text-sm text-gray-600">
            Need help?{" "}
            <Link
              to="#"
              className="text-purple-600 hover:text-purple-700 font-medium ml-1"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </header>
  );

  // Default navbar (can be used for other pages)
  const DefaultNavbar = () => (
    <div className="bg-white/50 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">StudyMind</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              to="/login"
              className="text-gray-500 hover:text-gray-900 font-medium transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // Conditional rendering based on current route
  const renderNavbar = () => {
    switch (currentPath) {
      case '/':
        return <HomeNavbar />;
      case '/signup':
        return <SignupNavbar />;
      case '/login':
        return <LoginNavbar />;
      default:
        return <DefaultNavbar />;
    }
  };

  return renderNavbar();
};

export default Navbar;