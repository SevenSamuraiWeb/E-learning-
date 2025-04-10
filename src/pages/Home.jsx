import React, { useState } from 'react';

const Home = () => {
  const [learningGoal, setLearningGoal] = useState('');
  const [level, setSelectedLevel] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://vzxnxn5t-8000.inc1.devtunnels.ms/api/learning-goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: learningGoal,
          difficulty: level
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 text-center">
          Your Learning Journey Starts Here
        </h1>
        
        {/* Main Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Learning Goal Input */}
            <div>
              <label htmlFor="learningGoal" className="block text-lg font-medium text-gray-700 mb-2">
                What would you like to learn?
              </label>
              <textarea
                id="learningGoal"
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                placeholder="Describe your learning goal..."
                required
              />
            </div>

            {/* Level Selection */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!learningGoal || !level || loading}
              className={`w-full py-3 px-6 rounded-lg text-white text-lg font-medium transition-colors ${
                !learningGoal || !level || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Processing...' : 'Generate Learning Path'}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Results Display */}
          {data && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Personalized Learning Path</h2>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap bg-white p-4 rounded-lg border border-gray-200">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
 </div>
//         </div>
//       </div>

//       <div className="w-full bg-gray-100 py-8">
//         <h2 className="text-center text-3xl font-bold mb-6">
//           What Our Learners Say
//         </h2>
//         <div className="marquee-container overflow-hidden" ref={marqueeRef}>
//           <div className={`marquee-content flex ${isPaused ? "paused" : ""}`}>
//             {allTestimonials.map((testimonial, index) => (
//               <TestimonialCard key={index} testimonial={testimonial} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
