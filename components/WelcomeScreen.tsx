
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const LaptopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.7 20H3.3a1 1 0 0 1-.58-1.45L4 16" />
    </svg>
);


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center bg-slate-800 p-8 rounded-2xl shadow-2xl animate-fade-in">
        <div className="flex justify-center items-center mb-6">
            <LaptopIcon className="w-16 h-16 text-cyan-400" />
        </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
        Find Your Perfect Laptop
      </h1>
      <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
        Answer a few quick questions, and our AI will analyze your needs to recommend the best laptops for you, complete with a compatibility score.
      </p>
      <button
        onClick={onStart}
        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default WelcomeScreen;
