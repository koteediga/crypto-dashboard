import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_COINGECKO_API_BASE,
  timeout: 10000,
});

export const fetchCoinsMarkets = (page = 1, perPage = 50) => {
  return api.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      price_change_percentage: '24h',
      sparkline: false,
    },
  });
};

export const fetchTrendingCoins = () => api.get('/search/trending');

export const fetchCoinDetails = (id) => api.get(`/coins/${id}`);
