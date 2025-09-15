import React, { useState } from "react";
import Highlights from "./components/Highlights";
import AllCoinsView from "./components/AllCoinsView";
import CoinDetailsModal from "./components/CoinDetailsModal";

function App() {
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  return (
    <div>
      <h1>Crypto Dashboard</h1>
      <Highlights />
      <AllCoinsView onRowClick={setSelectedCoinId} />
      {selectedCoinId && <CoinDetailsModal coinId={selectedCoinId} onClose={() => setSelectedCoinId(null)} />}
    </div>
  );
}

export default App;
