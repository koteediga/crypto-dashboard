export const mapCoinApiToModel = (apiCoin) => ({
  id: apiCoin.id,
  rank: apiCoin.market_cap_rank,
  name: apiCoin.name,
  symbol: apiCoin.symbol,
  image: apiCoin.image,
  currentPrice: apiCoin.current_price,
  priceChange24h: apiCoin.price_change_percentage_24h,
  marketCap: apiCoin.market_cap,
  volume24h: apiCoin.total_volume,
});
