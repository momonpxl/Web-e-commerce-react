import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import './RatingSystem.css';

const RatingSystem = ({ productId, productName }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Silakan beri rating terlebih dahulu');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simpan rating ke database/localStorage
      const ratingData = {
        productId,
        productName,
        rating,
        review,
        timestamp: new Date().toISOString()
      };

      // Simpan di localStorage untuk demo
      const existingRatings = JSON.parse(localStorage.getItem('ratings') || '[]');
      existingRatings.push(ratingData);
      localStorage.setItem('ratings', JSON.stringify(existingRatings));

      // Kirim notifikasi ke Telegram
      await sendTelegramNotification(ratingData);

      setSubmitted(true);
      setTimeout(() => {
        setRating(0);
        setReview('');
        setSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Terjadi kesalahan saat mengirim rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendTelegramNotification = async (ratingData) => {
    const telegramBotToken = 'YOUR_TELEGRAM_BOT_TOKEN'; // Ganti dengan token bot Anda
    const chatId = 'YOUR_CHAT_ID'; // Ganti dengan chat ID admin
    
    const message = `
📊 *Rating Baru dari Lara Store*
      
Produk: *${ratingData.productName}*
Rating: ${'⭐'.repeat(ratingData.rating)} (${ratingData.rating}/5)
Review: ${ratingData.review || 'Tidak ada review'}
Waktu: ${new Date(ratingData.timestamp).toLocaleString('id-ID')}
      
ID Produk: ${ratingData.productId}
    `;

    try {
      await axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      console.error('Error sending Telegram notification:', error);
    }
  };

  return (
    <div className="rating-system">
      <h3>Berikan Rating & Review</h3>
      
      {submitted ? (
        <div className="success-message">
          Terima kasih atas rating Anda! Notifikasi telah dikirim ke admin.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="stars">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    style={{ display: 'none' }}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    size={30}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
          
          <div className="rating-text">
            {rating > 0 && <span>Anda memberi rating: {rating} bintang</span>}
          </div>
          
          <div className="review-section">
            <textarea
              placeholder="Bagikan pengalaman Anda dengan produk ini..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="4"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Rating'}
          </button>
        </form>
      )}
    </div>
  );
};

export default RatingSystem;