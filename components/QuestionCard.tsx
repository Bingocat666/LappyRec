
import React from 'react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <div className="bg-slate-800 p-8 rounded-2xl shadow-lg w-full animate-slide-up">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-100 mb-8">{question.question}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="w-full bg-slate-700 hover:bg-cyan-600 text-slate-200 font-semibold py-4 px-6 rounded-lg transition-all duration-200 ease-in-out text-left transform hover:-translate-y-1"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
