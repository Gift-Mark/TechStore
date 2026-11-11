import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, ShoppingCart } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';

export default function Products({ addToCart }) {
  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  // Filter products based on search query and selected category
  const filteredProducts = products ? products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  }) : [];

  return (
    <div className="page-container">
      <div className="products-header">
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Product Catalog</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Browse our store items and live stock</p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="controls-row">
          <div className="search-wrapper">
            <Search className="input-icon" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="select-wrapper">
            <Filter className="input-icon" size={16} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select-input"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5rem 0' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '1rem', color: '#64748b' }}>Fetching product inventory...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center' }}>
          <p style={{ fontWeight: 600 }}>Unable to load catalog.</p>
          <p style={{ fontSize: '0.875rem' }}>{error}</p>
        </div>
      )}

      {/* Responsive Grid Product Display */}
      {!loading && !error && (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`} className="product-img-box">
                <img src={product.image} alt={product.title} />
                <span className="category-tag">{product.category}</span>
              </Link>

              <div className="product-info">
                <div>
                  <Link to={`/products/${product.id}`} className="product-title">
                    {product.title}
                  </Link>

                  <div className="rating-row">
                    <Star size={14} fill="#f59e0b" />
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{product.rating?.rate || '4.5'}</span>
                    <span style={{ color: '#94a3b8' }}>({product.rating?.count || 120})</span>
                  </div>
                </div>

                <div className="product-footer">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(product)} className="icon-btn" aria-label="Add to cart">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}