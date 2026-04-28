import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="detail-loading">
      <div className="modern-spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
