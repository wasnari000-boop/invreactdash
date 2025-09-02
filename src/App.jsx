
import React, { useState } from 'react';
import StockDashboard from './pages/StockDashboard';
import ProductDetails from './pages/ProductDetails';

function App() {
  const [page, setPage] = useState('dashboard');

  return (
    <div>
      {page === 'dashboard' ? <StockDashboard setPage={setPage} /> : <ProductDetails setPage={setPage} />}
    </div>
  );
}

export default App
