
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Utility functions and constants
const COLORS = {
  primary: '#0d6efd',
  secondary: '#6c757d',
  success: '#198754',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#0dcaf0',
  text: '#212529',
  surface: '#f8f9fa'
};

// Utility function to get badge text color based on background
const getBadgeTextColor = (backgroundColor) => {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};


// ...existing code...

function getStatusColor(status) {
  if (status === 'in stock') return '#198754';  // success color
  if (status === 'low') return '#ffc107';       // warning color
  if (status === 'out of stock') return '#dc3545'; // danger color
  return '#212529';  // text color
}


export default function StockDashboard({ setPage, setSelectedProductId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost/inventory-api/products.php')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch data from backend.');
        setLoading(false);
      });
  }, []);

  // KPIs
  const totalValue = products.reduce((sum, p) => sum + p.current_stock * p.price, 0);
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.status === 'low').length;
  const outOfStock = products.filter(p => p.status === 'out of stock').length;
  const needsReorder = products.filter(p => p.current_stock < p.reorder_level);

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

  // Handle reorder (bulk)
  const handleBulkReorder = async () => {
    setOrderLoading(true);
    try {
      for (const pid of selectedProducts) {
        await fetch('http://localhost/inventory-api/reorder.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_id: pid, quantity: 10 }) // You can prompt for quantity
        });
      }
      setOrderSuccess(true);
      setTimeout(() => setOrderSuccess(false), 3000);
    } catch {
      setError('Failed to place reorder.');
    }
    setOrderLoading(false);
    setShowOrderModal(false);
  };

  // Handle single reorder
  const handleSingleReorder = async (pid) => {
    setOrderLoading(true);
    try {
      await fetch('http://localhost/inventory-api/reorder.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: pid, quantity: 10 })
      });
      setOrderSuccess(true);
      setTimeout(() => setOrderSuccess(false), 3000);
    } catch {
      setError('Failed to place reorder.');
    }
    setOrderLoading(false);
    setShowOrderModal(false);
  };

  // Handle view product
  const handleViewProduct = (pid) => {
    setSelectedProductId(pid);
    setPage('productDetails');
  };

  // Placeholder sales history (replace with backend data if available)
  const salesHistory = [
    { month: 'Jul', sales: 120 },
    { month: 'Aug', sales: 90 },
    { month: 'Sep', sales: 150 },
  ];

  return (
    <div className="bg-light min-vh-100 w-100" style={{ fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
      <div className="container py-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4 rounded px-4">
          <span className="navbar-brand fw-bold text-primary fs-3">InventoryFlow</span>
          <div className="navbar-nav ms-auto">
            <span className="nav-link active fw-semibold text-primary">Dashboard</span>
            <span onClick={() => setPage('product')} className="nav-link fw-semibold text-secondary" style={{ cursor: 'pointer' }}>Products</span>
          </div>
        </nav>
        {loading && <span className="ms-3 text-secondary">Loading...</span>}
        {error && <div className="mt-2 text-danger fw-bold">{error}</div>}
        {orderSuccess && <div className="alert alert-success mt-2">Reorder placed successfully!</div>}
        <div className="mb-5">
          <div className="row g-5">
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="card-title text-dark fs-6 mb-2">Total Inventory Value</div>
                  <div className="card-text text-primary fw-bold fs-3">${totalValue}</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="card-title text-dark fs-6 mb-2">Total Products</div>
                  <div className="card-text text-primary fw-bold fs-3">{totalProducts}</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="card-title text-dark fs-6 mb-2">Low Stock Items</div>
                  <div className="card-text text-warning fw-bold fs-3">{lowStock}</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="card-title text-dark fs-6 mb-2">Out of Stock Items</div>
                  <div className="card-text text-danger fw-bold fs-3">{outOfStock}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-dark h5 mb-4">Sales History</h2>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                    <Line type="monotone" dataKey="sales" stroke={COLORS.primary} strokeWidth={2} dot={{ fill: COLORS.primary, strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: COLORS.primary, strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 mb-5 mt-5 pt-4" style={{ maxWidth: 1200 }}>
          <h2 className="text-dark mb-3">Needs Reordering</h2>
          <table className="table table-striped table-hover shadow-sm rounded">
            <thead className="table-light">
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
              {needsReorder.map(product => {
                return (
                  <tr key={product.id}>
                    <td><input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={() => handleSelect(product.id)} /></td>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.current_stock}</td>
                    <td>{product.reorder_level}</td>
                    <td><button className="btn btn-primary btn-sm" onClick={() => handleSingleReorder(product.id)}>Reorder</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="btn btn-primary mt-3 px-4 py-2" onClick={() => setShowOrderModal(true)}>Place Order for Selected</button>
        </div>
        <div className="w-100 mb-5" style={{ maxWidth: 1200 }}>
          <h2 className="text-dark mb-3">Inventory</h2>
          <table className="table table-bordered table-hover shadow-sm rounded">
            <thead className="table-light">
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
                  <td><img src={product.image_url || '/vite.svg'} alt={product.name} className="rounded" style={{ width: 40, height: 40, background: '#f8f9fa' }} /></td>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td><span className="badge" style={{ background: product.category.color, color: getBadgeTextColor(product.category.color), padding: '4px 12px', borderRadius: 6 }}>{product.category.name}</span></td>
                  <td>{product.current_stock}</td>
                  <td><span className="fw-bold" style={{ color: getStatusColor(product.status) }}>{product.status}</span></td>
                  <td>${product.price}</td>
                  <td><button className="btn btn-info btn-sm text-dark" onClick={() => handleViewProduct(product.id)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showOrderModal && (
          <div className="modal fade show" style={{ display: 'block', background: 'rgba(44,62,80,0.2)' }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">Place Order</h2>
                  <button type="button" className="btn-close" onClick={() => setShowOrderModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Selected Products:</p>
                  <ul className="list-group mb-3">
                    {products.filter(p => selectedProducts.includes(p.id)).map(p => (
                      <li key={p.id} className="list-group-item">{p.name} (Current: {p.current_stock}, Reorder Level: {p.reorder_level})</li>
                    ))}
                  </ul>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-success" onClick={handleBulkReorder} disabled={orderLoading}>Confirm Order</button>
                  <button className="btn btn-danger" onClick={() => setShowOrderModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


