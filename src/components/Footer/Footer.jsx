import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaShieldAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Lara Store</h3>
            <p>Toko akun premium terpercaya dengan garansi 100% dan support 24/7.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://www.instagram.com/momonpxl?igsh=MTZhY3V6eGVuc2F4dg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Produk</h4>
            <ul>
              <li><Link to="/">Streaming</Link></li>
              <li><Link to="/">Music</Link></li>
              <li><Link to="/">Design</Link></li>
              <li><Link to="/">Office</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Bantuan</h4>
            <ul>
              <li><Link to="/contact">Kontak Kami</Link></li>
              <li><Link to="/">Cara Berbelanja</Link></li>
              <li><Link to="/">FAQ</Link></li>
              <li><Link to="/">Syarat & Ketentuan</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Keamanan</h4>
            <div className="security-badge">
              <FaShieldAlt />
              <div>
                <span>Transaksi Aman</span>
                <p>Semua transaksi dilindungi</p>
              </div>
            </div>
            <p className="payment-methods">
              Metode Pembayaran: Transfer Bank, E-Wallet, QRIS
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Lara Store. All rights reserved.</p>
          <div className="admin-links">
            <span>Admin:</span>
            <a href="https://wa.me/6283895513613" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://t.me/momonpxl" target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href="https://github.com/momonpxl" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;