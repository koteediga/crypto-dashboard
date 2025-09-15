import React from 'react';

const Card = ({ title, children }) => (
  <div style={{
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)', 
    borderRadius: 8, 
    padding: 16, 
    minWidth: 180, 
    background: '#fff', 
    margin: 8,
  }}>
    <h4 style={{ margin: 0, marginBottom: 6 }}>{title}</h4>
    {children}
  </div>
);

export default Card;
