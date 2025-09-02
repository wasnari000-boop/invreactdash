import { COLORS, FONT, getBadgeTextColor } from '../design';

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
      <div className="container mx-auto px-0 d-block" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        {/* Header/Nav */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 mb-5 w-100" style={{ maxWidth: '1200px' }}>
          <span className="navbar-brand fw-bold text-primary fs-3">InventoryFlow</span>
          <div className="navbar-nav ms-auto">
            <a href="/" className="nav-link fw-semibold text-secondary">Dashboard</a>
            <span className="nav-link active fw-semibold text-primary">Products</span>
          </div>
          <div className="d-flex align-items-center ms-4">
            <img src="/placeholder.png" alt="User" className="rounded-circle" style={{ width: 32, height: 32 }} />
          </div>
        </nav>

        {/* Product Summary */}
        <div className="w-100 mb-5" style={{ maxWidth: '1200px' }}>
          <div className="row g-5 align-items-center">
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

        {/* Action Buttons */}
        <div className="w-100 mb-5" style={{ maxWidth: '1200px' }}>
          <div className="d-flex gap-4">
            <button className="btn btn-info fw-bold text-white px-4 py-2">Adjust Stock</button>
            <button className="btn btn-primary fw-bold text-white px-4 py-2">Edit Product</button>
            <button className="btn btn-success fw-bold text-white px-4 py-2">View Full Order History</button>
          </div>
        </div>
      </div>
    </div>
  );

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

const salesData = [
  { date: '2025-08-01', sales: 60 },
  { date: '2025-08-10', sales: 120 },
  { date: '2025-08-20', sales: 90 },
];

const reorderRequests = [
  { id: 1, quantity: 20, status: 'pending', created_at: '2025-08-28' },
];

function getTypeColor(type) {
  return type === 'purchase' ? COLORS.info : COLORS.success;
}


  return (
    <div className="bg-light min-vh-100 w-100" style={{ fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
      <div className="container mx-auto px-0 d-block" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        {/* Header/Nav */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 mb-5 w-100" style={{ maxWidth: '1200px' }}>
          <span className="navbar-brand fw-bold text-primary fs-3">InventoryFlow</span>
          <div className="navbar-nav ms-auto">
            <a href="/" className="nav-link fw-semibold text-secondary">Dashboard</a>
            <span className="nav-link active fw-semibold text-primary">Products</span>
          </div>
          <div className="d-flex align-items-center ms-4">
            <img src="/placeholder.png" alt="User" className="rounded-circle" style={{ width: 32, height: 32 }} />
          </div>
        </nav>

        {/* Product Summary */}
        <div className="w-100 mb-5" style={{ maxWidth: '1200px' }}>
          <div className="row g-5 align-items-center">
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

        {/* Action Buttons */}
        <div className="w-100 mb-5" style={{ maxWidth: '1200px' }}>
          <div className="d-flex gap-4">
            <button className="btn btn-info fw-bold text-white px-4 py-2">Adjust Stock</button>
            <button className="btn btn-primary fw-bold text-white px-4 py-2">Edit Product</button>
            <button className="btn btn-success fw-bold text-white px-4 py-2">View Full Order History</button>
          </div>
        </div>
      </div>
    </div>
  );
}
