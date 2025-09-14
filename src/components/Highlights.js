import React, { useEffect, useState } from 'react';
import { fetchTrendingCoins } from '../api/coingecko';

const Highlights = () => {
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const res = await fetchTrendingCoins();
        setTrending(res.data.coins);
      } catch {
        setError('Failed to load trending coins');
      }
    };
    loadTrending();
  }, []);

  return (
    <div>
      <h2>Trending Coins</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {trending.map(({ item }) => (
          <li key={item.id}>
            <img src={item.small} alt={item.name} style={{ width: 20, marginRight: 5 }} />
            {item.name} ({item.symbol.toUpperCase()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Highlights;
