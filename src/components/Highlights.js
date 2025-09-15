import React, { useEffect, useState } from 'react';
import { fetchCoinsMarkets, fetchTrendingCoins } from '../api/coingecko';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const Highlights = () => {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [highestVolume, setHighestVolume] = useState([]);
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHighlights() {
      setLoading(true);
      setError(null);

      try {
        // ✅ Fetch markets
        const coinsRes = await fetchCoinsMarkets(1, 100);
        const coins = coinsRes?.data ?? [];

        // ✅ Handle null values safely
        const safeCoins = coins.map(c => ({
          ...c,
          price_change_percentage_24h: c.price_change_percentage_24h ?? 0,
          total_volume: c.total_volume ?? 0,
        }));

        setTopGainers(
          [...safeCoins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 5)
        );
        setTopLosers(
          [...safeCoins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 5)
        );
        setHighestVolume(
          [...safeCoins].sort((a, b) => b.total_volume - a.total_volume).slice(0, 5)
        );

        // ✅ Fetch trending
        const trendingRes = await fetchTrendingCoins();
        const trendingCoins = trendingRes?.data?.coins ?? [];
        setTrending(trendingCoins.slice(0, 5));

      } catch (e) {
        console.error("❌ Failed to load highlights:", e);
        setError('Failed to load highlights. Please try again later.');
      }

      setLoading(false);
    }

    loadHighlights();
  }, []);

  // 🔹 Helper renderer
  const renderList = (title, list, keyExtractor, renderItem) => (
    <div style={{ marginBottom: 20 }}>
      <h3>{title}</h3>
      <ul>
        {list.map(item => (
          <li key={keyExtractor(item)}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
      {renderList(
        'Top Gainers (24h)',
        topGainers,
        c => c.id,
        coin => `${coin.name} (${coin.symbol.toUpperCase()}) +${coin.price_change_percentage_24h.toFixed(2)}%`
      )}
      {renderList(
        'Top Losers (24h)',
        topLosers,
        c => c.id,
        coin => `${coin.name} (${coin.symbol.toUpperCase()}) ${coin.price_change_percentage_24h.toFixed(2)}%`
      )}
      {renderList(
        'Highest Volume',
        highestVolume,
        c => c.id,
        coin => `${coin.name} (${coin.symbol.toUpperCase()}) $${coin.total_volume.toLocaleString()}`
      )}
      {renderList(
        'Trending Coins',
        trending,
        t => t.item.id,
        ({ item }) => `${item.name} (${item.symbol.toUpperCase()})`
      )}
    </div>
  );
};

export default Highlights;
