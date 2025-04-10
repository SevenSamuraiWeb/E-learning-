import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import {running} from 'C:/Users/nihaa/OneDrive/Desktop/project/my-react-app/src/assets/running.png'


const LearningPathway = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pathwayData, setPathwayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeModule, setActiveModule] = useState(0);
  const [completedSubModules, setCompletedSubModules] = useState({});

  useEffect(() => {
    const fetchJourneyData = async () => {
      try {
        // Get journey ID from navigation state or localStorage
        // const journeyId = location.state?.journeyId || localStorage.getItem('currentJourneyId');
        const journeyId="417db800-3770-4804-acd7-648dbec74e59"
      //  const moduleId="608cbcb1-5bd5-44ad-b1a7-28bd8503cfb6"
        //const quizId="24d6e8eb-1b8a-4936-8224-c1ed09e75937"
        if (!journeyId) {
          setError('No journey ID found. Please start from the home page.');
          setLoading(false);
          return;
        }

        console.log('Fetching journey data for ID:', journeyId);
        
        // Fetch journey data from API
        const response = await fetch(`http://localhost:8000/edventure/journey/${journeyId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch journey data: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched journey data:', data);
        
        if (!data || !data.pathway) {
          throw new Error('Invalid journey data received');
        }

        setPathwayData(data);
        setError(null);

      } catch (err) {
        console.error('Error fetching journey data:', err);
        setError(err.message);
        // If there's an error, navigate back to home after 3 seconds
        setTimeout(() => navigate('/'), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchJourneyData();
  }, [location, navigate]);

  // Load completed submodules from localStorage on component mount
  useEffect(() => {
    const savedCompletedModules = localStorage.getItem('completedSubModules');
    if (savedCompletedModules) {
      setCompletedSubModules(JSON.parse(savedCompletedModules));
    }
  }, []);

  // Save completed submodules to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('completedSubModules', JSON.stringify(completedSubModules));
  }, [completedSubModules]);

  const handleModuleClick = (index) => {
    setActiveModule(index);
  };

  const toggleSubModuleCompletion = (moduleIndex, subModuleIndex) => {
    setCompletedSubModules(prev => {
      const key = `${moduleIndex}-${subModuleIndex}`;
      const newState = {
        ...prev,
        [key]: !prev[key]
      };
      
      // Update progress on server
      updateProgressOnServer(newState);
      
      return newState;
    });
  };

  const calculateProgress = () => {
    if (!pathwayData?.pathway?.modules) return 0;
    
    const totalSubModules = pathwayData.pathway.modules.reduce(
      (total, module) => total + module.sub_headings.length, 
      0
    );
    
    const completedCount = Object.values(completedSubModules).filter(Boolean).length;
    return Math.round((completedCount / totalSubModules) * 100);
  };

  const updateProgressOnServer = async (completedModules) => {
    try {
      const progress = calculateProgress();
      const response = await fetch('https://vzxnxn5t-8000.inc1.devtunnels.ms/edventure/update-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          j_id: pathwayData.j_id,
          progress: progress,
          completed_modules: Object.keys(completedModules).filter(key => completedModules[key])
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Failed to update progress:', response.status);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading your learning pathway...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-700">{error}</p>
          <p className="text-gray-500 mt-2">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  if (!pathwayData || !pathwayData.pathway || !pathwayData.pathway.modules) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-700">No learning pathway data available.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Check if modules array exists and has content
  const hasModules = pathwayData && 
                      pathwayData.pathway && 
                      pathwayData.pathway.modules && 
                      pathwayData.pathway.modules.length > 0;

  // Ensure active module is in valid range
  const safeActiveModule = hasModules ? 
    Math.min(activeModule, pathwayData.pathway.modules.length - 1) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md w-full p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-black text-3xl font-bold">Ed-Venture</div>
          <div className="flex gap-6 items-center">
            <button className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-1">
              <span>Rewards</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-1">
              <span>Profile</span>
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header with course info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold capitalize">{pathwayData.name || "Learning Pathway"}</h1>
            <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
              {pathwayData.difficulty || "Intermediate"}
            </span>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Progress</span>
              <span className="text-gray-700 font-medium">{calculateProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
            <img src="https://cdn3.iconfinder.com/data/icons/font-awesome-solid/512/person-running-512.png" alt="" className='absolute top-[170px] left-[180px] w-[45px]' />
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Continue Learning
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors">
              Download Materials
            </button>
          </div>
        </div>

        {hasModules ? (
          /* Module Navigation and Content */
          <div className="flex flex-col md:flex-row gap-8">
            {/* Module List / Sidebar */}
            <div className="md:w-1/3 lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-bold mb-4">Learning Modules</h2>
                <ul className="space-y-2">
                  {pathwayData.pathway.modules.map((module, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleModuleClick(index)}
                        className={`w-full text-left p-3 rounded-md transition-colors ${
                          safeActiveModule === index 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                            safeActiveModule === index ? 'bg-blue-600 text-white' : 'bg-gray-200'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium">{module.heading || `Module ${index + 1}`}</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Module Content */}
            <div className="md:w-2/3 lg:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">
                  {pathwayData.pathway.modules[safeActiveModule].heading || `Module ${safeActiveModule + 1}`}
                </h2>
                
                <div className="space-y-6">
                  {pathwayData.pathway.modules[safeActiveModule].sub_headings && 
                   pathwayData.pathway.modules[safeActiveModule].sub_headings.map((subHeading, subIndex) => (
                    <div key={subIndex} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id={`submodule-${safeActiveModule}-${subIndex}`}
                            checked={!!completedSubModules[`${safeActiveModule}-${subIndex}`]}
                            onChange={() => toggleSubModuleCompletion(safeActiveModule, subIndex)}
                            className="mt-1 mr-3"
                          />
                          <div>
                            <h3 className="text-lg font-medium mb-1">
                              {subHeading || `Sub-module ${subIndex + 1}`}
                            </h3>
                            <p className="text-gray-600">
                              Estimated time: 45 minutes
                            </p>
                          </div>
                        </div>
                        <a 
                          href={`/module/${safeActiveModule}/submodule/${subIndex}`} 
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                          Start
                        </a>
                      </div>
                    </div>
                  ))}
                  
                  {(!pathwayData.pathway.modules[safeActiveModule].sub_headings || 
                    pathwayData.pathway.modules[safeActiveModule].sub_headings.length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      No sub-modules found for this module.
                    </div>
                  )}
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button 
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
                    disabled={safeActiveModule === 0}
                    onClick={() => setActiveModule(prev => Math.max(0, prev - 1))}
                  >
                    Previous Module
                  </button>
                  <button 
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    disabled={safeActiveModule === pathwayData.pathway.modules.length - 1}
                    onClick={()=>navigate('/quiz')}
                  >
                    Next Module
                  </button>
                </div>
              </div>
              
              {/* Resources Section */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-xl font-bold mb-4">Additional Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="#" className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Module PDF Materials
                  </a>
                  <a href="#" className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Video Lectures
                  </a>
                  <a href="#" className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    FAQs & Discussion
                  </a>
                  <a href="#" className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Practice Exercises
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-4">No Modules Found</h2>
            <p className="text-gray-600 mb-6">This learning pathway doesn't have any modules yet.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white p-8 w-full mt-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold mb-2">Ed-Venture</h2>
              <p className="text-lg">
                Let's start your adventure<br />
                for a bright future
              </p>
            </div>
            
            <div>
              <p className="text-xl mb-4">Company</p>
              <div className="flex gap-6">
                <a href="#" className="hover:underline">About Us</a>
                <a href="#" className="hover:underline">Contact</a>
                <a href="#" className="hover:underline">FAQ</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LearningPathway;
