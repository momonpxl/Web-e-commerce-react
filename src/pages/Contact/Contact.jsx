import React, { useState } from 'react';
import { FaWhatsapp, FaTelegram, FaGithub, FaTiktok, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Pesan Anda telah dikirim! Kami akan menghubungi Anda segera.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="contact-header">
          <h1>Hubungi Kami</h1>
          <p>Tim support kami siap membantu Anda 24/7</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <h3>Kontak Admin</h3>
              
              <div className="contact-method">
                <FaWhatsapp className="icon whatsapp" />
                <div>
                  <h4>WhatsApp</h4>
                  <a href="https://wa.me/6283895513613" target="_blank" rel="noopener noreferrer">
                    +62 838-9551-3613
                  </a>
                  <p className="note">Respon cepat via WhatsApp</p>
                </div>
              </div>
              
              <div className="contact-method">
                <FaTelegram className="icon telegram" />
                <div>
                  <h4>Telegram</h4>
                  <a href="https://t.me/momonpxl" target="_blank" rel="noopener noreferrer">
                    @momonpxl
                  </a>
                  <p className="note">Untuk support teknis</p>
                </div>
              </div>
              
              <div className="contact-method">
                <FaEnvelope className="icon email" />
                <div>
                  <h4>Email</h4>
                  <a href="mailto:support@larastore.com">
                    support@larastore.com
                  </a>
                  <p className="note">Respon dalam 24 jam</p>
                </div>
              </div>

              <div className="social-media">
                <h4>Sosial Media Admin:</h4>
                <div className="social-icons">
                  <a href="https://github.com/momonpxl" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                  <a href="https://www.tiktok.com/@momonpxl?_r=1&_t=ZS-92utOLl1Raf" target="_blank" rel="noopener noreferrer">
                    <FaTiktok />
                    <span>TikTok</span>
                  </a>
                  <a href="https://www.instagram.com/momonpxl?igsh=MTZhY3V6eGVuc2F4dg==" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="business-hours">
              <h3>Jam Operasional</h3>
              <ul>
                <li>
                  <span>Senin - Jumat:</span>
                  <span>08:00 - 22:00 WIB</span>
                </li>
                <li>
                  <span>Sabtu - Minggu:</span>
                  <span>09:00 - 21:00 WIB</span>
                </li>
              </ul>
              <p className="note-24">Support 24/7 untuk masalah urgent</p>
            </div>
          </div>

          <div className="contact-form">
            <h3>Kirim Pesan</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama Anda"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@contoh.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subjek</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Apa yang ingin Anda tanyakan?"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;