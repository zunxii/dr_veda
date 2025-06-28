import React from 'react'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-slate-700 font-medium">Processing your request...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner
