import React from 'react';
import AllCoinsView from './components/AllCoinsView';
import Highlights from './components/Highlights';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Crypto Dashboard</h1>
      <Highlights />
      <hr style={{ margin: '20px 0' }} />
      <AllCoinsView />
    </div>
  );
}

export default App;
