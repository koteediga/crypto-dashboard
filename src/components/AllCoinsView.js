import React, { useEffect, useState, useCallback } from 'react';
import { fetchCoinsMarkets } from '../api/coingecko';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const SORT_FIELDS = {
  MarketCap: 'market_cap',
  Price: 'current_price',
  Change24h: 'price_change_percentage_24h',
  Volume24h: 'total_volume',
};

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const AllCoinsView = ({ onRowClick }) => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [sortKey, setSortKey] = useState(SORT_FIELDS.MarketCap);
  const [sortAsc, setSortAsc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCoins = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchCoinsMarkets(page);
      setCoins((prev) => [...prev, ...res.data]);
    } catch {
      setError('Failed to fetch coins data.');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadCoins();
  }, [loadCoins]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    let compare = a[sortKey] - b[sortKey];
    return sortAsc ? compare : -compare;
  });

  const onSortClick = (field) => {
    if (field === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(field);
      setSortAsc(false);
    }
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <input
        type="text"
        placeholder="Search by name or symbol"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '10px', marginBottom: '10px', width: '300px', fontSize: '1rem' }}
      />
      {error && <ErrorMessage message={error} />}
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 700, textAlign: 'left', fontSize: '0.9rem' }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th style={{ cursor: 'pointer' }} onClick={() => onSortClick(SORT_FIELDS.Price)}>Price {sortKey === SORT_FIELDS.Price ? (sortAsc ? '▲' : '▼') : ''}</th>
            <th style={{ cursor: 'pointer' }} onClick={() => onSortClick(SORT_FIELDS.Change24h)}>24h Change % {sortKey === SORT_FIELDS.Change24h ? (sortAsc ? '▲' : '▼') : ''}</th>
            <th style={{ cursor: 'pointer' }} onClick={() => onSortClick(SORT_FIELDS.MarketCap)}>Market Cap {sortKey === SORT_FIELDS.MarketCap ? (sortAsc ? '▲' : '▼') : ''}</th>
            <th style={{ cursor: 'pointer' }} onClick={() => onSortClick(SORT_FIELDS.Volume24h)}>24h Volume {sortKey === SORT_FIELDS.Volume24h ? (sortAsc ? '▲' : '▼') : ''}</th>
          </tr>
        </thead>
        <tbody>
          {sortedCoins.length === 0 && !loading && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: 20 }}>
                No coins found.
              </td>
            </tr>
          )}
          {sortedCoins.map((coin) => (
            <tr key={coin.id}
                onClick={() => onRowClick && onRowClick(coin.id)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter' && onRowClick) onRowClick(coin.id); }}>
              <td>{coin.market_cap_rank}</td>
              <td><img src={coin.image} alt={coin.name} style={{ width: 20, height: 20, marginRight: 8 }} />{coin.name} ({coin.symbol.toUpperCase()})</td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td style={{ color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>{coin.price_change_percentage_24h?.toFixed(2)}%</td>
              <td>${coin.market_cap.toLocaleString()}</td>
              <td>${coin.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <Loader />}
      <button
        onClick={() => setPage(page + 1)}
        disabled={loading}
        style={{ marginTop: 20, padding: '10px 20px', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
        Load More
      </button>
    </div>
  );
};

export default AllCoinsView;
