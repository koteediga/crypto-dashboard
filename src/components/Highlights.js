import React, { useEffect, useState } from 'react';
import { fetchCoinsMarkets, fetchTrendingCoins } from '../api/coingecko';

const cardStyle = {
  flex: 1,
  minWidth: 215,
  background: '#f7fafd',
  borderRadius: 12,
  padding: '18px 18px 16px 18px',
  margin: '8px 0',
  boxShadow: '0 1.5px 10px 0 rgba(60,60,70,0.06)',
  display: 'flex',
  flexDirection: 'column'
};

const ulStyle = {
  margin: 0,
  padding: 0,
  listStyle: 'none',
  fontSize: 15,
  lineHeight: 1.76
};

const headingStyle = {
  margin: '0 0 12px 0',
  fontWeight: 700,
  color: '#25315a',
  fontSize: 18,
  letterSpacing: '-0.5px'
};

const gainColor = { color: '#21b94d', fontWeight: 600 };
const lossColor = { color: '#d93b3b', fontWeight: 600 };
const volumeColor = { color: '#4834d4', fontWeight: 600 };
const trendingColor = { color: '#2f3640', fontWeight: 600 };

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
        const coinsRes = await fetchCoinsMarkets(1, 100);
        const coins = coinsRes?.data ?? [];
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

        const trendingRes = await fetchTrendingCoins();
        setTrending(trendingRes?.data?.coins.slice(0, 5) ?? []);
      } catch (e) {
        setError('Failed to load highlights. Please try again later.');
      }
      setLoading(false);
    }
    loadHighlights();
  }, []);

  if (loading) {
    return (
      <div style={{
        padding: "28px 0", textAlign: 'center', fontSize: 19, color: '#245'
      }}>
        Loading highlights...
      </div>
    );
  }
  if (error) {
    return (
      <div style={{
        textAlign: 'center', fontWeight: 600, fontSize: 17,
        color: '#ec2525', margin: '23px auto'
      }}>{error}</div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      gap: 22,
      margin: '0 0 32px 0',
      flexWrap: 'wrap',
      alignItems: 'stretch',
      justifyContent: 'space-between'
    }}>
      <div style={cardStyle}>
        <div style={headingStyle}>Top Gainers (24h)</div>
        <ul style={ulStyle}>
          {topGainers.map(coin => (
            <li key={coin.id}>
              <span style={gainColor}>{coin.name}</span>
              <span style={{ color: "#7a8595", fontSize: 13 }}> ({coin.symbol.toUpperCase()}) </span>
              <span style={gainColor}>+{coin.price_change_percentage_24h.toFixed(2)}%</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={cardStyle}>
        <div style={headingStyle}>Top Losers (24h)</div>
        <ul style={ulStyle}>
          {topLosers.map(coin => (
            <li key={coin.id}>
              <span style={lossColor}>{coin.name}</span>
              <span style={{ color: "#7a8595", fontSize: 13 }}> ({coin.symbol.toUpperCase()}) </span>
              <span style={lossColor}>{coin.price_change_percentage_24h.toFixed(2)}%</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={cardStyle}>
        <div style={headingStyle}>Highest Volume</div>
        <ul style={ulStyle}>
          {highestVolume.map(coin => (
            <li key={coin.id}>
              <span style={volumeColor}>{coin.name}</span>
              <span style={{ color: "#7a8595", fontSize: 13 }}> ({coin.symbol.toUpperCase()}) </span>
              <span style={volumeColor}>${coin.total_volume.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={cardStyle}>
        <div style={headingStyle}>Trending Coins</div>
        <ul style={ulStyle}>
          {trending.map(t => {
            const item = t.item || t;
            return (
              <li key={item.id}>
                <span style={trendingColor}>{item.name}</span>
                <span style={{ color: "#7a8595", fontSize: 13 }}> ({item.symbol.toUpperCase()})</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Highlights;
