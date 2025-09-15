import React from 'react';

const Card = ({ title, children }) => (
  <div style={{
    flex: 1,
    minWidth: 225,
    background: '#f6f7fa',
    borderRadius: 12,
    padding: 18,
    margin: 8,
    boxShadow: '0 1.5px 9px 0 rgba(60,60,70,0.06)',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <h4 style={{ margin: '0 0 12px', fontWeight: 600, color: "#234" }}>{title}</h4>
    <div>{children}</div>
  </div>
);

export default Card;
