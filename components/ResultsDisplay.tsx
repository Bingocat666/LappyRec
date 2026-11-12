
import React from 'react';
import LaptopCard from './LaptopCard';
import type { LaptopRecommendation } from '../types';

interface ResultsDisplayProps {
  recommendations: LaptopRecommendation[];
  error: string | null;
  onRestart: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ recommendations, error, onRestart }) => {
  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Your AI-Powered Recommendations</h1>
        <p className="text-slate-400 text-lg">Here are the top laptops that match your needs.</p>
      </div>

      {error ? (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center">
          <p className="font-bold">An Error Occurred</p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <LaptopCard key={index} recommendation={rec} />
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <button
          onClick={onRestart}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
