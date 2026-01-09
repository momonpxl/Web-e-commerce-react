import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const handleWhatsAppOrder = (productName, price) => {
    const message = `Halo, saya ingin membeli produk: ${productName} seharga Rp ${price.toLocaleString()}. Apakah masih tersedia?`;
    const phoneNumber = '6283895513613';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <span className="product-category">{product.category}</span>
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={i < product.rating ? 'star-filled' : 'star-empty'}
            />
          ))}
          <span>({product.reviewCount})</span>
        </div>
        
        <div className="product-price">
          <span className="current-price">Rp {product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="original-price">Rp {product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="btn btn-primary">
            Detail
          </Link>
          <button 
            className="btn btn-success"
            onClick={() => handleWhatsAppOrder(product.name, product.price)}
          >
            <FaShoppingCart /> Beli via WA
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;