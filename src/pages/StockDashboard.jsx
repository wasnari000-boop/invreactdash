
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Utility functions and constants
const COLORS = {
  primary: '#4a90e2',
  secondary: '#5d6d7e',
  success: '#66bb6a',
  danger: '#e57373',
  warning: '#ffd54f',
  info: '#7986cb',
  text: '#455a64',
  surface: '#eceff1'
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
  if (status === 'in stock') return COLORS.success;
  if (status === 'low') return COLORS.warning;
  if (status === 'out of stock') return COLORS.danger;
  return COLORS.text;
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
          <span className="navbar-brand fw-bold fs-3" style={{ color: COLORS.primary }}>InventoryFlow</span>
          <div className="navbar-nav ms-auto">
            <span className="nav-link active fw-semibold" style={{ color: COLORS.primary }}>Dashboard</span>
            <span onClick={() => setPage('product')} className="nav-link fw-semibold" style={{ color: COLORS.secondary, cursor: 'pointer' }}>Products</span>
          </div>
        </nav>
        {loading && <span className="ms-3 text-secondary">Loading...</span>}
        {error && <div className="mt-2 fw-bold" style={{ color: COLORS.danger }}>{error}</div>}
        {orderSuccess && <div className="alert mt-2" style={{ background: COLORS.success, color: 'white' }}>Reorder placed successfully!</div>}
        <div className="mb-5">
          <div className="row g-5">
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="card-title text-dark fs-6 mb-2">Total Inventory Value</div>
                  <div className="card-text fw-bold fs-3" style={{ color: COLORS.primary }}>${totalValue}</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="card-title fs-6 mb-2" style={{ color: COLORS.text }}>Total Products</div>
                  <div className="card-text fw-bold fs-3" style={{ color: COLORS.primary }}>{totalProducts}</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="card-title fs-6 mb-2" style={{ color: COLORS.text }}>Low Stock Items</div>
                  <div className="card-text fw-bold fs-3" style={{ color: COLORS.warning }}>{lowStock}</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="card-title fs-6 mb-2" style={{ color: COLORS.text }}>Out of Stock Items</div>
                  <div className="card-text fw-bold fs-3" style={{ color: COLORS.danger }}>{outOfStock}</div>
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
            <thead style={{ background: COLORS.surface }}>
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
                    <td><button className="btn btn-sm" style={{ background: COLORS.primary, color: 'white' }} onClick={() => handleSingleReorder(product.id)}>Reorder</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="btn mt-3 px-4 py-2" style={{ background: COLORS.primary, color: 'white' }} onClick={() => setShowOrderModal(true)}>Place Order for Selected</button>
        </div>
        <div className="w-100 mb-5" style={{ maxWidth: 1200 }}>
          <h2 className="text-dark mb-3">Inventory</h2>
          <table className="table table-bordered table-hover shadow-sm rounded">
            <thead style={{ background: COLORS.surface }}>
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
                  <td><button className="btn btn-sm" style={{ background: COLORS.info, color: 'white' }} onClick={() => handleViewProduct(product.id)}>View</button></td>
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
                  <button className="btn" style={{ background: COLORS.success, color: 'white' }} onClick={handleBulkReorder} disabled={orderLoading}>Confirm Order</button>
                  <button className="btn" style={{ background: COLORS.danger, color: 'white' }} onClick={() => setShowOrderModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


