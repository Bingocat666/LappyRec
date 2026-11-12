
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-800 rounded-2xl shadow-2xl">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400 mb-6"></div>
      <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Needs...</h2>
      <p className="text-slate-400">Our AI is finding the perfect laptops for you. This might take a moment.</p>
    </div>
  );
};

export default Loader;
