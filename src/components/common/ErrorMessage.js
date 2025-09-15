import React from 'react';

const ErrorMessage = ({ message }) => (
  <div style={{ color: 'red', textAlign: 'center', margin: 16 }}>
    {message}
  </div>
);

export default ErrorMessage;
