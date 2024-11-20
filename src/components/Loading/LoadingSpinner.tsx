"use client";

import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="animate-spin">
        <svg 
          className="w-16 h-16 text-blue-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
      </div>
      <p className="text-gray-700 font-semibold text-lg">
        Carregando horários disponíveis...
      </p>
    </div>
  );
};

// Alternativa con un spinner más complejo
const LoadingSpinner2 = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent absolute top-0 left-0 animate-spin"></div>
      </div>
      <p className="text-gray-700 font-semibold text-lg">
        Carregando horários disponíveis...
      </p>
    </div>
  );
};

// Spinner con múltiples puntos animados
const LoadingSpinnerDots = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-100"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-200"></div>
      </div>
      <p className="text-gray-700 font-semibold text-lg">
        Carregando horários disponíveis...
      </p>
    </div>
  );
};

export { LoadingSpinner, LoadingSpinner2, LoadingSpinnerDots };