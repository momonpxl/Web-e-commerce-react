import axios from 'axios';

// Base URL untuk API (dapat diubah sesuai backend Anda)
const API_BASE_URL = 'https://api.larastore.com/api/v1'; // Ganti dengan URL backend Anda

// Instance axios dengan konfigurasi default
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 detik timeout
});

// Interceptor untuk menangani token auth jika diperlukan
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani response error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden access
          console.error('Akses ditolak');
          break;
        case 404:
          // Handle not found
          console.error('Resource tidak ditemukan');
          break;
        case 500:
          // Handle server error
          console.error('Terjadi kesalahan server');
          break;
        default:
          console.error('Terjadi kesalahan:', error.response.status);
      }
    } else if (error.request) {
      // Network error
      console.error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
    } else {
      // Request configuration error
      console.error('Error konfigurasi request:', error.message);
    }
    return Promise.reject(error);
  }
);

// API Services

// Product Services
export const productApi = {
  // Mendapatkan semua produk
  getAllProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Mendapatkan produk berdasarkan ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Mencari produk
  searchProducts: async (query, filters = {}) => {
    try {
      const response = await api.get('/products/search', {
        params: { q: query, ...filters }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Mendapatkan produk berdasarkan kategori
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  },

  // Mendapatkan kategori produk
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
};

// Order Services
export const orderApi = {
  // Membuat order baru
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Mendapatkan order berdasarkan ID
  getOrderById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }
  },

  // Mendapatkan order history pengguna
  getUserOrders: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/orders`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching orders for user ${userId}:`, error);
      throw error;
    }
  },

  // Update status order
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating order ${orderId} status:`, error);
      throw error;
    }
  },
};

// Rating Services
export const ratingApi = {
  // Submit rating baru
  submitRating: async (ratingData) => {
    try {
      const response = await api.post('/ratings', ratingData);
      return response.data;
    } catch (error) {
      console.error('Error submitting rating:', error);
      throw error;
    }
  },

  // Mendapatkan rating untuk produk
  getProductRatings: async (productId, params = {}) => {
    try {
      const response = await api.get(`/products/${productId}/ratings`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ratings for product ${productId}:`, error);
      throw error;
    }
  },

  // Mendapatkan rating summary
  getRatingSummary: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}/ratings/summary`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching rating summary for product ${productId}:`, error);
      throw error;
    }
  },

  // Update rating
  updateRating: async (ratingId, ratingData) => {
    try {
      const response = await api.put(`/ratings/${ratingId}`, ratingData);
      return response.data;
    } catch (error) {
      console.error(`Error updating rating ${ratingId}:`, error);
      throw error;
    }
  },

  // Delete rating
  deleteRating: async (ratingId) => {
    try {
      const response = await api.delete(`/ratings/${ratingId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting rating ${ratingId}:`, error);
      throw error;
    }
  },
};

// User Services
export const userApi = {
  // Register user baru
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};

// Contact/Support Services
export const contactApi = {
  // Kirim pesan kontak
  sendContactMessage: async (messageData) => {
    try {
      const response = await api.post('/contact', messageData);
      return response.data;
    } catch (error) {
      console.error('Error sending contact message:', error);
      throw error;
    }
  },

  // Get FAQ
  getFaqs: async () => {
    try {
      const response = await api.get('/faqs');
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  },
};

// Cart Services (local storage based - bisa diganti dengan backend)
export const cartApi = {
  // Get cart from localStorage
  getCart: () => {
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  },

  // Add item to cart
  addToCart: (product) => {
    try {
      const cart = cartApi.getCart();
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: (productId) => {
    try {
      const cart = cartApi.getCart();
      const updatedCart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Update item quantity
  updateQuantity: (productId, quantity) => {
    try {
      const cart = cartApi.getCart();
      const itemIndex = cart.findIndex(item => item.id === productId);
      
      if (itemIndex > -1) {
        if (quantity <= 0) {
          cart.splice(itemIndex, 1);
        } else {
          cart[itemIndex].quantity = quantity;
        }
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  },

  // Clear cart
  clearCart: () => {
    try {
      localStorage.removeItem('cart');
      return [];
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Get cart total
  getCartTotal: () => {
    try {
      const cart = cartApi.getCart();
      return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    } catch (error) {
      console.error('Error calculating cart total:', error);
      return 0;
    }
  },

  // Get cart item count
  getCartItemCount: () => {
    try {
      const cart = cartApi.getCart();
      return cart.reduce((count, item) => count + item.quantity, 0);
    } catch (error) {
      console.error('Error counting cart items:', error);
      return 0;
    }
  },
};

// Utility functions
export const apiUtils = {
  // Format currency
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  },

  // Format date
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  // Generate order ID
  generateOrderId: () => {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp}-${random}`;
  },

  // Validate email
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validate phone number
  validatePhone: (phone) => {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone);
  },
};

// Export default api instance
export default api;