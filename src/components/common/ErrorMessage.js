import React from 'react';
import { Button } from 'react-bootstrap';

const ErrorMessage = ({ message = 'Something went wrong.', onRetry }) => {
  return (
    <div className="products-error">
      <p>⚠️ {message}</p>
      {onRetry && (
        <Button className="retry-btn" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
