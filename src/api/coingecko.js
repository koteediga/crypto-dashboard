import axios from 'axios';

// Always use environment variables
const API_BASE = process.env.REACT_APP_COINGECKO_API_BASE;
const API_KEY = process.env.REACT_APP_COINGECKO_API_KEY;

console.log("Loaded API Key:", process.env.REACT_APP_COINGECKO_API_KEY);

if (!API_BASE || !API_KEY) {
  console.warn("⚠️ Missing API_BASE or API_KEY. Check your .env file.");
}

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Coins Markets
export const fetchCoinsMarkets = async (page = 1, perPage = 50) => {
  try {
    return await api.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage,
        page,
        price_change_percentage: '24h',
        sparkline: false,
        "x-cg-demo-api-key": API_KEY,
      },
    });
  } catch (err) {
    console.error("❌ Error fetching coins markets:", err);
    throw err;
  }
};

// Trending Coins
export const fetchTrendingCoins = async () => {
  try {
    return await api.get('/search/trending', {
      params: {
        "x-cg-demo-api-key": API_KEY,
      },
    });
  } catch (err) {
    console.error("❌ Error fetching trending coins:", err);
    throw err;
  }
};

// Coin Details
export const fetchCoinDetails = async (id) => {
  try {
    return await api.get(`/coins/${id}`, {
      params: {
        "x-cg-demo-api-key": API_KEY,
        localization: false,
        market_data: true,
        tickers: false,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
  } catch (err) {
    console.error(`❌ Error fetching details for coin ${id}:`, err);
    throw err;
  }
};
