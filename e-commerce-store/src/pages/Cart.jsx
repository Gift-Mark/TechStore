import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/useCart';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const shipping = subtotal > 50 || cart.length === 0 ? 0 : 10;
  const grandTotal = subtotal + shipping;

  return (
    <div className="page-container">
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem' }}>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '1.5rem', padding: '3rem', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ width: '64px', height: '64px', background: '#eef2ff', color: '#4f46e5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <ShoppingCart size={32} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your cart is empty</h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0.5rem 0 1.5rem 0' }}>Looks like you haven't added any products yet.</p>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-img" />

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.title}</h3>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'capitalize' }}>{item.category}</span>
                  <div style={{ color: '#4f46e5', fontWeight: 700, marginTop: '0.25rem' }}>${item.price.toFixed(2)}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn"><Minus size={14} /></button>
                    <span style={{ padding: '0 0.75rem', fontSize: '0.875rem', fontWeight: 600 }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn"><Plus size={14} /></button>
                  </div>

                  <button onClick={() => removeFromCart(item.id)} className="trash-btn">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9', marginBottom: '1rem' }}>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Shipping</span>
              <span style={{ fontWeight: 600, color: shipping === 0 ? '#10b981' : '#0f172a' }}>
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="summary-row" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', fontWeight: 700, fontSize: '1.125rem', color: '#0f172a' }}>
              <span>Total</span>
              <span style={{ color: '#4f46e5' }}>${grandTotal.toFixed(2)}</span>
            </div>

            <button onClick={() => alert('Proceeding to Checkout process...')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}>
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}