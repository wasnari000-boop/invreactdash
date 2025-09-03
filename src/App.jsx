
import React, { useState } from 'react';
import StockDashboard from './pages/StockDashboard';
import ProductDetails from './pages/ProductDetails';

function App() {
  const [page, setPage] = useState('dashboard');
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div>
      {page === 'dashboard' ? (
        <StockDashboard setPage={setPage} setSelectedProductId={setSelectedProductId} />
      ) : (
        <ProductDetails setPage={setPage} productId={selectedProductId} />
      )}
    </div>
  );
}

export default App
