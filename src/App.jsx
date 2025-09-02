
import React, { useState } from 'react';
import StockDashboard from './pages/StockDashboard';
import ProductDetails from './pages/ProductDetails';

function App() {
  const [page, setPage] = useState('dashboard');

  return (
    <div>
      <nav style={{ display: 'flex', gap: 16, padding: 16 }}>
        <button onClick={() => setPage('dashboard')}>Stock Dashboard</button>
        <button onClick={() => setPage('product')}>Product Details</button>
      </nav>
      {page === 'dashboard' ? <StockDashboard /> : <ProductDetails />}
    </div>
  );
}

export default App
