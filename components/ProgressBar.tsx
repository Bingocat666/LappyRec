
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-slate-700 rounded-full h-4 mb-8">
      <div
        className="bg-cyan-500 h-4 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
       <p className="text-center text-sm text-slate-300 -mt-4 font-medium">{current} / {total}</p>
    </div>
  );
};

export default ProgressBar;
