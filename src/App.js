import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from "./components/HomePage";


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />

          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
