import React from 'react';
import { COLORS, SHADOW, BORDER_RADIUS, FONT, getBadgeTextColor } from '../design';
import { LAYOUT } from '../design';

// Placeholder product data
const product = {
  id: 1,
  name: 'Product A',
  sku: 'SKU001',
  category: { name: 'Electronics', color: '#7E57C2' },
  supplier: { name: 'Supplier X', contact: 'supplierx@email.com' },
  description: 'High quality electronic product.',
  image_url: '',
  cost: 20,
  price: 30,
  reorder_level: 10,
  current_stock: 12,
  max_stock_level: 50,
};

const stockHistory = [
  { date: '2025-08-01', stock: 20 },
  { date: '2025-08-10', stock: 15 },
  { date: '2025-08-20', stock: 12 },
];

const orderItems = [
  { date: '2025-08-01', type: 'sale', orderId: 101, quantity: 2, unitPrice: 30, totalPrice: 60, counterparty: 'Customer Y' },
  { date: '2025-08-15', type: 'purchase', orderId: 102, quantity: 10, unitPrice: 20, totalPrice: 200, counterparty: 'Supplier X' },
];

const reorderRequests = [
  { id: 1, quantity: 20, status: 'pending', created_at: '2025-08-28' },
];

function getTypeColor(type) {
  return type === 'purchase' ? COLORS.info : COLORS.success;
}


export default function ProductDetails() {
  // Find last purchase
  const lastPurchase = orderItems.filter(o => o.type === 'purchase').sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return (
  <div style={LAYOUT.page}>
      {/* Header/Nav */}
  <header style={LAYOUT.header}>
        <div style={{ fontWeight: 700, fontSize: 24, color: COLORS.primary }}>InventoryFlow</div>
  <nav style={LAYOUT.nav}>
          <span style={{ color: COLORS.muted }}>Dashboard</span>
          <span style={{ color: COLORS.primary, fontWeight: 600 }}>Products</span>
          <span style={{ color: COLORS.muted }}>Orders</span>
          <span style={{ color: COLORS.muted }}>Suppliers</span>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span role="img" aria-label="notifications" style={{ fontSize: 22 }}>🔔</span>
          <img src="/placeholder.png" alt="User" style={{ width: 32, height: 32, borderRadius: '50%' }} />
        </div>
      </header>

      {/* Product Summary */}
  <section style={{ display: 'flex', gap: 32, padding: '32px', background: COLORS.boxGradient, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, margin: 4 }}>
  <img src={product.image_url || '/placeholder.png'} alt={product.name} style={{ width: 120, height: 120, borderRadius: 12, boxShadow: SHADOW }} />
        <div>
          <h2 style={{ color: COLORS.primary, marginBottom: 8, fontFamily: FONT.family }}>{product.name}</h2>
          <span style={{ background: product.category.color, color: getBadgeTextColor(product.category.color), padding: '4px 12px', borderRadius: 6, fontWeight: 600 }}>{product.category.name}</span>
          <div style={{ marginTop: 16 }}>
            <p style={{ color: COLORS.muted }}><strong>SKU:</strong> {product.sku}</p>
            <p style={{ color: COLORS.muted }}><strong>Description:</strong> {product.description}</p>
            <p style={{ color: COLORS.muted }}><strong>Supplier:</strong> <a href={`mailto:${product.supplier.contact}`} style={{ color: COLORS.info }}>{product.supplier.name}</a></p>
            <p style={{ color: COLORS.muted }}><strong>Cost:</strong> ${product.cost}</p>
            <p style={{ color: COLORS.muted }}><strong>Price:</strong> ${product.price}</p>
            <p style={{ color: COLORS.muted }}><strong>Current Stock:</strong> {product.current_stock}</p>
            <p style={{ color: COLORS.muted }}><strong>Reorder Level:</strong> {product.reorder_level}</p>
            <p style={{ color: COLORS.muted }}><strong>Max Stock Level:</strong> {product.max_stock_level}</p>
          </div>
        </div>
      </section>

      {/* Stock History Chart (placeholder) */}
      <section style={{ padding: '0 32px 32px 32px' }}>
        <h3 style={{ color: COLORS.primary }}>Stock History</h3>
        <div style={{ background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, padding: 24, marginBottom: 24 }}>
          {/* Replace with chart library for real data */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 80 }}>
            {stockHistory.map((entry, idx) => (
              <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ background: COLORS.info, height: entry.stock, width: '60%', margin: '0 auto', borderRadius: 6 }}></div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 8 }}>{entry.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Orders & Sales History Table */}
  <section style={LAYOUT.section}>
        <h3 style={{ color: COLORS.primary }}>Recent Orders & Sales History</h3>
        <table style={{ width: '100%', background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, marginBottom: 24 }}>
          <thead style={{ background: COLORS.background }}>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Order ID</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Counterparty</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, idx) => (
              <tr key={idx}>
                <td>{item.date}</td>
                <td><span style={{ color: getTypeColor(item.type), fontWeight: 600 }}>{item.type}</span></td>
                <td>{item.orderId}</td>
                <td>{item.quantity}</td>
                <td><span style={{ color: item.type === 'purchase' ? COLORS.info : COLORS.success }}>{item.type === 'purchase' ? 'Ordered' : 'Sold'}</span></td>
                <td>${item.unitPrice}</td>
                <td>${item.totalPrice}</td>
                <td>{item.counterparty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Last Purchase Made */}
        {lastPurchase && (
          <div style={{ marginBottom: 24, color: COLORS.info }}>
            <strong>Last Ordered:</strong> {lastPurchase.date} | <strong>Status:</strong> Ordered | <strong>Quantity:</strong> {lastPurchase.quantity} | <strong>Price:</strong> ${lastPurchase.unitPrice}
          </div>
        )}
      </section>

      {/* Reorder Requests */}
      <section style={{ padding: '0 32px 32px 32px' }}>
        <h3 style={{ color: COLORS.primary }}>Reorder Requests</h3>
        <ul>
          {reorderRequests.map(req => (
            <li key={req.id} style={{ background: COLORS.surface, boxShadow: SHADOW, borderRadius: BORDER_RADIUS, marginBottom: 8, padding: 12 }}>
              <strong>Quantity:</strong> {req.quantity} | <strong>Status:</strong> <span style={{ color: COLORS.warning }}>{req.status}</span> | <strong>Date:</strong> {req.created_at}
            </li>
          ))}
        </ul>
      </section>

      {/* Action Buttons */}
      <section style={{ padding: '0 32px 32px 32px', display: 'flex', gap: 16 }}>
        <button style={{ background: COLORS.info, color: '#FFF', borderRadius: BORDER_RADIUS, padding: '12px 24px', border: 'none', fontWeight: 'bold' }}>Adjust Stock</button>
        <button style={{ background: COLORS.primary, color: '#FFF', borderRadius: BORDER_RADIUS, padding: '12px 24px', border: 'none', fontWeight: 'bold' }}>Edit Product</button>
        <button style={{ background: COLORS.success, color: '#FFF', borderRadius: BORDER_RADIUS, padding: '12px 24px', border: 'none', fontWeight: 'bold' }}>View Full Order History</button>
      </section>
    </div>
  );
}
