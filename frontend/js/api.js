// API Base URL
const API_BASE_URL = 'https://quanlychitieu-app.up.railway.app/api';

// Lưu và lấy token từ localStorage
const getToken = () => localStorage.getItem('token');
const setToken = (token) => localStorage.setItem('token', token);
const removeToken = () => localStorage.removeItem('token');

const getUser = () => JSON.parse(localStorage.getItem('user') || 'null');
const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));
const removeUser = () => localStorage.removeItem('user');

// Fetch API helper với auto JWT
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Lỗi API');
  }

  return data;
};

// Auth APIs
const authAPI = {
  register: (username, email, password, confirmPassword) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, confirmPassword }),
    }),

  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getCurrentUser: () => apiCall('/auth/me'),
};

// Wallet APIs
const walletAPI = {
  getWallets: () => apiCall('/wallets'),

  createWallet: (name) =>
    apiCall('/wallets', {
      method: 'POST',
      body: JSON.stringify({ name }),
    }),

  updateWallet: (id, name) =>
    apiCall(`/wallets/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
    }),

  deleteWallet: (id) =>
    apiCall(`/wallets/${id}`, {
      method: 'DELETE',
    }),
};

// Category APIs
const categoryAPI = {
  getCategories: () => apiCall('/categories'),

  getCategoriesByType: (type) => apiCall(`/categories/type/${type}`),

  createCategory: (name, type, group) =>
    apiCall('/categories', {
      method: 'POST',
      body: JSON.stringify({ name, type, group }),
    }),

  updateCategory: (id, name, type, group) =>
    apiCall(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, type, group }),
    }),

  deleteCategory: (id) =>
    apiCall(`/categories/${id}`, {
      method: 'DELETE',
    }),
};

// Transaction APIs
const transactionAPI = {
  getTransactions: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.walletId) params.append('walletId', filters.walletId);
    if (filters.categoryId) params.append('categoryId', filters.categoryId);
    if (filters.type) params.append('type', filters.type);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.skip) params.append('skip', filters.skip);
    
    return apiCall(`/transactions?${params}`);
  },

  createTransaction: (title, amount, type, categoryId, walletId, date) =>
    apiCall('/transactions', {
      method: 'POST',
      body: JSON.stringify({ title, amount, type, categoryId, walletId, date }),
    }),

  updateTransaction: (id, title, amount, type, categoryId) =>
    apiCall(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, amount, type, categoryId }),
    }),

  deleteTransaction: (id) =>
    apiCall(`/transactions/${id}`, {
      method: 'DELETE',
    }),
};

// Helper functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN');
};

const formatDateTime = (date) => {
  return new Date(date).toLocaleString('vi-VN');
};

const showAlert = (message, type = 'success') => {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  
  const container = document.querySelector('.dashboard-container') || document.body;
  container.insertBefore(alertDiv, container.firstChild);

  setTimeout(() => alertDiv.remove(), 3000);
};

const toggleModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.classList.toggle('show');
};

const openModal = (modalId) => {
  document.getElementById(modalId).classList.add('show');
};

const closeModal = (modalId) => {
  document.getElementById(modalId).classList.remove('show');
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getToken,
    setToken,
    removeToken,
    getUser,
    setUser,
    removeUser,
    apiCall,
    authAPI,
    walletAPI,
    categoryAPI,
    transactionAPI,
    formatCurrency,
    formatDate,
    formatDateTime,
    showAlert,
    toggleModal,
    openModal,
    closeModal,
  };
}
