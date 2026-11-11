import { Link, Outlet, useLocation } from 'react-router-dom';
import { Package, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/useCart';

export default function Layout() {
  const location = useLocation();
  const { cartCount } = useCart();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Login', path: '/login' },
  ];

  return (
    <div className="app-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-container">
          <Link to="/" className="brand-logo">
            <div className="logo-icon">
              <Package size={24} />
            </div>
            <span>Tech<span className="brand-highlight">Store</span></span>
          </Link>

          <nav className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link to="/cart" className="cart-button" aria-label="View Cart">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="brand-logo" style={{ color: 'white', marginBottom: '1rem' }}>
              <Package className="brand-highlight" size={24} />
              <span>TechStore</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
              Your one-stop destination for quality tech gear, modern electronics, apparel, and lifestyle accessories.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.875rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Catalog</Link></li>
              <li style={{ marginBottom: '0.5rem' }}><Link to="/cart" style={{ color: 'inherit', textDecoration: 'none' }}>Shopping Cart</Link></li>
              <li><Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Account Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Customer Support</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.875rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Help Center</li>
              <li style={{ marginBottom: '0.5rem' }}>Shipping & Delivery</li>
              <li style={{ marginBottom: '0.5rem' }}>Returns Policy</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #1e293b', fontSize: '0.75rem', color: '#64748b' }}>
          © {new Date().getFullYear()} TechStore.
        </div>
      </footer>
    </div>
  );
}