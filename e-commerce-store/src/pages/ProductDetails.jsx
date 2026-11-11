import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '../context/useCart';
import { useFetch } from '../hooks/useFetch';

export default function ProductDetails() {
  const { id } = useParams(); // Dynamic route parameter[cite: 1, 2]
  const { data: product, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8rem 0' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-container" style={{ textAlign: 'center' }}>
        <p style={{ color: '#ef4444' }}>{error || 'Product not found'}</p>
        <Link to="/products" className="nav-link" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Return to products
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/products" className="nav-link" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
        ← Back to Catalog
      </Link>

      <div className="details-card">
        <div className="details-img-container">
          <img src={product.image} alt={product.title} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="badge-tag" style={{ color: '#4f46e5', backgroundColor: '#eef2ff', borderColor: '#c7d2fe' }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.75rem 0' }}>{product.title}</h1>

            <div className="rating-row" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              <Star size={18} fill="#f59e0b" />
              <span style={{ fontWeight: 700, color: '#0f172a' }}>{product.rating?.rate}</span>
              <span style={{ color: '#94a3b8' }}>({product.rating?.count} reviews)</span>
            </div>

            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              ${product.price?.toFixed(2)}
            </div>

            <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>
              {product.description}
            </p>
          </div>

          <div style={{ paddingTop: '2rem', borderTop: '1px solid #f1f5f9', marginTop: '2rem' }}>
            <button
              onClick={handleAddToCart}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                backgroundColor: added ? '#10b981' : '#4f46e5',
                padding: '1rem'
              }}
            >
              {added ? <><CheckCircle size={20} /> Added to Cart!</> : <><ShoppingCart size={20} /> Add to Cart</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}