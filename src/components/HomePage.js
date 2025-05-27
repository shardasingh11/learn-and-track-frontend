import React from "react";
import Navbar from "./Navbar.js";

import { Clock, BookOpen, TrendingUp, Users, Play, Plus, Component } from "lucide-react";


const HomePage = () => {
   return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
   

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Track Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                  Study Sessions
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Create subjects, start study timers, and track your learning progress. 
                Stay organized and motivated with detailed session analytics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2 shadow-lg">
                <Play className="w-5 h-5" />
                <span>Start Studying</span>
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-purple-300 hover:text-purple-600 transition-all">
                Learn More
              </button>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-pink-600">2k+</span>
                </div>
                <span className="text-gray-600">Active Students</span>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-indigo-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-pink-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="space-y-6">
            {/* Main Illustration Card */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 relative overflow-hidden">
              {/* Study Illustration */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  {/* Person sitting at desk */}
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center relative">
                    {/* Person */}
                    <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-full relative">
                      {/* Face */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-orange-200 rounded-full">
                        {/* Eyes */}
                        <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                        <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                        {/* Glasses */}
                        <div className="absolute top-2.5 left-1 w-10 h-6 border-2 border-gray-700 rounded-lg opacity-80"></div>
                      </div>
                      {/* Hair */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-14 h-8 bg-orange-600 rounded-t-full"></div>
                    </div>
                    {/* Laptop */}
                    <div className="absolute bottom-0 w-16 h-10 bg-gray-600 rounded-t-lg">
                      <div className="w-full h-6 bg-gray-300 rounded-t-lg"></div>
                    </div>
                  </div>
                  {/* Light bulb for idea */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  </div>
                  {/* Bell notification */}
                  <div className="absolute -top-4 -left-4 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-red-500 rounded-full absolute -top-0.5 -right-0.5"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Study Sessions</h3>
                <p className="text-gray-600 mb-4">Track your progress across multiple subjects</p>
                <div className="text-2xl font-bold text-purple-600">+2.1k</div>
                <p className="text-sm text-gray-500">Students learning daily</p>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 w-4 h-4 bg-red-500 rounded-full"></div>
              <div className="absolute bottom-4 right-8 w-6 h-6 bg-yellow-300 rounded-full opacity-60"></div>
              <div className="absolute top-1/2 left-4 w-3 h-3 bg-purple-400 rounded-full opacity-70"></div>
            </div>

            {/* Feature Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Timer Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <div className="w-12 h-12 bg-indigo-200 rounded-xl mb-4 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Smart Timer</h4>
                <p className="text-sm text-gray-600">Track your study sessions with precision timing and breaks.</p>
              </div>

              {/* Subject Management Card */}
              <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-6 border border-pink-100">
                <div className="w-12 h-12 bg-pink-200 rounded-xl mb-4 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-pink-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Add Subjects</h4>
                <p className="text-sm text-gray-600">Organize your studies by creating custom subjects and topics.</p>
              </div>

              {/* Analytics Card */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
                <div className="w-12 h-12 bg-yellow-200 rounded-xl mb-4 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Progress Analytics</h4>
                <p className="text-sm text-gray-600">Visualize your learning journey with comprehensive reports.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Study Habits?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already tracking their progress and achieving their academic goals.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg">
              Get Started Free
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded flex items-center justify-center"><BookOpen className="w-5 h-5 text-white" /></div>
              <span className="font-semibold text-gray-900">StudyMind</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default HomePage;
