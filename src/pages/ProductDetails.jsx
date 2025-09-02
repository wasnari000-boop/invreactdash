import { AlertTriangle, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Design constants
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
  // Simple contrast calculation - in a real app you'd use a proper contrast function
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000' : '#fff';
}

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
  { date: '2025-08-01', stock: 20, formattedDate: 'Aug 1' },
  { date: '2025-08-05', stock: 18, formattedDate: 'Aug 5' },
  { date: '2025-08-10', stock: 15, formattedDate: 'Aug 10' },
  { date: '2025-08-15', stock: 13, formattedDate: 'Aug 15' },
  { date: '2025-08-20', stock: 12, formattedDate: 'Aug 20' },
  { date: '2025-08-25', stock: 12, formattedDate: 'Aug 25' },
];

const salesData = [
  { date: '2025-08-01', sales: 60, formattedDate: 'Aug 1' },
  { date: '2025-08-05', sales: 90, formattedDate: 'Aug 5' },
  { date: '2025-08-10', sales: 120, formattedDate: 'Aug 10' },
  { date: '2025-08-15', sales: 75, formattedDate: 'Aug 15' },
  { date: '2025-08-20', sales: 90, formattedDate: 'Aug 20' },
  { date: '2025-08-25', sales: 110, formattedDate: 'Aug 25' },
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

export default function ProductDetails({ setPage }) {
  const [reorderQuantity, setReorderQuantity] = useState(product.reorder_level);
  const [showReorderSuccess, setShowReorderSuccess] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  const lastPurchase = orderItems.filter(o => o.type === 'purchase').sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  const isLowStock = product.current_stock <= product.reorder_level;

  const handleQuickReorder = async () => {
    setIsReordering(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsReordering(false);
    setShowReorderSuccess(true);
    setTimeout(() => setShowReorderSuccess(false), 3000);
  };

  return (
    <div className="bg-light min-vh-100 w-100" style={{ fontFamily: FONT.family }}>
      <div className="container py-4">
        {/* Header/Nav */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4 rounded">
          <span className="navbar-brand fw-bold text-primary fs-3">InventoryFlow</span>
          <div className="navbar-nav ms-auto">
            <span onClick={() => setPage('dashboard')} className="nav-link fw-semibold text-secondary" style={{ cursor: 'pointer' }}>Dashboard</span>
            <span className="nav-link active fw-semibold text-primary">Products</span>
          </div>
          <div className="d-flex align-items-center ms-4">
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
              <span className="text-white fw-bold">U</span>
            </div>
          </div>
        </nav>

        {/* Success Alert */}
        {showReorderSuccess && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Reorder request for {reorderQuantity} units has been submitted.
          </div>
        )}

        {/* Product Summary */}
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
                      <span className="badge" style={{ 
                        background: product.category.color, 
                        color: getBadgeTextColor(product.category.color),
                        padding: '6px 16px',
                        borderRadius: 8
                      }}>
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
                        <p className="text-secondary mb-1">
                          <strong>Supplier:</strong> 
                          <a href={`mailto:${product.supplier.contact}`} className="text-info ms-1">
                            {product.supplier.name}
                          </a>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="text-secondary mb-1"><strong>Cost:</strong> ${product.cost}</p>
                        <p className="text-secondary mb-1"><strong>Price:</strong> ${product.price}</p>
                        <p className="text-secondary mb-1">
                          <strong>Current Stock:</strong> 
                          <span className={`ms-1 ${isLowStock ? 'text-warning fw-bold' : ''}`}>
                            {product.current_stock}
                          </span>
                        </p>
                        <p className="text-secondary mb-1"><strong>Reorder Level:</strong> {product.reorder_level}</p>
                        <p className="text-secondary mb-1"><strong>Max Stock Level:</strong> {product.max_stock_level}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex flex-column gap-2">
                      <button className="btn btn-info fw-bold text-white">
                        Adjust Stock
                      </button>
                      <button className="btn btn-primary fw-bold text-white">
                        Edit Product
                      </button>
                      <button className="btn btn-success fw-bold text-white">
                        View Order History
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reorder Section */}
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
                    <input
                      type="number"
                      className="form-control"
                      value={reorderQuantity}
                      onChange={(e) => setReorderQuantity(parseInt(e.target.value) || 0)}
                      min="1"
                      max={product.max_stock_level}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Estimated Cost</label>
                    <div className="form-control-plaintext fw-bold">
                      ${(reorderQuantity * product.cost).toFixed(2)}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Supplier</label>
                    <div className="form-control-plaintext">
                      {product.supplier.name}
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button
                      className="btn btn-warning fw-bold w-100"
                      onClick={handleQuickReorder}
                      disabled={isReordering || reorderQuantity <= 0}
                    >
                      {isReordering ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Ordering...
                        </>
                      ) : (
                        'Place Reorder'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row mb-4">
          {/* Stock History Chart */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center gap-2 mb-3">
                  <TrendingUp size={20} />
                  Stock History
                </h5>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stockHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="formattedDate" />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => `Date: ${value}`}
                        formatter={(value) => [`${value} units`, 'Stock Level']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="stock" 
                        stroke={COLORS.primary} 
                        strokeWidth={3}
                        dot={{ fill: COLORS.primary, strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: COLORS.primary, strokeWidth: 2 }}
                      />
                      {/* Reorder level reference line */}
                      <Line 
                        type="monotone" 
                        dataKey={() => product.reorder_level}
                        stroke={COLORS.danger}
                        strokeDasharray="5 5"
                        dot={false}
                        name="Reorder Level"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <small className="text-muted">
                  Red dashed line indicates reorder level ({product.reorder_level} units)
                </small>
              </div>
            </div>
          </div>

          {/* Sales Chart */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center gap-2 mb-3">
                  <TrendingUp size={20} />
                  Sales Over Time
                </h5>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="formattedDate" />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => `Date: ${value}`}
                        formatter={(value) => [`$${value}`, 'Sales']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke={COLORS.success}
                        strokeWidth={2}
                        fill={COLORS.success}
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <small className="text-muted">
                  Total sales: ${salesData.reduce((sum, item) => sum + item.sales, 0)}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Recent Order Activity</h5>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Order ID</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                        <th>Counterparty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((item, index) => (
                        <tr key={index}>
                          <td>{new Date(item.date).toLocaleDateString()}</td>
                          <td>
                            <span className={`badge ${item.type === 'purchase' ? 'bg-info' : 'bg-success'}`}>
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </span>
                          </td>
                          <td>#{item.orderId}</td>
                          <td>{item.quantity}</td>
                          <td>${item.unitPrice}</td>
                          <td className="fw-bold">${item.totalPrice}</td>
                          <td>{item.counterparty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}