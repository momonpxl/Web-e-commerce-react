import axios from 'axios';

const TELEGRAM_BOT_TOKEN = '8445673250:AAGa5eGc1p4WbjogN6iYbuzbZZMy1EBkeKQ';
const TELEGRAM_CHAT_ID = '7322704771';

export const sendTelegramMessage = async (message) => {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
};

export const sendRatingNotification = async (ratingData) => {
  const message = `
<b>⭐ RATING BARU DITERIMA ⭐</b>

<b>Produk:</b> ${ratingData.productName}
<b>Rating:</b> ${'⭐'.repeat(ratingData.rating)} (${ratingData.rating}/5)
<b>Review:</b> ${ratingData.review || 'Tidak ada review'}
<b>Waktu:</b> ${new Date(ratingData.timestamp).toLocaleString('id-ID')}

<b>ID Produk:</b> ${ratingData.productId}
  `;

  return await sendTelegramMessage(message);
};

export const sendOrderNotification = async (orderData) => {
  const message = `
<b>🛒 ORDER BARU 🛒</b>

<b>Produk:</b> ${orderData.productName}
<b>Harga:</b> Rp ${orderData.price.toLocaleString('id-ID')}
<b>Pembeli:</b> ${orderData.customerName}
<b>Email:</b> ${orderData.customerEmail}
<b>No. WhatsApp:</b> ${orderData.customerPhone}
<b>Waktu:</b> ${new Date(orderData.timestamp).toLocaleString('id-ID')}
  `;

  return await sendTelegramMessage(message);
};