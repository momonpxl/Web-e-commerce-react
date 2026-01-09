import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>Lara Store</h1>
            <span>Jual Beli Akun Premium</span>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Beranda</Link>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Produk</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Kontak</Link>
            <div className="nav-icons">
              <Link to="/cart" className="icon-link">
                <FaShoppingCart />
                <span className="cart-count">3</span>
              </Link>
              <Link to="/profile" className="icon-link">
                <FaUser />
              </Link>
            </div>
          </nav>

          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;