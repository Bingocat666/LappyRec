
import React from 'react';
import type { LaptopRecommendation } from '../types';

interface LaptopCardProps {
  recommendation: LaptopRecommendation;
}

const getMatchColor = (percentage: number) => {
  if (percentage >= 95) return 'text-green-400';
  if (percentage >= 85) return 'text-yellow-400';
  return 'text-orange-400';
};

const LaptopCard: React.FC<LaptopCardProps> = ({ recommendation }) => {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700 flex flex-col md:flex-row gap-6 transition-all duration-300 hover:border-cyan-500 hover:shadow-cyan-500/10">
      <div className="flex-shrink-0 w-full md:w-1/3 h-48 md:h-auto bg-slate-700 rounded-lg overflow-hidden">
        <img 
            src={`https://picsum.photos/seed/${recommendation.name.replace(/\s/g, '')}/400/300`}
            alt={recommendation.name} 
            className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-white">{recommendation.name}</h3>
          <div className={`text-2xl font-black ${getMatchColor(recommendation.matchPercentage)}`}>
            {recommendation.matchPercentage}%
            <span className="text-sm font-medium text-slate-400 block text-right -mt-1">Match</span>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{recommendation.description}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-400 border-t border-slate-700 pt-3">
          <p><strong className="text-slate-200">Processor:</strong> {recommendation.specs.processor}</p>
          <p><strong className="text-slate-200">Graphics:</strong> {recommendation.specs.graphics}</p>
          <p><strong className="text-slate-200">RAM:</strong> {recommendation.specs.ram}</p>
          <p><strong className="text-slate-200">Storage:</strong> {recommendation.specs.storage}</p>
        </div>
      </div>
    </div>
  );
};

export default LaptopCard;
