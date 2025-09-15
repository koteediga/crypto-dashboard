import React from 'react';

const PageHeader = ({ title }) => (
  <header style={{
    padding: '24px 0 12px 0',
    borderBottom: '1px solid #eee',
    marginBottom: 32,
    textAlign: 'center'
  }}>
    <h1 style={{ fontWeight: '600' }}>{title}</h1>
  </header>
);

export default PageHeader;
