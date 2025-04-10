import React, { useState, useEffect, useRef } from 'react';
import './journeys.css';

const Journeys = ({journey_id}) => {
  const [currentModule, setCurrentModule] = useState(0);
  const containerRef = useRef(null);
  const [paths, setPaths] = useState([]);
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const user_id = "1";

  useEffect(() => {
    const fetchUserJourneys = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://vzxnxn5t-8000.inc1.devtunnels.ms/edventure/journey/${journey_id}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        setModules(data);
      } catch (err) {
        console.error('Failed to fetch user journeys:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserJourneys();
  }, []);

  useEffect(() => {
    console.log("Modules Updated:", modules);
    calculatePaths();
  }, [modules]);

  const calculatePaths = () => {
    if (!containerRef.current || modules.length < 2) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const newPaths = [];

    for (let i = 0; i < modules.length - 1; i++) {
      const startX = (parseFloat(modules[i].left) * containerRect.width) / 100;
      const startY = (parseFloat(modules[i].top) * containerRect.height) / 100;
      const endX = (parseFloat(modules[i + 1].left) * containerRect.width) / 100;
      const endY = (parseFloat(modules[i + 1].top) * containerRect.height) / 100;

      newPaths.push(`M ${startX + 40} ${startY + 40} L ${endX + 40} ${endY + 40}`);
    }

    setPaths(newPaths);
  };

  useEffect(() => {
    window.addEventListener('resize', calculatePaths);
    return () => window.removeEventListener('resize', calculatePaths);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  const moveBoat = (moduleId) => {
    setCurrentModule(moduleId);
  };

  return (
    <div className="journey-container w-[100vw] h-screen" ref={containerRef}>
      <svg className="path-svg">
        {paths.map((path, index) => (
          <path
            key={index}
            d={path}
            stroke="#333"
            strokeWidth="3"
            fill="none"
            strokeDasharray="10,10"
          />
        ))}
      </svg>
      {modules.map((module) => (
        <div
          key={module.id}
          className="module"
          style={{ left: module.left, top: module.top }}
          onClick={() => moveBoat(module.id)}
        >
          {module.title}
        </div>
      ))}
      {modules.length > 0 && (
        <div
          className="boat"
          style={{
            left: modules[currentModule]?.left || "0%",
            top: modules[currentModule]?.top || "0%",
          }}
        />
      )}
    </div>
  );
};

export default Journeys;
