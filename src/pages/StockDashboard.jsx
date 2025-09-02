import React from 'react';
import { COLORS, SHADOW, BORDER_RADIUS, FONT, getBadgeTextColor } from '../design';

// Placeholder data structure for demonstration
const products = [
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
  // KPIs
  const totalValue = products.reduce((sum, p) => sum + p.current_stock * p.price, 0);
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.status === 'low').length;
  const outOfStock = products.filter(p => p.status === 'out of stock').length;
  const needsReorder = products.filter(p => p.current_stock < p.reorder_level);

  return (
    <div style={{ background: COLORS.background, minHeight: '100vh', fontFamily: FONT.family }}>
      {/* Header/Nav */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 32px', background: COLORS.surface, boxShadow: SHADOW }}>
        <div style={{ fontWeight: 700, fontSize: 24, color: COLORS.primary }}>InventoryFlow</div>
        <nav style={{ display: 'flex', gap: 24 }}>
          <span style={{ color: COLORS.primary, fontWeight: 600 }}>Dashboard</span>
          <span style={{ color: COLORS.muted }}>Products</span>
          <span style={{ color: COLORS.muted }}>Orders</span>
          <span style={{ color: COLORS.muted }}>Suppliers</span>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ position: 'relative' }}>
            <span role="img" aria-label="notifications" style={{ fontSize: 22 }}>🔔</span>
            {notifications.some(n => !n.is_read) && (
              <span style={{ position: 'absolute', top: -4, right: -4, background: COLORS.danger, color: '#FFF', borderRadius: '50%', width: 16, height: 16, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>!</span>
            )}
          </span>
          <img src="/placeholder.png" alt="User" style={{ width: 32, height: 32, borderRadius: '50%' }} />
        </div>
      </header>

      {/* KPI Cards */}
      <section style={{ display: 'flex', gap: 24, padding: '32px 32px 0 32px' }}>
        <div style={{ background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, padding: 24, flex: 1 }}>
          <div style={{ color: COLORS.muted, fontSize: 14 }}>Total Inventory Value</div>
          <div style={{ color: COLORS.primary, fontWeight: 700, fontSize: 28 }}>${totalValue}</div>
        </div>
        <div style={{ background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, padding: 24, flex: 1 }}>
          <div style={{ color: COLORS.muted, fontSize: 14 }}>Total Products</div>
          <div style={{ color: COLORS.primary, fontWeight: 700, fontSize: 28 }}>{totalProducts}</div>
        </div>
        <div style={{ background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, padding: 24, flex: 1 }}>
          <div style={{ color: COLORS.muted, fontSize: 14 }}>Low Stock Items</div>
          <div style={{ color: COLORS.warning, fontWeight: 700, fontSize: 28 }}>{lowStock}</div>
        </div>
        <div style={{ background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, padding: 24, flex: 1 }}>
          <div style={{ color: COLORS.muted, fontSize: 14 }}>Out of Stock Items</div>
          <div style={{ color: COLORS.danger, fontWeight: 700, fontSize: 28 }}>{outOfStock}</div>
        </div>
      </section>

      {/* Low Stock Alert Section */}
      <section style={{ padding: '32px', marginTop: 24 }}>
        <h2 style={{ color: COLORS.danger, marginBottom: 16 }}>Needs Reordering</h2>
        <table style={{ width: '100%', background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS }}>
          <thead style={{ background: COLORS.background }}>
            <tr>
              <th></th>
              <th>Name</th>
              <th>SKU</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {needsReorder.map(product => (
              <tr key={product.id}>
                <td><input type="checkbox" /></td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.current_stock}</td>
                <td>{product.reorder_level}</td>
                <td><button style={{ background: COLORS.primary, color: '#FFF', borderRadius: 6, border: 'none', padding: '6px 16px', fontWeight: 600 }}>Reorder</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button style={{ marginTop: 16, background: COLORS.primary, color: '#FFF', borderRadius: BORDER_RADIUS, padding: '12px 24px', border: 'none', fontWeight: 'bold' }}>Place Order for Selected</button>
      </section>

      {/* Main Inventory Table */}
      <section style={{ padding: '32px' }}>
        <h2 style={{ color: COLORS.primary, marginBottom: 16 }}>Inventory</h2>
        <table style={{ width: '100%', background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS }}>
          <thead style={{ background: COLORS.background }}>
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
              <tr key={product.id}>
                <td><img src={product.image_url || '/placeholder.png'} alt={product.name} style={{ width: 40, height: 40, borderRadius: 4 }} /></td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td><span style={{ background: product.category.color, color: getBadgeTextColor(product.category.color), padding: '2px 8px', borderRadius: 4 }}>{product.category.name}</span></td>
                <td>{product.current_stock}</td>
                <td><span style={{ color: getStatusColor(product.status), fontWeight: 'bold' }}>{product.status}</span></td>
                <td>${product.price}</td>
                <td><button style={{ background: COLORS.info, color: '#FFF', borderRadius: 6, border: 'none', padding: '6px 16px', fontWeight: 600 }}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
