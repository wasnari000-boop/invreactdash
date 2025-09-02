import React from 'react';
import { COLORS, SHADOW, BORDER_RADIUS, FONT, getBadgeTextColor } from '../design';
import { BUTTON, BADGE } from '../design';
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
  const lastPurchase = orderItems.filter(o => o.type === 'purchase').sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return (
    <div className="bg-light min-vh-100 w-100" style={{ fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
      {/* Header/Nav */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 mb-4">
        <span className="navbar-brand fw-bold text-primary fs-3">InventoryFlow</span>
        <div className="navbar-nav ms-auto">
          <a href="/" className="nav-link fw-semibold text-secondary">Dashboard</a>
          <span className="nav-link active fw-semibold text-primary">Products</span>
          <span className="nav-link fw-semibold text-secondary">Orders</span>
          <span className="nav-link fw-semibold text-secondary">Suppliers</span>
        </div>
        <div className="d-flex align-items-center ms-4">
          <span role="img" aria-label="notifications" className="fs-4 me-2">🔔</span>
          <img src="/placeholder.png" alt="User" className="rounded-circle" style={{ width: 32, height: 32 }} />
        </div>
      </nav>

      {/* Product Summary */}
      <div className="container mb-4">
        <div className="row g-4 align-items-center">
          <div className="col-md-3 text-center">
            <img src={product.image_url || '/placeholder.png'} alt={product.name} className="rounded shadow" style={{ width: 120, height: 120 }} />
          </div>
          <div className="col-md-9">
            <h2 className="text-primary mb-2" style={{ fontFamily: FONT.family }}>{product.name}</h2>
            <span className="badge" style={{ background: product.category.color, color: getBadgeTextColor(product.category.color), padding: '6px 16px', borderRadius: 8 }}>{product.category.name}</span>
            <div className="mt-3">
              <p className="text-secondary mb-1"><strong>SKU:</strong> {product.sku}</p>
              <p className="text-secondary mb-1"><strong>Description:</strong> {product.description}</p>
              <p className="text-secondary mb-1"><strong>Supplier:</strong> <a href={`mailto:${product.supplier.contact}`} className="text-info">{product.supplier.name}</a></p>
              <p className="text-secondary mb-1"><strong>Cost:</strong> ${product.cost}</p>
              <p className="text-secondary mb-1"><strong>Price:</strong> ${product.price}</p>
              <p className="text-secondary mb-1"><strong>Current Stock:</strong> {product.current_stock}</p>
              <p className="text-secondary mb-1"><strong>Reorder Level:</strong> {product.reorder_level}</p>
              <p className="text-secondary mb-1"><strong>Max Stock Level:</strong> {product.max_stock_level}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock History Chart (placeholder) */}
      <div className="container mb-4">
        <h3 className="text-primary mb-3">Stock History</h3>
        <div className="bg-white shadow-sm rounded p-4 mb-4">
          <div className="row align-items-end" style={{ height: 80 }}>
            {stockHistory.map((entry, idx) => (
              <div key={idx} className="col text-center">
                <div className="bg-info mx-auto rounded" style={{ height: entry.stock, width: '60%' }}></div>
                <div className="text-secondary mt-2" style={{ fontSize: 12 }}>{entry.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Sales History Table */}
      <div className="container mb-4">
        <h3 className="text-primary mb-3">Recent Orders & Sales History</h3>
        <table className="table table-bordered table-hover shadow-sm rounded">
          <thead className="table-light">
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
                <td><span className="fw-bold" style={{ color: getTypeColor(item.type) }}>{item.type}</span></td>
                <td>{item.orderId}</td>
                <td>{item.quantity}</td>
                <td><span className="fw-bold" style={{ color: item.type === 'purchase' ? COLORS.info : COLORS.success }}>{item.type === 'purchase' ? 'Ordered' : 'Sold'}</span></td>
                <td>${item.unitPrice}</td>
                <td>${item.totalPrice}</td>
                <td>{item.counterparty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Last Purchase Made */}
        {lastPurchase && (
          <div className="mb-4 text-info">
            <strong>Last Ordered:</strong> {lastPurchase.date} | <strong>Status:</strong> Ordered | <strong>Quantity:</strong> {lastPurchase.quantity} | <strong>Price:</strong> ${lastPurchase.unitPrice}
          </div>
        )}
      </div>

      {/* Reorder Requests */}
      <div className="container mb-4">
        <h3 className="text-primary mb-3">Reorder Requests</h3>
        <ul className="list-group">
          {reorderRequests.map(req => (
            <li key={req.id} className="list-group-item d-flex justify-content-between align-items-center bg-white shadow-sm rounded mb-2">
              <span><strong>Quantity:</strong> {req.quantity}</span>
              <span><strong>Status:</strong> <span className="text-warning fw-bold">{req.status}</span></span>
              <span><strong>Date:</strong> {req.created_at}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="container mb-4">
        <div className="d-flex gap-3">
          <button className="btn btn-info fw-bold text-white px-4 py-2">Adjust Stock</button>
          <button className="btn btn-primary fw-bold text-white px-4 py-2">Edit Product</button>
          <button className="btn btn-success fw-bold text-white px-4 py-2">View Full Order History</button>
        </div>
      </div>
    </div>
  );
}
