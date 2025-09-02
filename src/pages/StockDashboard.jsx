
// Mock data for demonstration

import React, { useState } from 'react';
import { COLORS, FONT, SHADOW, BORDER_RADIUS, getBadgeTextColor } from '../design';
import { BUTTON, BADGE } from '../design';


const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Product A',
    sku: 'SKU001',
    category: { name: 'Electronics', color: '#7E57C2' },
    supplier: 'Supplier X',
    current_stock: 12,
    reorder_level: 10,
    max_stock_level: 50,
    last_updated: '2025-08-30',
    status: 'low',
    price: 30,
    image_url: '',
  },
  {
    id: 2,
    name: 'Product B',
    sku: 'SKU002',
    category: { name: 'Apparel', color: '#26A69A' },
    supplier: 'Supplier Y',
    current_stock: 0,
    reorder_level: 5,
    max_stock_level: 30,
    last_updated: '2025-08-29',
    status: 'out of stock',
    price: 50,
    image_url: '',
  },
  // ...more products
];

const notifications = [
  { id: 1, message: 'Low stock alert for Product A', is_read: false },
];

function getStatusColor(status) {
  if (status === 'in stock') return COLORS.success;
  if (status === 'low') return COLORS.warning;
  if (status === 'out of stock') return COLORS.danger;
  return COLORS.text;
}


