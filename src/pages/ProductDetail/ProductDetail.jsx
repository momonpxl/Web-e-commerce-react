import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaWhatsapp, FaStar, FaShieldAlt, FaClock } from 'react-icons/fa';
import RatingSystem from '../../components/RatingSystem/RatingSystem';
import products from '../../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container">
        <div className="product-not-found">
          <h2>Produk tidak ditemukan</h2>
          <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  const handleWhatsAppOrder = () => {
    const message = `Halo, saya ingin membeli produk: ${product.name} seharga Rp ${product.price.toLocaleString()}. Apakah masih tersedia?`;
    const phoneNumber = '6283895513613';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="product-detail">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Beranda</Link> &gt; <Link to="/">Produk</Link> &gt; <span>{product.name}</span>
        </div>

        <div className="detail-content">
          <div className="product-images">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="product-info">
            <div className="category-badge">{product.category}</div>
            <h1>{product.name}</h1>
            
            <div className="rating-section">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
                  />
                ))}
              </div>
              <span className="rating-text">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
            
            <p className="description">{product.description}</p>
            
            <div className="price-section">
              <div className="current-price">Rp {product.price.toLocaleString()}</div>
              {product.originalPrice && (
                <div className="original-price">Rp {product.originalPrice.toLocaleString()}</div>
              )}
              <div className="discount-badge">
                {product.originalPrice && 
                  `${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF`
                }
              </div>
            </div>
            
            <div className="features">
              <h3>Fitur Utama:</h3>
              <ul>
                {Object.entries(product.details).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="guarantees">
              <div className="guarantee-item">
                <FaShieldAlt />
                <span>Garansi 100%</span>
              </div>
              <div className="guarantee-item">
                <FaClock />
                <span>Instan Delivery</span>
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className="btn btn-success whatsapp-btn"
                onClick={handleWhatsAppOrder}
              >
                <FaWhatsapp /> Beli via WhatsApp
              </button>
              <button className="btn btn-primary">
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>

        <div className="product-description-details">
          <h3>Deskripsi Lengkap</h3>
          <p>
            Produk ini adalah akun premium yang memberikan akses penuh ke semua fitur premium.
            Setelah pembelian, Anda akan menerima detail akun (email dan password) beserta 
            panduan penggunaan melalui WhatsApp atau email.
          </p>
          
          <div className="details-list">
            <div className="detail-item">
              <h4>Cara Penggunaan</h4>
              <ul>
                <li>Login menggunakan kredensial yang diberikan</li>
                <li>Jangan ubah password atau email</li>
                <li>Gunakan sesuai ketentuan platform</li>
              </ul>
            </div>
            
            <div className="detail-item">
              <h4>Syarat & Ketentuan</h4>
              <ul>
                <li>Garansi replacement jika akun bermasalah</li>
                <li>Masa aktif sesuai durasi produk</li>
                <li>Support 24/7 via WhatsApp</li>
              </ul>
            </div>
          </div>
        </div>

        <RatingSystem productId={product.id} productName={product.name} />
      </div>
    </div>
  );
};

export default ProductDetail;