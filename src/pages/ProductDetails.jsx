import { AlertTriangle, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const COLORS = {
  primary: '#0d6efd',
  success: '#198754',
  info: '#0dcaf0',
  warning: '#ffc107',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#212529'
};

const FONT = {
  family: 'Poppins, Inter, Arial, sans-serif'
};

function getBadgeTextColor(bgColor) {
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000' : '#fff';
}

export default function ProductDetails({ setPage, productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reorderQuantity, setReorderQuantity] = useState(1);
  const [showReorderSuccess, setShowReorderSuccess] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetch(`http://localhost/inventory-api/product.php?id=${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setReorderQuantity(data.reorder_level || 1);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch product details.');
        setLoading(false);
      });
  }, [productId]);

  const handleQuickReorder = async () => {
    setIsReordering(true);
    try {
      await fetch('http://localhost/inventory-api/reorder.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: product.id, quantity: reorderQuantity })
      });
      setShowReorderSuccess(true);
      setTimeout(() => setShowReorderSuccess(false), 3000);
    } catch {
      setError('Failed to place reorder.');
    }
    setIsReordering(false);
  };

  if (loading) return <div className="container py-4">Loading...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;
  if (!product) return <div className="container py-4">No product found.</div>;

  const isLowStock = product.current_stock <= product.reorder_level;

  // Placeholder for charts and order history (replace with backend data if available)
  const stockHistory = [];
  const salesData = [];
  const orderItems = [];

  return (
    <div className="bg-light min-vh-100 w-100" style={{ fontFamily: FONT.family }}>
      <div className="container py-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4 rounded px-4">
          <span className="navbar-brand fw-bold text-primary fs-3">InventoryFlow</span>
          <div className="navbar-nav ms-auto">
            <span onClick={() => setPage('dashboard')} className="nav-link fw-semibold text-secondary" style={{ cursor: 'pointer' }}>Dashboard</span>
            <span className="nav-link active fw-semibold text-primary">Products</span>
          </div>
        </nav>
        {showReorderSuccess && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Reorder request for {reorderQuantity} units has been submitted.
          </div>
        )}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2 text-center">
                    <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: 120, height: 120 }}>
                      <Package size={48} className="text-secondary" />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <h2 className="text-primary mb-2">{product.name}</h2>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <span className="badge" style={{ background: product.category.color, color: getBadgeTextColor(product.category.color), padding: '6px 16px', borderRadius: 8 }}>
                        {product.category.name}
                      </span>
                      {isLowStock && (
                        <span className="badge bg-warning text-dark d-flex align-items-center gap-1">
                          <AlertTriangle size={14} />
                          Low Stock
                        </span>
                      )}
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="text-secondary mb-1"><strong>SKU:</strong> {product.sku}</p>
                        <p className="text-secondary mb-1"><strong>Description:</strong> {product.description}</p>
                        <p className="text-secondary mb-1"><strong>Supplier:</strong> {product.supplier}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="text-secondary mb-1"><strong>Cost:</strong> ${product.cost}</p>
                        <p className="text-secondary mb-1"><strong>Price:</strong> ${product.price}</p>
                        <p className="text-secondary mb-1"><strong>Current Stock:</strong> <span className={`ms-1 ${isLowStock ? 'text-warning fw-bold' : ''}`}>{product.current_stock}</span></p>
                        <p className="text-secondary mb-1"><strong>Reorder Level:</strong> {product.reorder_level}</p>
                        <p className="text-secondary mb-1"><strong>Max Stock Level:</strong> {product.max_stock_level}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex flex-column gap-2">
                      <button className="btn btn-info fw-bold text-white">Adjust Stock</button>
                      <button className="btn btn-primary fw-bold text-white">Edit Product</button>
                      <button className="btn btn-success fw-bold text-white">View Order History</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center gap-2 mb-3">
                  <ShoppingCart size={20} />
                  Quick Reorder
                </h5>
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <label className="form-label">Quantity</label>
                    <input type="number" className="form-control" value={reorderQuantity} onChange={(e) => setReorderQuantity(parseInt(e.target.value) || 0)} min="1" max={product.max_stock_level} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Estimated Cost</label>
                    <div className="form-control-plaintext fw-bold">${(reorderQuantity * product.cost).toFixed(2)}</div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Supplier</label>
                    <div className="form-control-plaintext">{product.supplier}</div>
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button className="btn btn-warning fw-bold w-100" onClick={handleQuickReorder} disabled={isReordering || reorderQuantity <= 0}>
                      {isReordering ? (<><span className="spinner-border spinner-border-sm me-2" role="status"></span>Ordering...</>) : ('Place Reorder')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Charts and order history can be added here if backend data is available */}
      </div>
    </div>
  );
}