export default function StockDashboard() {
  // Data source toggle: mock or real
  const [useMock, setUseMock] = useState(true);
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  // Fetch real data from PHP backend (example endpoint)
  const fetchRealData = async () => {
    try {
      const res = await fetch('http://localhost/inventory-api/products.php');
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      alert('Failed to fetch real data, using mock data.');
      setProducts(MOCK_PRODUCTS);
    }
  };

  // Switch between mock and real data
  const handleDataToggle = () => {
    if (useMock) {
      fetchRealData();
    } else {
      setProducts(MOCK_PRODUCTS);
    }
    setUseMock(!useMock);
  };

  // ...existing code (KPIs, modal, handlers, etc.)...

  // KPIs
  const totalValue = products.reduce((sum, p) => sum + p.current_stock * p.price, 0);
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.status === 'low').length;
  const outOfStock = products.filter(p => p.status === 'out of stock').length;
  const needsReorder = products.filter(p => p.current_stock < p.reorder_level);

  // Modal state for placing order
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Sales history graphic placeholder data
  const salesHistory = [
    { month: 'Jul', sales: 120 },
    { month: 'Aug', sales: 90 },
    { month: 'Sep', sales: 150 },
  ];

  // Select product for bulk reorder
  const handleSelect = (id) => {
    setSelectedProducts(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
  };
  const handleSelectAll = () => {
    if (selectedProducts.length === needsReorder.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(needsReorder.map(p => p.id));
    }
  };

  return (
  <div style={{ background: COLORS.gradient, minHeight: '100vh', height: '100vh', width: '100vw', fontFamily: FONT.family, overflow: 'auto' }}>
      {/* Header/Nav */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 32px', background: COLORS.surface, boxShadow: SHADOW }}>
        <div style={{ fontWeight: 700, fontSize: 24, color: COLORS.primary }}>InventoryFlow</div>
        <nav style={{ display: 'flex', gap: 24 }}>
          <span style={{ color: COLORS.primary, fontWeight: 600 }}>Dashboard</span>
          <a href="/product-details" style={{ color: COLORS.muted, textDecoration: 'none', fontWeight: 600 }}>Products</a>
        </nav>
      </header>
      {/* Data Source Toggle */}
      <div style={{ padding: '16px 32px' }}>
          <button style={BUTTON.info} onClick={handleDataToggle}>
            {useMock ? 'Switch to Real Data' : 'Use Mock Data'}
          </button>
      </div>
      {/* ...existing code (KPI cards, tables, modal, etc.)... */}
  {/* KPI Cards */}
      <section style={{ display: 'flex', gap: 24, padding: '32px 32px 0 32px' }}>
        <div style={{ background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, padding: 24, flex: 1 }}>
            <div style={{ color: '#212121', fontSize: 14 }}>Total Inventory Value</div>
            <div style={{ color: COLORS.primary, fontWeight: 700, fontSize: 28 }}>${totalValue}</div>
          </div>
        <div style={{ background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, padding: 24, flex: 1 }}>
            <div style={{ color: '#212121', fontSize: 14 }}>Total Products</div>
            <div style={{ color: COLORS.primary, fontWeight: 700, fontSize: 28 }}>{totalProducts}</div>
          </div>
        <div style={{ background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, padding: 24, flex: 1 }}>
            <div style={{ color: '#212121', fontSize: 14 }}>Low Stock Items</div>
            <div style={{ color: COLORS.warning, fontWeight: 700, fontSize: 28 }}>{lowStock}</div>
          </div>
        <div style={{ background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, padding: 24, flex: 1 }}>
            <div style={{ color: '#212121', fontSize: 14 }}>Out of Stock Items</div>
            <div style={{ color: COLORS.danger, fontWeight: 700, fontSize: 28 }}>{outOfStock}</div>
          </div>
      </section>
      {/* ...existing code... */}
  {/* Sales History Graphic (Bar Chart Placeholder) */}
      <section style={{ padding: '32px', marginTop: 24 }}>
  <h2 style={{ color: '#212121', marginBottom: 16 }}>Sales History</h2>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 120, background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, padding: 24 }}>
          {salesHistory.map((entry, idx) => (
            <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ background: COLORS.primary, height: entry.sales, width: '60%', margin: '0 auto', borderRadius: 6 }}></div>
              <div style={{ color: COLORS.muted, fontSize: 14, marginTop: 8 }}>{entry.month}</div>
            </div>
          ))}
        </div>
      </section>
      {/* ...existing code... */}
  {/* Low Stock Alert Section */}
      <section style={{ padding: '32px', marginTop: 24 }}>
  <h2 style={{ color: '#212121', marginBottom: 16 }}>Needs Reordering</h2>
        <table style={{ width: '100%', background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS }}>
          <thead style={{ background: COLORS.background, color: '#212121' }}>
            <tr>
              <th><input type="checkbox" checked={selectedProducts.length === needsReorder.length && needsReorder.length > 0} onChange={handleSelectAll} /></th>
              <th>Name</th>
              <th>SKU</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {needsReorder.map(product => (
              <tr key={product.id} style={{ color: '#212121' }}>
                <td><input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={() => handleSelect(product.id)} /></td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.current_stock}</td>
                <td>{product.reorder_level}</td>
                <td><button style={BUTTON.primary} onClick={() => setShowOrderModal(true)}>Reorder</button></td>
              </tr>
            ))}
          </tbody>
        </table>
  <button style={{ ...BUTTON.primary, marginTop: 16, padding: '12px 24px' }} onClick={() => setShowOrderModal(true)}>Place Order for Selected</button>
      </section>
      {/* ...existing code... */}
  {/* Main Inventory Table */}
      <section style={{ padding: '32px' }}>
  <h2 style={{ color: '#212121', marginBottom: 16 }}>Inventory</h2>
        <table style={{ width: '100%', background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS }}>
          <thead style={{ background: COLORS.background, color: '#212121' }}>
            <tr>
              <th>Thumbnail</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Status</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ color: '#212121' }}>
                <td><img src={product.image_url || '/vite.svg'} alt={product.name} style={{ width: 40, height: 40, borderRadius: 4, background: COLORS.surface }} /></td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td><span style={{ ...BADGE.category, background: product.category.color, color: getBadgeTextColor(product.category.color) }}>{product.category.name}</span></td>
                <td>{product.current_stock}</td>
                <td><span style={{ ...BADGE.status, color: getStatusColor(product.status) }}>{product.status}</span></td>
                <td>${product.price}</td>
                <td><button style={BUTTON.info}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* ...existing code... */}
  {/* Order Modal */}
      {showOrderModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(44,62,80,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: COLORS.surface, borderRadius: BORDER_RADIUS, boxShadow: SHADOW, padding: 32, minWidth: 320 }}>
            <h2 style={{ color: '#212121', marginBottom: 16 }}>Place Order</h2>
            <p style={{ color: '#212121' }}>Selected Products:</p>
            <ul>
              {products.filter(p => selectedProducts.includes(p.id)).map(p => (
                <li key={p.id} style={{ marginBottom: 8, color: '#212121' }}>{p.name} (Current: {p.current_stock}, Reorder Level: {p.reorder_level})</li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              <button style={{ background: COLORS.success, color: '#FFF', borderRadius: BORDER_RADIUS, padding: '10px 20px', border: 'none', fontWeight: 'bold' }} onClick={() => setShowOrderModal(false)}>Confirm Order</button>
              <button style={{ background: COLORS.danger, color: '#FFF', borderRadius: BORDER_RADIUS, padding: '10px 20px', border: 'none', fontWeight: 'bold' }} onClick={() => setShowOrderModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


