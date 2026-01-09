import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import products from '../../data/products';
import { FaFilter, FaSearch } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Streaming', 'Music', 'Design', 'Office'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <h1>Temukan Akun Premium Terbaik</h1>
          <p>Belanja aman, harga terjangkau, dan garansi 100% di Lara Store</p>
        </div>
      </div>

      <div className="container">
        <div className="controls">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-section">
            <FaFilter />
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <p>Tidak ada produk yang ditemukan untuk "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;