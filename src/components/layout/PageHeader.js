import React from 'react';

const PageHeader = ({ title }) => (
  <header style={{
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
  }}>
    <h1 style={{ fontWeight: 800, letterSpacing: '-1px', fontSize: 38, margin: 0, color: '#222' }}>{title}</h1>
  </header>
);

export default PageHeader;
