import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const Quiz = () => {
  const { moduleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Get journeyId from location state or localStorage
  const journeyId = location.state?.journeyId || localStorage.getItem('currentJourneyId');
  const moduleIndex = parseInt(moduleId, 10) || 0;

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        if (!journeyId) {
          throw new Error('No journey ID found. Please start from the home page.');
        }

        console.log('Fetching quiz data for module:', moduleIndex);
        
        // Fetch quiz data from API
        const response = await fetch(`https://localhost:8000/edventure/quiz/${journeyId}/${moduleIndex}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch quiz data: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched quiz data:', data);
        
        if (!data || !data.questions || data.questions.length === 0) {
          throw new Error('No quiz questions available for this module');
        }

        setQuizData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching quiz data:', err);
        setError(err.message);
        
        // Create fallback quiz data for development/testing
        const fallbackData = {
          module_name: `Module ${moduleIndex + 1} Quiz`,
          module_id: moduleIndex.toString(),
          questions: [
            {
              question: "What is React?",
              options: [
                "A server-side framework for building user interfaces.",
                "A JavaScript library for building user interfaces.",
                "A markup language for styling user interfaces.",
                "A database management system for web applications."
              ],
              correct_answer: 2,
              
            },
            {
              question: "Which company created and maintains React?",
              options: [
                "Google",
                "Microsoft",
                "Facebook",
                "Amazon"
              ],
              correct_answer: 3,
              
            },
            {
              question: "What is the primary purpose of JSX in React?",
              options: [
                "To style React components.",
                "To define the structure and content of React components.",
                "To handle user interactions in React components.",
                "To manage data flow within a React application."
              ],
              correct_answer: 2,
              
            },
            {
               question: "What is a 'component' in React?",
              options: [
                "A reusable piece of UI.",
                "A specific HTML tag.",
                "A JavaScript function.",
                "A CSS style rule."
              ],
              correct_answer: 1,
             
            },
            {
              question: "Which of the following is NOT a core concept of React?",
              options: [
                "Components",
                "JSX",
                "Virtual DOM",
                "Model-View-Controller (MVC) architecture"
              ],
              correct_answer: 4,
              
            },
            {
               question: "What is the main advantage of using the Virtual DOM in React?",
              options: [
                "It simplifies styling of components.",
                "It enhances SEO performance.",
                "It improves performance by minimizing direct manipulations of the actual DOM.",
                "It allows developers to write server-side code in JavaScript."
              ],
              correct_answer: 3,
             
            },
            {
               question: "What method is used to update the UI in a React component?",
              options: [
                "render()",
                "setState()",
                "componentDidMount()",
                "componentWillUnmount()"
              ],
              correct_answer: 2,
             
            },
            {
              question: "What are 'props' in React?",
              options: [
                "Internal data of a component.",
                "Methods that trigger UI updates.",
                "Input data passed to a component from a parent component.",
                "Event listeners attached to a component."
              ],
              correct_answer: 3,
              
            },
            {
              question: "What is 'state' in React?",
              options: [
                "Data managed by the parent component.",
                "Internal data of a component that can trigger UI updates when changed.",
                "Static content displayed in a component.",
                "Styling information for a component."
              ],
              correct_answer: 2
              
            },
            {
              question: "What is the entry point of a React application?",
              options: [
                "index.html",
                "App.js",
                "main.js",
                "index.js"
              ],
              correct_answer: 4
              
            }
          ]
        };
        
        setQuizData(fallbackData);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [journeyId, moduleIndex]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleSubmitQuiz = async () => {
    // Calculate score
    let correctCount = 0;
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / quizData.questions.length) * 100);
    setScore(finalScore);
    setQuizCompleted(true);

    try {
      // Submit quiz results to API
      const response = await fetch('https://vzxnxn5t-8000.inc1.devtunnels.ms/edventure/quiz-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          j_id: journeyId,
          module_id: quizData.module_id,
          score: finalScore,
          answers: selectedAnswers
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Failed to submit quiz results:', response.status);
      }
    } catch (error) {
      console.error('Error submitting quiz results:', error);
    }
  };

  const handleContinue = () => {
    // Navigate to next module
    const nextModuleIndex = moduleIndex + 1;
    navigate(`/pathway`, { state: { journeyId, activeModule: nextModuleIndex } });
  };

  const isQuestionAnswered = (questionIndex) => {
    return selectedAnswers[questionIndex] !== undefined;
  };

  const allQuestionsAnswered = () => {
    return quizData && quizData.questions.length === Object.keys(selectedAnswers).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (error && !quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => navigate('/pathway', { state: { journeyId } })}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Pathway
          </button>
        </div>
      </div>
    );
  }

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
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{quizData?.module_name || `Module ${moduleIndex + 1} Quiz`}</h1>
            {!quizCompleted && (
              <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
                Question {currentQuestion + 1} of {quizData?.questions.length}
              </span>
            )}
          </div>

          {quizCompleted ? (
            // Quiz Results
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center border-8 border-blue-100">
                  <span className="text-4xl font-bold text-blue-600">{score}%</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">
                {score >= 70 ? 'Congratulations!' : 'Quiz Completed'}
              </h2>
              <p className="text-gray-600 mb-6">
                {score >= 70 
                  ? 'You passed the quiz and can move to the next module.'
                  : 'You might want to review the material before continuing.'}
              </p>
              
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => navigate('/pathway', { state: { journeyId } })}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Review Module
                </button>
                <button 
                  onClick={handleContinue}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Continue to Next Module
                </button>
              </div>
            </div>
          ) : (
            // Quiz Questions
            <div>
              {quizData && quizData.questions && quizData.questions[currentQuestion] && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                      {quizData.questions[currentQuestion].question}
                    </h2>
                    
                    <div className="space-y-3 mt-4">
                      {quizData.questions[currentQuestion].options.map((option, index) => (
                        <div 
                          key={index}
                          className={`border p-4 rounded-lg cursor-pointer transition-colors ${
                            selectedAnswers[currentQuestion] === index 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => handleAnswerSelect(currentQuestion, index)}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 mr-3 rounded-full border ${
                              selectedAnswers[currentQuestion] === index 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {selectedAnswers[currentQuestion] === index && (
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                              )}
                            </div>
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button 
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
                      disabled={currentQuestion === 0}
                      onClick={() => setCurrentQuestion(prev => prev - 1)}
                    >
                      Previous Question
                    </button>
                    
                    {currentQuestion < quizData.questions.length - 1 ? (
                      <button 
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        disabled={!isQuestionAnswered(currentQuestion)}
                        onClick={() => setCurrentQuestion(prev => prev + 1)}
                      >
                        Next Question
                      </button>
                    ) : (
                      <button 
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                        disabled={!allQuestionsAnswered()}
                        onClick={handleSubmitQuiz}
                      >
                        Submit Quiz
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {/* Progress Indicators */}
              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Progress</span>
                  <span className="text-gray-700 font-medium">
                    {Object.keys(selectedAnswers).length} of {quizData?.questions.length} answered
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(Object.keys(selectedAnswers).length / quizData?.questions.length) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-center mt-4">
                  {quizData?.questions.map((_, index) => (
                    <div 
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-8 h-8 mx-1 flex items-center justify-center rounded-full cursor-pointer ${
                        currentQuestion === index 
                          ? 'bg-blue-600 text-white' 
                          : isQuestionAnswered(index)
                            ? 'bg-blue-200 text-blue-800'
                            : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Quiz;