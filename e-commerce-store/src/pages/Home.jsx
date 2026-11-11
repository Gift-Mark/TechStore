import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';

export default function Home() {
  const categories = [
    { title: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" },
    { title: "Jewelery", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400" },
    { title: "Men's Clothing", image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=400" },
    { title: "Women's Clothing", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400" }
  ];

  return (
    <div>
      <section className="hero-banner">
        <div className="hero-grid">
          <div>
            <span className="badge-tag">New Collection Available</span>
            <h1 className="hero-title">Upgrade Your Everyday Tech & Style</h1>
            <p className="hero-subtitle">
              Discover high-performance gadgets, contemporary fashion, and everyday essentials delivered directly to your doorstep.
            </p>
            <div className="btn-group">
              <Link to="/products" className="btn-primary">
                Explore Products <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn-outline">
                Member Sign In
              </Link>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" 
              alt="Featured Gadget" 
              className="hero-img" 
            />
          </div>
        </div>
      </section>

      <div className="page-container">
        <section className="feature-badges">
          <div className="feature-box">
            <div className="feature-icon-wrapper"><Truck size={24} /></div>
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600 }}>Free Express Shipping</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>On all orders over $50</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon-wrapper"><ShieldCheck size={24} /></div>
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600 }}>Secure Payments</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>100% encrypted checkout</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon-wrapper"><RotateCcw size={24} /></div>
            <div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600 }}>30-Day Returns</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Hassle-free money back return</p>
            </div>
          </div>
        </section>

        <section>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Shop by Category</h2>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Find exactly what you're looking for with our curated items</p>
          </div>

          <div className="category-grid">
            {categories.map((cat, idx) => (
              <Link to="/products" key={idx} className="category-card">
                <img src={cat.image} alt={cat.title} />
                <div className="category-overlay">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{cat.title}</h3>
                  <span style={{ fontSize: '0.75rem', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                    Shop Now <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}