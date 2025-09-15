import React, { useEffect, useState } from 'react';
import { fetchCoinDetails } from '../api/coingecko';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const modalStyle = { /* as above, unchanged */ };
const modalContentStyle = { /* as above, unchanged */ };

const CoinDetailsModal = ({ coinId, onClose }) => {
  const [coinDetails, setCoinDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coinId) return;
    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCoinDetails(coinId);
        setCoinDetails(res.data);
      } catch (e) {
        setError('Failed to load coin details');
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [coinId]);

  if (!coinId) return null;

  return (
    <div style={modalStyle} onClick={onClose} aria-modal="true" role="dialog">
      <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ float: 'right' }}>Close</button>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {coinDetails && (
          <div>
            <h2>{coinDetails.name} ({coinDetails.symbol.toUpperCase()})</h2>
            <img src={coinDetails.image.large} alt={`${coinDetails.name} logo`} style={{ width: 64, height: 64 }} />
            <p><strong>Current Price:</strong> ${coinDetails.market_data.current_price.usd.toLocaleString()}</p>
            <p><strong>Market Cap:</strong> ${coinDetails.market_data.market_cap.usd.toLocaleString()}</p>
            <p><strong>24h High:</strong> ${coinDetails.market_data.high_24h.usd.toLocaleString()} | <strong>24h Low:</strong> ${coinDetails.market_data.low_24h.usd.toLocaleString()}</p>
            <p><strong>Homepage:</strong> {coinDetails.links.homepage ? <a href={coinDetails.links.homepage} target="_blank" rel="noopener noreferrer">{coinDetails.links.homepage}</a> : 'N/A'}</p>
            <div>
              <h3>Description</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: coinDetails.description.en || 'No description available',
                }}
                style={{ maxHeight: 200, overflowY: 'auto' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CoinDetailsModal;
