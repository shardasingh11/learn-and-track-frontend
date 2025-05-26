import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

// Public Navbar (for non-authenticated users)
const Navbar = () => {
  return (
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
}

export default Navbar;