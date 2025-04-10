import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [learningGoal, setLearningGoal] = useState('');
  const [level, setSelectedLevel] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const trimmedGoal = learningGoal.trim().toLowerCase();
    const allowedGoal = trimmedGoal === 'reactjs';
    const allowedLevel = level === 'beginner';

    if (allowedGoal && allowedLevel) {
      navigate('/journeys', { state: { topic: trimmedGoal, level } });
    } else {
      setError('Only "ReactJS" with level "Beginner" is supported for this demo. Try that!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 text-center">
          Your Learning Journey Starts Here
        </h1>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="learningGoal" className="block text-lg font-medium text-gray-700 mb-2">
                What would you like to learn?
              </label>
              <textarea
                id="learningGoal"
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                placeholder="e.g., ReactJS"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Select your level:
              </label>
              <div className="flex flex-wrap gap-3">
                {['beginner', 'intermediate', 'advanced'].map((levelOption) => (
                  <button
                    key={levelOption}
                    type="button"
                    onClick={() => setSelectedLevel(levelOption)}
                    className={`px-6 py-2 rounded-full transition-colors ${
                      level === levelOption
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {levelOption.charAt(0).toUpperCase() + levelOption.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!learningGoal || !level}
              className={`w-full py-3 px-6 rounded-lg text-white text-lg font-medium transition-colors ${
                !learningGoal || !level
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Try Me!
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
