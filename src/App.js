import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from "./components/HomePage";
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
