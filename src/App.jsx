import Home from './pages/home_page.jsx'
import Landing from './pages/Landing.jsx'
import Profile from './pages/Profile.jsx'
import Journeys from './pages/Journeys.jsx'
import LearningPathway from './pages/Module.jsx'
import Quiz from './pages/quiz.jsx';
import ContentPage from  './pages/Content_page.jsx'
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Router>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-xl">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/journeys" element={<Journeys />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/module" element={<LearningPathway/>} />
            <Route path="/quiz" element={<Quiz/>} />
            <Route path="/content" element={<ContentPage/>}/>
            <Route path="*" element={
              <div className="flex items-center justify-center min-h-screen text-xl">
                404 - Page Not Found
              </div>
            } />
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
  
}

export default App