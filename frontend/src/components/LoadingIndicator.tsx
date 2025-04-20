import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = 'Loading...', 
  size = 'medium' 
}) => {
  const sizeClass = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 py-2">
      <div className="flex space-x-2 justify-center items-center">
        <div className={`${sizeClass[size]} flex`}>
          <div className="h-full w-1 bg-primary rounded-full animate-pulse mx-0.5"></div>
          <div className="h-full w-1 bg-primary rounded-full animate-pulse animation-delay-150 mx-0.5"></div>
          <div className="h-full w-1 bg-primary rounded-full animate-pulse animation-delay-300 mx-0.5"></div>
          <div className="h-full w-1 bg-primary rounded-full animate-pulse animation-delay-450 mx-0.5"></div>
        </div>
      </div>
      {message && (
        <p className="text-sm text-gray-400 font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingIndicator;