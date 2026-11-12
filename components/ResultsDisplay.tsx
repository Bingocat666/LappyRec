
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
        <div className="bg-slate-800/90 border border-red-500/50 rounded-2xl p-6 text-left shadow-xl">
          <div className="flex items-center gap-3 text-red-400 font-bold text-lg mb-2">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Notice: Configuration Required</span>
          </div>
          <p className="text-slate-300 text-sm mb-4 leading-relaxed">{error}</p>

          {error.toLowerCase().includes('api key') && (
            <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-4 text-xs font-mono text-slate-300 space-y-2">
              <p className="text-slate-400 font-sans font-medium">To run locally after downloading from GitHub:</p>
              <div className="bg-slate-950 p-2.5 rounded text-cyan-400 select-all">
                # 1. Create a .env file in the root directory<br />
                # 2. Add your Google Gemini API key:<br />
                GEMINI_API_KEY=your_gemini_api_key_here<br />
                # 3. Restart your dev server:<br />
                npm run dev
              </div>
              <p className="text-slate-400 font-sans pt-1">
                You can get a free API key at{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 underline hover:text-cyan-300 font-medium"
                >
                  aistudio.google.com/app/apikey
                </a>
              </p>
            </div>
          )}
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
