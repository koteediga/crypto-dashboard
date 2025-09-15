import React from 'react';

const Container = ({ children }) => (
  <div style={{
    maxWidth: 1200,
    margin: '0 auto',
    padding: 24,
    background: '#fafbfc',
    minHeight: '100vh'
  }}>
    {children}
  </div>
);

export default Container;
