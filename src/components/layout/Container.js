import React from 'react';

const Container = ({ children }) => (
  <div style={{
    maxWidth: 1200,
    margin: '32px auto',
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2.5px 24px 0 rgba(0,0,0,0.07)',
    padding: '32px 24px 32px 24px',
    minHeight: '90vh'
  }}>
    {children}
  </div>
);

export default Container;
