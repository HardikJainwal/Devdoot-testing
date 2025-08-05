'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, CheckCircle } from 'lucide-react';

const QuizModal = ({ isOpen, onClose, quizTitle, questions, doshaInfo, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});   
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setIsAnimating(false);
      }, 150);
    } else {
      calculateResults();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const calculateResults = () => {
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    Object.values(answers).forEach(answer => {
      scores[answer]++;
    });

    let dominantDosha = 'vata';
    if (scores.pitta > scores.vata && scores.pitta >= scores.kapha) {
      dominantDosha = 'pitta';
    } else if (scores.kapha > scores.vata && scores.kapha > scores.pitta) {
      dominantDosha = 'kapha';
    }

    setResults(doshaInfo[dominantDosha]);
    setShowResults(true);
    if (onComplete) onComplete(dominantDosha, scores);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQ?.id];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-slideUp">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#C42323] mb-2">{quizTitle}</h3>
            {!showResults && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#C42323] to-[#2C8C91] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            )}
          </div>
          <button 
            className="ml-4 text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-all duration-200" 
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showResults ? (
            <div className="min-h-[400px] flex flex-col">
              {/* Question Counter */}
              <div className="text-center mb-6">
                <span className="bg-[#C42323] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>

              {/* Question */}
              <div className={`flex-1 transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                    {currentQ?.question}
                  </h4>
                  
                  <div className="space-y-3">
                    {currentQ?.options.map((option, index) => (
                      <label 
                        key={index}
                        className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                          answers[currentQ.id] === option.value
                            ? 'border-[#C42323] bg-red-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name={`question-${currentQ.id}`}
                          value={option.value}
                          checked={answers[currentQ.id] === option.value}
                          onChange={() => handleAnswerSelect(currentQ.id, option.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                          answers[currentQ.id] === option.value
                            ? 'border-[#C42323] bg-[#C42323]'
                            : 'border-gray-300'
                        }`}>
                          {answers[currentQ.id] === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full animate-scaleIn" />
                          )}
                        </div>
                        <span className="text-gray-700 font-medium">{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                    currentQuestion === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#C42323] hover:bg-red-50'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>

                <div className="text-sm text-gray-500">
                  {Object.keys(answers).length}/{questions.length} answered
                </div>

                <button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                    !isAnswered
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : currentQuestion === questions.length - 1
                      ? 'bg-gradient-to-r from-[#C42323] to-[#2C8C91] text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-[#C42323] text-white hover:bg-opacity-90 hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
                  {currentQuestion !== questions.length - 1 && <ChevronRight className="w-5 h-5 ml-2" />}
                </button>
              </div>
            </div>
          ) : (
            // Results Section
            <div className="text-center animate-fadeIn">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-3xl font-bold text-[#C42323] mb-4">{results?.title}</h3>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-teal-50 p-8 rounded-2xl mb-6">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">{results?.description}</p>
                
                <div className="text-left space-y-4">
                  <h4 className="font-semibold text-xl text-[#2C8C91] mb-4">Lifestyle Suggestions:</h4>
                  {results?.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#C42323] rounded-full mt-3 flex-shrink-0" />
                      <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: suggestion }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button 
                  className="bg-[#2C8C91] text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105" 
                  onClick={handleRestart}
                >
                  Take Quiz Again
                </button>
                <button 
                  className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all duration-200" 
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default QuizModal;