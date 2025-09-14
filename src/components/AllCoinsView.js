import React, { useEffect, useState } from 'react';
import { fetchCoinsMarkets } from '../api/coingecko';

const AllCoinsView = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('market_cap');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCoinsMarkets(page);
        setCoins((prev) => [...prev, ...res.data]);
      } catch (err) {
        setError('Failed to load coins');
      } finally {
        setLoading(false);
      }
    };
    loadCoins();
  }, [page]);

  // Filter & sort
  const filtered = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) =>
    sortKey === 'price_change_percentage_24h'
      ? b.price_change_percentage_24h - a.price_change_percentage_24h
      : b[sortKey] - a[sortKey]
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or symbol"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10, padding: 5, width: 300 }}
      />

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>
              Price{' '}
              <button onClick={() => setSortKey('current_price')}>Sort</button>
            </th>
            <th>
              24h Change %{' '}
              <button onClick={() => setSortKey('price_change_percentage_24h')}>Sort</button>
            </th>
            <th>
              Market Cap{' '}
              <button onClick={() => setSortKey('market_cap')}>Sort</button>
            </th>
            <th>
              24h Volume{' '}
              <button onClick={() => setSortKey('total_volume')}>Sort</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td>
                <img
                  src={coin.image}
                  alt={coin.name}
                  style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 5 }}
                />
                {coin.name} ({coin.symbol.toUpperCase()})
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td
                style={{
                  color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red',
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>${coin.market_cap.toLocaleString()}</td>
              <td>${coin.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <p>Loading...</p>}

      <button onClick={() => setPage((p) => p + 1)} disabled={loading} style={{ marginTop: 10 }}>
        Load More
      </button>
    </div>
  );
};

export default AllCoinsView;
