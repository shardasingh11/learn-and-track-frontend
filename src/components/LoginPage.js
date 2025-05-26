import React, { useState } from "react";
import { BookOpen, Eye, EyeOff, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Error states
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // Loading and status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Clear login error when user starts typing
    if (loginError) {
      setLoginError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setLoginError("");

    try {
      const reqData = new URLSearchParams();

      reqData.append("username", formData.username);
      reqData.append("password", formData.password);
      const response = await fetch("http://localhost:8000/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: reqData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login Failed");
      } else {
        const data = await response.json();
        console.log(data.access_token);

        const token = data.access_token;
        const expiryTime = new Date(data.expiry_time);
      }

      // Simulate success
      console.log("Login attempt:", formData);
      setLoginSuccess(true);

      // You can add navigation here
      setTimeout(() => {
        setLoginSuccess(false);
        // navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(error.message || "Login failed. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      {/* Top Navigation */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-white/20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">StudyMind</span>
            </div>
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
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-48 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-yellow-200 rounded-full opacity-60"></div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 min-h-[calc(100vh-120px)] mt-4">
        {/* Login Card */}
        <div className="relative w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            {/* Success Message */}
            {loginSuccess && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl flex items-center">
                <div className="flex-shrink-0 w-6 h-6 bg-green-200 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Login successful! Welcome back to StudyMind.</span>
              </div>
            )}

            {/* Error Message */}
            {loginError && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl flex items-center">
                <div className="flex-shrink-0 w-6 h-6 bg-red-200 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Username
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                    errors.username ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm ${
                      errors.username
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-200 focus:ring-purple-500'
                    }`}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm font-medium">{errors.username}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                    errors.password ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm ${
                      errors.password
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-200 focus:ring-purple-500'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm font-medium">{errors.password}</p>
                )}
                {!errors.password && (
                  <p className="text-gray-500 text-sm">Password must be at least 8 characters long</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-lg transition-all shadow-lg transform ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Login Options */}
            <div className="space-y-3">
              <button className="w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2">
                <div className="w-5 h-5 bg-blue-500 rounded"></div>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Secure Login</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>Privacy Protected</span>
              </div>
            </div>
          </div>
         </div>
       </div>
    </div>
  );
};

export default LoginPage;