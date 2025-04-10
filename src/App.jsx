import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

// Lazy load pages
const Landing = lazy(() => import("./pages/landing"));
const Journeys = lazy(() => import("./pages/journeys"));
const Home = lazy(() => import("./pages/Home"));

const App = () => {

  return (
    <Router>
      <div className="w-screen min-h-screen bg-white">
        {/* Navbar */}
        <nav className="sticky top-0 z-20 bg-white backdrop-filter backdrop-blur-lg shadow-sm">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
            </div>
          </div>
        </nav>

        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/journeys" element={<Journeys />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="*" element={<div className="text-center text-xl mt-10">404 - Page Not Found</div>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
