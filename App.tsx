
import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionCard from './components/QuestionCard';
import ResultsDisplay from './components/ResultsDisplay';
import Loader from './components/Loader';
import ProgressBar from './components/ProgressBar';
import { getLaptopRecommendations } from './services/geminiService';
import { quizQuestions } from './constants';
import type { Answer, LaptopRecommendation } from './types';
import { QuizState } from './types';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.WELCOME);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [recommendations, setRecommendations] = useState<LaptopRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = () => {
    setQuizState(QuizState.QUIZ);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setRecommendations([]);
    setError(null);
  };
  
  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, { question: quizQuestions[currentQuestionIndex].question, answer }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      fetchRecommendations(newAnswers);
    }
  };

  const fetchRecommendations = useCallback(async (finalAnswers: Answer[]) => {
    setQuizState(QuizState.LOADING);
    try {
      const result = await getLaptopRecommendations(finalAnswers);
      // Ensure the result is sorted by match percentage descending
      const sortedResults = result.sort((a, b) => b.matchPercentage - a.matchPercentage);
      setRecommendations(sortedResults);
      setQuizState(QuizState.RESULTS);
    } catch (err) {
      console.error(err);
      setError('Sorry, we encountered an issue generating recommendations. Please try again.');
      setQuizState(QuizState.RESULTS); // Go to results view to show the error
    }
  }, []);

  const renderContent = () => {
    switch (quizState) {
      case QuizState.WELCOME:
        return <WelcomeScreen onStart={startQuiz} />;
      case QuizState.QUIZ:
        return (
          <>
            <ProgressBar current={currentQuestionIndex + 1} total={quizQuestions.length} />
            <QuestionCard
              question={quizQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          </>
        );
      case QuizState.LOADING:
        return <Loader />;
      case QuizState.RESULTS:
        return <ResultsDisplay recommendations={recommendations} error={error} onRestart={startQuiz} />;
      default:
        return <WelcomeScreen onStart={startQuiz} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
       <div className="w-full max-w-2xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
